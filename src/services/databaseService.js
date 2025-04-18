import { supabase } from '../config/supabaseClient';

// Profile operations
export const getProfile = async (userId) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  
  if (error) throw error;
  return data;
};

export const updateProfile = async (userId, profileData) => {
  const { data, error } = await supabase
    .from('profiles')
    .update(profileData)
    .eq('id', userId);
  
  if (error) throw error;
  return data;
};

export const getEmployerProfile = async (userId) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*, jobs(*)')
    .eq('id', userId)
    .eq('role', 'employer')
    .single();
  
  if (error) throw error;
  return data;
};

export const getJobSeekerProfile = async (userId) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*, applications(*)')
    .eq('id', userId)
    .eq('role', 'job_seeker')
    .single();
  
  if (error) throw error;
  return data;
};

// Job operations
export const getJobs = async (filters = {}) => {
  let query = supabase
    .from('jobs')
    .select('*, profiles:employer_id(*)');
  
  if (filters.status) {
    query = query.eq('status', filters.status);
  }
  if (filters.type) {
    query = query.eq('type', filters.type);
  }
  if (filters.location) {
    query = query.ilike('location', `%${filters.location}%`);
  }
  if (filters.search) {
    query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
  }
  
  const { data, error } = await query.order('created_at', { ascending: false });
  if (error) throw error;
  return data;
};

export const getJob = async (jobId) => {
  const { data, error } = await supabase
    .from('jobs')
    .select('*, profiles:employer_id(*)')
    .eq('id', jobId)
    .single();
  
  if (error) throw error;
  return data;
};

export const createJob = async (jobData) => {
  const { data, error } = await supabase
    .from('jobs')
    .insert([jobData]);
  
  if (error) throw error;
  return data;
};

export const updateJob = async (jobId, jobData) => {
  const { data, error } = await supabase
    .from('jobs')
    .update(jobData)
    .eq('id', jobId);
  
  if (error) throw error;
  return data;
};

export const deleteJob = async (jobId) => {
  const { error } = await supabase
    .from('jobs')
    .delete()
    .eq('id', jobId);
  
  if (error) throw error;
};

export const getEmployerJobs = async (employerId) => {
  const { data, error } = await supabase
    .from('jobs')
    .select('*, applications(*)')
    .eq('employer_id', employerId)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
};

// Application operations
export const getApplications = async (userId, role) => {
  let query = supabase
    .from('applications')
    .select('*, jobs(*), profiles:user_id(*)');
  
  if (role === 'job_seeker') {
    query = query.eq('user_id', userId);
  } else if (role === 'employer') {
    query = query.eq('jobs.employer_id', userId);
  }
  
  const { data, error } = await query.order('created_at', { ascending: false });
  if (error) throw error;
  return data;
};

export const createApplication = async (applicationData) => {
  const { data, error } = await supabase
    .from('applications')
    .insert([applicationData]);
  
  if (error) throw error;
  return data;
};

export const updateApplication = async (applicationId, applicationData) => {
  const { data, error } = await supabase
    .from('applications')
    .update(applicationData)
    .eq('id', applicationId);
  
  if (error) throw error;
  return data;
};

// Saved jobs operations
export const getSavedJobs = async (userId) => {
  const { data, error } = await supabase
    .from('saved_jobs')
    .select('*, jobs(*)')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
};

export const saveJob = async (userId, jobId) => {
  const { data, error } = await supabase
    .from('saved_jobs')
    .insert([{ user_id: userId, job_id: jobId }]);
  
  if (error) throw error;
  return data;
};

export const unsaveJob = async (userId, jobId) => {
  const { error } = await supabase
    .from('saved_jobs')
    .delete()
    .eq('user_id', userId)
    .eq('job_id', jobId);
  
  if (error) throw error;
}; 