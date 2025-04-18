import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  CircularProgress,
  Alert,
  IconButton,
} from '@mui/material';
import {
  Work as WorkIcon,
  Bookmark as BookmarkIcon,
  Visibility as VisibilityIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
import { getJobSeekerProfile, getApplications, getSavedJobs, unsaveJob } from '../../services/databaseService';

const JobSeekerDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [applications, setApplications] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [profileData, applicationsData, savedJobsData] = await Promise.all([
          getJobSeekerProfile(user.id),
          getApplications(user.id, 'job_seeker'),
          getSavedJobs(user.id)
        ]);
        setProfile(profileData);
        setApplications(applicationsData);
        setSavedJobs(savedJobsData);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user]);

  const handleViewJob = (jobId) => {
    navigate(`/jobs/${jobId}`);
  };

  const handleUnsaveJob = async (jobId) => {
    try {
      await unsaveJob(user.id, jobId);
      setSavedJobs(savedJobs.filter(job => job.job_id !== jobId));
    } catch (err) {
      console.error('Error unsaving job:', err);
      setError('Failed to unsave job');
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Typography component="h1" variant="h4" color="primary" gutterBottom>
              Job Seeker Dashboard
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Card>
                  <CardContent>
                    <Typography color="textSecondary" gutterBottom>
                      Total Applications
                    </Typography>
                    <Typography variant="h3">
                      {applications.length}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card>
                  <CardContent>
                    <Typography color="textSecondary" gutterBottom>
                      Saved Jobs
                    </Typography>
                    <Typography variant="h3">
                      {savedJobs.length}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card>
                  <CardContent>
                    <Typography color="textSecondary" gutterBottom>
                      Profile Views
                    </Typography>
                    <Typography variant="h3">
                      {profile?.profile_views || 0}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              Recent Applications
            </Typography>
            <List>
              {applications.map((application) => (
                <ListItem
                  key={application.id}
                  divider
                  sx={{
                    '&:hover': {
                      backgroundColor: 'action.hover',
                    },
                  }}
                >
                  <ListItemText
                    primary={application.jobs.title}
                    secondary={
                      <>
                        <Typography component="span" variant="body2" color="text.primary">
                          {application.jobs.company}
                        </Typography>
                        {` — Applied on ${new Date(application.applied_date).toLocaleDateString()}`}
                        <Chip
                          size="small"
                          label={application.status}
                          color={
                            application.status === 'accepted'
                              ? 'success'
                              : application.status === 'rejected'
                              ? 'error'
                              : 'warning'
                          }
                          sx={{ ml: 1 }}
                        />
                      </>
                    }
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      aria-label="view"
                      onClick={() => handleViewJob(application.job_id)}
                    >
                      <VisibilityIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              Saved Jobs
            </Typography>
            <List>
              {savedJobs.map((savedJob) => (
                <ListItem
                  key={savedJob.id}
                  divider
                  sx={{
                    '&:hover': {
                      backgroundColor: 'action.hover',
                    },
                  }}
                >
                  <ListItemText
                    primary={savedJob.jobs.title}
                    secondary={
                      <>
                        <Typography component="span" variant="body2" color="text.primary">
                          {savedJob.jobs.company}
                        </Typography>
                        {` — ${savedJob.jobs.location} • ${savedJob.jobs.type}`}
                      </>
                    }
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      aria-label="view"
                      onClick={() => handleViewJob(savedJob.job_id)}
                    >
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleUnsaveJob(savedJob.job_id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default JobSeekerDashboard; 