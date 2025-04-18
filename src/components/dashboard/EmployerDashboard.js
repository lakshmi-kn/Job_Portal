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
  IconButton,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  Work,
  AttachMoney,
  LocationOn,
  CalendarToday,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const EmployerDashboard = () => {
  const navigate = useNavigate();

  const postedJobs = [
    {
      id: 1,
      title: 'Senior React Developer',
      location: 'New York, NY',
      type: 'Full-time',
      salary: '$120,000 - $150,000',
      applications: 15,
      postedDate: '2024-03-15',
    },
    {
      id: 2,
      title: 'Frontend Developer',
      location: 'Remote',
      type: 'Full-time',
      salary: '$90,000 - $120,000',
      applications: 8,
      postedDate: '2024-03-10',
    },
  ];

  const recentApplications = [
    {
      id: 1,
      jobTitle: 'Senior React Developer',
      applicantName: 'John Doe',
      applicantEmail: 'john.doe@example.com',
      appliedDate: '2024-03-16',
      status: 'Pending',
    },
    {
      id: 2,
      jobTitle: 'Frontend Developer',
      applicantName: 'Jane Smith',
      applicantEmail: 'jane.smith@example.com',
      appliedDate: '2024-03-14',
      status: 'Under Review',
    },
  ];

  const handlePostJob = () => {
    navigate('/post-job');
  };

  const handleViewJob = (jobId) => {
    navigate(`/jobs/${jobId}`);
  };

  const handleEditJob = (jobId) => {
    navigate(`/edit-job/${jobId}`);
  };

  const handleDeleteJob = (jobId) => {
    console.log('Delete job:', jobId);
  };

  const handleViewApplication = (applicationId) => {
    console.log('View application:', applicationId);
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
            <Typography variant="h4">Employer Dashboard</Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handlePostJob}
            >
              Post New Job
            </Button>
          </Box>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              Total Jobs Posted
            </Typography>
            <Typography variant="h3">{postedJobs.length}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              Total Applications
            </Typography>
            <Typography variant="h3">
              {postedJobs.reduce((acc, job) => acc + job.applications, 0)}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              Active Jobs
            </Typography>
            <Typography variant="h3">{postedJobs.length}</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Posted Jobs
            </Typography>
            <Grid container spacing={2}>
              {postedJobs.map((job) => (
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
                            Posted: {job.postedDate} | Applications: {job.applications}
                          </Typography>
                        </Box>
                        <Box>
                          <IconButton
                            color="primary"
                            onClick={() => handleViewJob(job.id)}
                          >
                            <ViewIcon />
                          </IconButton>
                          <IconButton
                            color="primary"
                            onClick={() => handleEditJob(job.id)}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            color="error"
                            onClick={() => handleDeleteJob(job.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Recent Applications
            </Typography>
            <List>
              {recentApplications.map((application) => (
                <ListItem key={application.id}>
                  <ListItemText
                    primary={application.applicantName}
                    secondary={
                      <>
                        <Typography component="span" variant="body2">
                          {application.jobTitle}
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
                      sx={{ mr: 1 }}
                    />
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handleViewApplication(application.id)}
                    >
                      View
                    </Button>
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

export default EmployerDashboard; 