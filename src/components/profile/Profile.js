import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  Avatar,
  Tabs,
  Tab,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Chip,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Email,
  Phone,
  LocationOn,
  Work,
  School,
  Business,
  LinkedIn,
  GitHub,
  Twitter,
  Star,
  StarBorder,
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
import { getProfile, updateProfile } from '../../services/databaseService';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  // Mock data for job seeker profile
  const jobSeekerProfile = {
    name: 'John Doe',
    title: 'Senior Software Developer',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    location: 'New York, NY',
    bio: 'Experienced software developer with a passion for creating efficient and scalable applications.',
    skills: ['React', 'Node.js', 'TypeScript', 'Python', 'AWS'],
    experience: [
      {
        company: 'Tech Corp',
        position: 'Senior Developer',
        duration: '2020 - Present',
        description: 'Leading development of enterprise applications.',
      },
      {
        company: 'Web Solutions',
        position: 'Frontend Developer',
        duration: '2018 - 2020',
        description: 'Developed and maintained multiple web applications.',
      },
    ],
    education: [
      {
        school: 'University of Technology',
        degree: 'Bachelor of Science in Computer Science',
        year: '2014 - 2018',
      },
    ],
    socialLinks: {
      linkedin: 'https://linkedin.com/in/johndoe',
      github: 'https://github.com/johndoe',
      twitter: 'https://twitter.com/johndoe',
    },
  };

  // Mock data for employer profile
  const employerProfile = {
    companyName: 'Tech Corp',
    industry: 'Technology',
    size: '51-200 employees',
    location: 'New York, NY',
    website: 'www.techcorp.com',
    description: 'Leading technology company specializing in enterprise solutions.',
    founded: '2010',
    benefits: ['Health Insurance', '401(k)', 'Remote Work', 'Flexible Hours'],
    socialLinks: {
      linkedin: 'https://linkedin.com/company/techcorp',
      twitter: 'https://twitter.com/techcorp',
    },
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    // Add your save logic here
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form data here
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Profile Header */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Avatar
                sx={{ width: 100, height: 100, mr: 3 }}
                alt="Profile Picture"
              />
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h4" gutterBottom>
                  {activeTab === 0 ? jobSeekerProfile.name : employerProfile.companyName}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                  {activeTab === 0 ? jobSeekerProfile.title : employerProfile.industry}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  {!isEditing ? (
                    <Button
                      variant="outlined"
                      startIcon={<EditIcon />}
                      onClick={handleEdit}
                    >
                      Edit Profile
                    </Button>
                  ) : (
                    <Box>
                      <Button
                        variant="contained"
                        startIcon={<SaveIcon />}
                        onClick={handleSave}
                        sx={{ mr: 1 }}
                      >
                        Save
                      </Button>
                      <Button
                        variant="outlined"
                        startIcon={<CancelIcon />}
                        onClick={handleCancel}
                      >
                        Cancel
                      </Button>
                    </Box>
                  )}
                </Box>
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* Main Content */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Tabs value={activeTab} onChange={handleTabChange} sx={{ mb: 3 }}>
              <Tab label="Job Seeker Profile" />
              <Tab label="Employer Profile" />
            </Tabs>

            {activeTab === 0 ? (
              // Job Seeker Profile Content
              <Box>
                <Typography variant="h6" gutterBottom>
                  Contact Information
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <Email />
                    </ListItemIcon>
                    <ListItemText primary="Email" secondary={jobSeekerProfile.email} />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Phone />
                    </ListItemIcon>
                    <ListItemText primary="Phone" secondary={jobSeekerProfile.phone} />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <LocationOn />
                    </ListItemIcon>
                    <ListItemText primary="Location" secondary={jobSeekerProfile.location} />
                  </ListItem>
                </List>

                <Divider sx={{ my: 3 }} />

                <Typography variant="h6" gutterBottom>
                  Skills
                </Typography>
                <Box sx={{ mb: 3 }}>
                  {jobSeekerProfile.skills.map((skill) => (
                    <Chip
                      key={skill}
                      label={skill}
                      sx={{ mr: 1, mb: 1 }}
                    />
                  ))}
                </Box>

                <Divider sx={{ my: 3 }} />

                <Typography variant="h6" gutterBottom>
                  Experience
                </Typography>
                {jobSeekerProfile.experience.map((exp, index) => (
                  <Box key={index} sx={{ mb: 2 }}>
                    <Typography variant="subtitle1">{exp.position}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {exp.company} | {exp.duration}
                    </Typography>
                    <Typography variant="body2">{exp.description}</Typography>
                  </Box>
                ))}

                <Divider sx={{ my: 3 }} />

                <Typography variant="h6" gutterBottom>
                  Education
                </Typography>
                {jobSeekerProfile.education.map((edu, index) => (
                  <Box key={index} sx={{ mb: 2 }}>
                    <Typography variant="subtitle1">{edu.school}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {edu.degree} | {edu.year}
                    </Typography>
                  </Box>
                ))}
              </Box>
            ) : (
              // Employer Profile Content
              <Box>
                <Typography variant="h6" gutterBottom>
                  Company Information
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <Business />
                    </ListItemIcon>
                    <ListItemText
                      primary="Industry"
                      secondary={employerProfile.industry}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Work />
                    </ListItemIcon>
                    <ListItemText
                      primary="Company Size"
                      secondary={employerProfile.size}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <LocationOn />
                    </ListItemIcon>
                    <ListItemText
                      primary="Location"
                      secondary={employerProfile.location}
                    />
                  </ListItem>
                </List>

                <Divider sx={{ my: 3 }} />

                <Typography variant="h6" gutterBottom>
                  About
                </Typography>
                <Typography variant="body2" paragraph>
                  {employerProfile.description}
                </Typography>

                <Divider sx={{ my: 3 }} />

                <Typography variant="h6" gutterBottom>
                  Benefits
                </Typography>
                <Box sx={{ mb: 3 }}>
                  {employerProfile.benefits.map((benefit) => (
                    <Chip
                      key={benefit}
                      label={benefit}
                      sx={{ mr: 1, mb: 1 }}
                    />
                  ))}
                </Box>
              </Box>
            )}
          </Paper>
        </Grid>

        {/* Sidebar */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Social Links
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <LinkedIn />
                </ListItemIcon>
                <ListItemText
                  primary="LinkedIn"
                  secondary={
                    activeTab === 0
                      ? jobSeekerProfile.socialLinks.linkedin
                      : employerProfile.socialLinks.linkedin
                  }
                />
              </ListItem>
              {activeTab === 0 ? (
                <>
                  <ListItem>
                    <ListItemIcon>
                      <GitHub />
                    </ListItemIcon>
                    <ListItemText
                      primary="GitHub"
                      secondary={jobSeekerProfile.socialLinks.github}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Twitter />
                    </ListItemIcon>
                    <ListItemText
                      primary="Twitter"
                      secondary={jobSeekerProfile.socialLinks.twitter}
                    />
                  </ListItem>
                </>
              ) : (
                <ListItem>
                  <ListItemIcon>
                    <Twitter />
                  </ListItemIcon>
                  <ListItemText
                    primary="Twitter"
                    secondary={employerProfile.socialLinks.twitter}
                  />
                </ListItem>
              )}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile; 