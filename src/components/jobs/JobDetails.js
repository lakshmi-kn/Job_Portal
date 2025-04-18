import React, { useState } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Button,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import {
  LocationOn,
  Work,
  AttachMoney,
  AccessTime,
  Business,
  Description,
  School,
  Send,
  Bookmark,
  BookmarkBorder,
} from '@mui/icons-material';

const JobDetails = () => {
  const [isSaved, setIsSaved] = useState(false);
  const [openApplyDialog, setOpenApplyDialog] = useState(false);

  const job = {
    id: 1,
    title: 'Senior Software Developer',
    company: 'Tech Corp',
    location: 'New York, NY',
    type: 'Full-time',
    salary: '$120,000 - $150,000',
    postedDate: '2024-03-15',
    deadline: '2024-04-15',
    description: `We are looking for an experienced Senior Software Developer to join our team. The ideal candidate will have strong experience in React, Node.js, and cloud technologies.

Key Responsibilities:
- Lead development of enterprise applications
- Mentor junior developers
- Collaborate with cross-functional teams
- Design and implement scalable solutions`,
    requirements: [
      '5+ years of experience in software development',
      'Strong proficiency in React and Node.js',
      'Experience with cloud platforms (AWS/Azure)',
      'Excellent problem-solving skills',
      'Strong communication abilities',
    ],
    benefits: [
      'Competitive salary',
      'Health insurance',
      '401(k) matching',
      'Remote work options',
      'Professional development',
    ],
    companyInfo: {
      size: '51-200 employees',
      industry: 'Technology',
      founded: '2010',
      website: 'www.techcorp.com',
    },
  };

  const handleSaveJob = () => {
    setIsSaved(!isSaved);
  };

  const handleApply = () => {
    setOpenApplyDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenApplyDialog(false);
  };

  const handleSubmitApplication = () => {
    handleCloseDialog();
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
              <Box>
                <Typography variant="h4" gutterBottom>
                  {job.title}
                </Typography>
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  {job.company}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 2 }}>
                  <Chip
                    icon={<LocationOn />}
                    label={job.location}
                    variant="outlined"
                  />
                  <Chip
                    icon={<Work />}
                    label={job.type}
                    variant="outlined"
                  />
                  <Chip
                    icon={<AttachMoney />}
                    label={job.salary}
                    variant="outlined"
                  />
                </Box>
              </Box>
              <Box>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<Send />}
                  onClick={handleApply}
                  sx={{ mr: 1 }}
                >
                  Apply Now
                </Button>
                <Button
                  variant="outlined"
                  startIcon={isSaved ? <Bookmark /> : <BookmarkBorder />}
                  onClick={handleSaveJob}
                >
                  {isSaved ? 'Saved' : 'Save'}
                </Button>
              </Box>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Typography variant="h6" gutterBottom>
              Job Description
            </Typography>
            <Typography variant="body1" paragraph>
              {job.description}
            </Typography>

            <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
              Requirements
            </Typography>
            <List>
              {job.requirements.map((req, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <School />
                  </ListItemIcon>
                  <ListItemText primary={req} />
                </ListItem>
              ))}
            </List>

            <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
              Benefits
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {job.benefits.map((benefit, index) => (
                <Chip key={index} label={benefit} />
              ))}
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, mb: 3 }}>
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
                  secondary={job.companyInfo.industry}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Work />
                </ListItemIcon>
                <ListItemText
                  primary="Company Size"
                  secondary={job.companyInfo.size}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <AccessTime />
                </ListItemIcon>
                <ListItemText
                  primary="Founded"
                  secondary={job.companyInfo.founded}
                />
              </ListItem>
            </List>
          </Paper>

          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Job Details
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <AccessTime />
                </ListItemIcon>
                <ListItemText
                  primary="Posted"
                  secondary={new Date(job.postedDate).toLocaleDateString()}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <AccessTime />
                </ListItemIcon>
                <ListItemText
                  primary="Application Deadline"
                  secondary={new Date(job.deadline).toLocaleDateString()}
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>

      <Dialog open={openApplyDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Apply for {job.title}</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Cover Letter"
              multiline
              rows={4}
              variant="outlined"
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              component="label"
              fullWidth
              sx={{ mb: 2 }}
            >
              Upload Resume
              <input
                type="file"
                hidden
                accept=".pdf,.doc,.docx"
              />
            </Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmitApplication} variant="contained">
            Submit Application
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default JobDetails; 