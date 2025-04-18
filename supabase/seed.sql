-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create profiles table
CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  first_name TEXT,
  last_name TEXT,
  role TEXT NOT NULL CHECK (role IN ('job_seeker', 'employer')),
  company_name TEXT,
  job_title TEXT,
  bio TEXT,
  skills TEXT[],
  experience TEXT,
  education TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create jobs table
CREATE TABLE jobs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  employer_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  location TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('Full-time', 'Part-time', 'Contract', 'Internship')),
  salary TEXT,
  description TEXT NOT NULL,
  requirements TEXT[],
  benefits TEXT[],
  posted_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  deadline TIMESTAMP WITH TIME ZONE,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'closed', 'draft')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create applications table
CREATE TABLE applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  job_id UUID NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  cover_letter TEXT,
  resume_url TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'accepted', 'rejected')),
  applied_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(job_id, user_id)
);

-- Create saved_jobs table
CREATE TABLE saved_jobs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  job_id UUID NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(job_id, user_id)
);

-- Insert sample profiles (employers)
INSERT INTO profiles (id, email, first_name, last_name, role, company_name, job_title, bio, skills, experience, education, avatar_url)
VALUES
  ('11111111-1111-1111-1111-111111111111', 'john@techcorp.com', 'John', 'Smith', 'employer', 'TechCorp Inc.', 'CTO', 'Leading technology innovation', ARRAY['Leadership', 'Technology', 'Management'], '15 years in tech industry', 'MBA, Stanford University', 'https://example.com/avatar1.jpg'),
  ('22222222-2222-2222-2222-222222222222', 'sarah@webdev.com', 'Sarah', 'Johnson', 'employer', 'WebDev Solutions', 'CEO', 'Building the future of web development', ARRAY['Leadership', 'Web Development', 'Business Strategy'], '12 years in web development', 'BS Computer Science, MIT', 'https://example.com/avatar2.jpg'),
  ('33333333-3333-3333-3333-333333333333', 'mike@startup.com', 'Mike', 'Brown', 'employer', 'StartupX', 'Founder', 'Serial entrepreneur', ARRAY['Entrepreneurship', 'Product Management', 'Innovation'], '10 years in startups', 'BS Engineering, UC Berkeley', 'https://example.com/avatar3.jpg');

-- Insert sample profiles (job seekers)
INSERT INTO profiles (id, email, first_name, last_name, role, job_title, bio, skills, experience, education, avatar_url)
VALUES
  ('44444444-4444-4444-4444-444444444444', 'alice@email.com', 'Alice', 'Williams', 'job_seeker', 'Senior Developer', 'Passionate about creating innovative solutions', ARRAY['React', 'Node.js', 'TypeScript'], '5 years in software development', 'BS Computer Science, University of Washington', 'https://example.com/avatar4.jpg'),
  ('55555555-5555-5555-5555-555555555555', 'bob@email.com', 'Bob', 'Davis', 'job_seeker', 'Full Stack Developer', 'Full stack developer with a focus on scalable applications', ARRAY['JavaScript', 'Python', 'AWS'], '3 years in web development', 'BS Software Engineering, Georgia Tech', 'https://example.com/avatar5.jpg'),
  ('66666666-6666-6666-6666-666666666666', 'emma@email.com', 'Emma', 'Wilson', 'job_seeker', 'UI/UX Designer', 'Creating beautiful and functional user experiences', ARRAY['UI Design', 'UX Research', 'Figma'], '4 years in design', 'BFA Design, Rhode Island School of Design', 'https://example.com/avatar6.jpg');

-- Insert sample jobs
INSERT INTO jobs (id, employer_id, title, company, location, type, salary, description, requirements, benefits, status)
VALUES
  ('77777777-7777-7777-7777-777777777777', '11111111-1111-1111-1111-111111111111', 'Senior React Developer', 'TechCorp Inc.', 'San Francisco, CA', 'Full-time', '$120,000 - $150,000', 'Looking for an experienced React developer to join our team...', ARRAY['React', 'TypeScript', 'Node.js', '5+ years experience'], ARRAY['Health Insurance', '401(k)', 'Remote Work'], 'active'),
  ('88888888-8888-8888-8888-888888888888', '22222222-2222-2222-2222-222222222222', 'Full Stack Developer', 'WebDev Solutions', 'Remote', 'Full-time', '$100,000 - $130,000', 'Join our growing team of developers...', ARRAY['JavaScript', 'Python', 'React', '3+ years experience'], ARRAY['Health Insurance', 'Flexible Hours', 'Learning Budget'], 'active'),
  ('99999999-9999-9999-9999-999999999999', '33333333-3333-3333-3333-333333333333', 'UI/UX Designer', 'StartupX', 'New York, NY', 'Full-time', '$90,000 - $120,000', 'Seeking a talented UI/UX designer...', ARRAY['Figma', 'UI Design', 'UX Research', '3+ years experience'], ARRAY['Health Insurance', 'Stock Options', 'Creative Environment'], 'active');

-- Insert sample applications
INSERT INTO applications (id, job_id, user_id, cover_letter, status)
VALUES
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '77777777-7777-7777-7777-777777777777', '44444444-4444-4444-4444-444444444444', 'I am excited to apply for the Senior React Developer position...', 'pending'),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '88888888-8888-8888-8888-888888888888', '55555555-5555-5555-5555-555555555555', 'I would love to join your team as a Full Stack Developer...', 'reviewed'),
  ('cccccccc-cccc-cccc-cccc-cccccccccccc', '99999999-9999-9999-9999-999999999999', '66666666-6666-6666-6666-666666666666', 'I am passionate about creating beautiful user experiences...', 'accepted');

-- Insert sample saved jobs
INSERT INTO saved_jobs (id, job_id, user_id)
VALUES
  ('dddddddd-dddd-dddd-dddd-dddddddddddd', '77777777-7777-7777-7777-777777777777', '44444444-4444-4444-4444-444444444444'),
  ('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', '88888888-8888-8888-8888-888888888888', '55555555-5555-5555-5555-555555555555'),
  ('ffffffff-ffff-ffff-ffff-ffffffffffff', '99999999-9999-9999-9999-999999999999', '66666666-6666-6666-6666-666666666666');

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_jobs ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Public profiles are viewable by everyone" 
  ON profiles FOR SELECT 
  USING (true);

CREATE POLICY "Users can update their own profile" 
  ON profiles FOR UPDATE 
  USING (auth.uid() = id);

CREATE POLICY "Jobs are viewable by everyone" 
  ON jobs FOR SELECT 
  USING (true);

CREATE POLICY "Employers can create jobs" 
  ON jobs FOR INSERT 
  WITH CHECK (auth.uid() = employer_id);

CREATE POLICY "Employers can update their own jobs" 
  ON jobs FOR UPDATE 
  USING (auth.uid() = employer_id);

CREATE POLICY "Employers can delete their own jobs" 
  ON jobs FOR DELETE 
  USING (auth.uid() = employer_id);

CREATE POLICY "Users can view their own applications" 
  ON applications FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Employers can view applications for their jobs" 
  ON applications FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM jobs 
      WHERE jobs.id = applications.job_id 
      AND jobs.employer_id = auth.uid()
    )
  );

CREATE POLICY "Users can create applications" 
  ON applications FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own applications" 
  ON applications FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view their saved jobs" 
  ON saved_jobs FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can save jobs" 
  ON saved_jobs FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can unsave jobs" 
  ON saved_jobs FOR DELETE 
  USING (auth.uid() = user_id); 