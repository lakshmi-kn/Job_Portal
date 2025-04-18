import React from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  Box,
  TextField,
  InputAdornment,
  Card,
  CardContent,
  CardActions,
  Chip,
} from '@mui/material';
import {
  Search,
  LocationOn,
  Work,
  AttachMoney,
  Business,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const featuredJobs = [
    {
      id: 1,
      title: 'Senior React Developer',
      company: 'Tech Corp',
      location: 'New York, NY',
      type: 'Full-time',
      salary: '$120,000 - $150,000',
    },
    {
      id: 2,
      title: 'Frontend Developer',
      company: 'Web Solutions',
      location: 'Remote',
      type: 'Full-time',
      salary: '$90,000 - $120,000',
    },
    {
      id: 3,
      title: 'UI/UX Designer',
      company: 'Creative Studio',
      location: 'San Francisco, CA',
      type: 'Contract',
      salary: '$80,000 - $100,000',
    },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    navigate('/jobs');
  };

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: 8,
          borderRadius: 2,
          mb: 4,
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h3" component="h1" gutterBottom align="center">
            Find Your Dream Job
          </Typography>
          <Typography variant="h6" align="center" sx={{ mb: 4 }}>
            Search through thousands of job opportunities
          </Typography>
          <Box component="form" onSubmit={handleSearch}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={5}>
                <TextField
                  fullWidth
                  placeholder="Job title or keyword"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} md={5}>
                <TextField
                  fullWidth
                  placeholder="Location"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocationOn />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} md={2}>
                <Button
                  fullWidth
                  variant="contained"
                  color="secondary"
                  type="submit"
                  sx={{ height: '100%' }}
                >
                  Search
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>

      <Typography variant="h4" gutterBottom>
        Featured Jobs
      </Typography>
      <Grid container spacing={3}>
        {featuredJobs.map((job) => (
          <Grid item xs={12} md={4} key={job.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {job.title}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Business sx={{ mr: 1, color: 'text.secondary' }} />
                  <Typography variant="body2" color="text.secondary">
                    {job.company}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <LocationOn sx={{ mr: 1, color: 'text.secondary' }} />
                  <Typography variant="body2" color="text.secondary">
                    {job.location}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Work sx={{ mr: 1, color: 'text.secondary' }} />
                  <Typography variant="body2" color="text.secondary">
                    {job.type}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <AttachMoney sx={{ mr: 1, color: 'text.secondary' }} />
                  <Typography variant="body2" color="text.secondary">
                    {job.salary}
                  </Typography>
                </Box>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary">
                  View Details
                </Button>
                <Button size="small" color="primary">
                  Apply Now
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home; 