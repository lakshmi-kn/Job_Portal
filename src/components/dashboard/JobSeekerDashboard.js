import React from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  Box,
  Card,
  CardContent,
  CardActions,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Chip,
  Avatar,
  Divider,
} from '@mui/material';
import {
  Work,
  AttachMoney,
  LocationOn,
  CalendarToday,
  Bookmark,
  BookmarkBorder,
  Send,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const JobSeekerDashboard = () => {
  const navigate = useNavigate();

  const applications = [
    {
      id: 1,
      jobTitle: 'Senior React Developer',
      company: 'Tech Corp',
      location: 'New York, NY',
      appliedDate: '2024-03-15',
      status: 'Under Review',
    },
    {
      id: 2,
      jobTitle: 'Frontend Developer',
      company: 'Web Solutions',
      location: 'Remote',
      appliedDate: '2024-03-10',
      status: 'Pending',
    },
  ];

  const savedJobs = [
    {
      id: 1,
      title: 'UI/UX Designer',
      company: 'Creative Studio',
      location: 'San Francisco, CA',
      type: 'Full-time',
      salary: '$80,000 - $100,000',
      postedDate: '2024-03-05',
    },
    {
      id: 2,
      title: 'Product Manager',
      company: 'Tech Startup',
      location: 'Boston, MA',
      type: 'Full-time',
      salary: '$100,000 - $130,000',
      postedDate: '2024-03-08',
    },
  ];

  const handleViewJob = (jobId) => {
    navigate(`/jobs/${jobId}`);
  };

  const handleApply = (jobId) => {
    navigate(`/jobs/${jobId}`);
  };

  const handleSaveJob = (jobId) => {
    console.log('Save job:', jobId);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 3,
            }}
          >
            <Typography variant="h4">Job Seeker Dashboard</Typography>
            <Button
              variant="contained"
              onClick={() => navigate('/jobs')}
              startIcon={<Work />}
            >
              Browse Jobs
            </Button>
          </Box>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              Total Applications
            </Typography>
            <Typography variant="h3">{applications.length}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              Saved Jobs
            </Typography>
            <Typography variant="h3">{savedJobs.length}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              Profile Views
            </Typography>
            <Typography variant="h3">24</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Recent Applications
            </Typography>
            <List>
              {applications.map((application) => (
                <ListItem key={application.id}>
                  <ListItemText
                    primary={application.jobTitle}
                    secondary={
                      <>
                        <Typography component="span" variant="body2">
                          {application.company} | {application.location}
                        </Typography>
                        <br />
                        <Typography component="span" variant="body2" color="text.secondary">
                          Applied: {application.appliedDate}
                        </Typography>
                      </>
                    }
                  />
                  <ListItemSecondaryAction>
                    <Chip
                      label={application.status}
                      color={
                        application.status === 'Pending'
                          ? 'warning'
                          : application.status === 'Under Review'
                          ? 'info'
                          : 'success'
                      }
                    />
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Saved Jobs
            </Typography>
            <Grid container spacing={2}>
              {savedJobs.map((job) => (
                <Grid item xs={12} key={job.id}>
                  <Card>
                    <CardContent>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'flex-start',
                        }}
                      >
                        <Box>
                          <Typography variant="h6" gutterBottom>
                            {job.title}
                          </Typography>
                          <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                            <Chip
                              icon={<LocationOn />}
                              label={job.location}
                              size="small"
                            />
                            <Chip
                              icon={<Work />}
                              label={job.type}
                              size="small"
                            />
                            <Chip
                              icon={<AttachMoney />}
                              label={job.salary}
                              size="small"
                            />
                          </Box>
                          <Typography variant="body2" color="text.secondary">
                            Posted: {job.postedDate}
                          </Typography>
                        </Box>
                        <Box>
                          <Button
                            variant="outlined"
                            startIcon={<Send />}
                            onClick={() => handleApply(job.id)}
                            sx={{ mr: 1 }}
                          >
                            Apply
                          </Button>
                          <Button
                            variant="outlined"
                            startIcon={<Bookmark />}
                            onClick={() => handleSaveJob(job.id)}
                          >
                            Remove
                          </Button>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default JobSeekerDashboard; 