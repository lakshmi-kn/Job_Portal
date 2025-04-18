import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Avatar,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Alert,
} from '@mui/material';
import { supabase } from '../../config/supabaseClient';

const CompanyDetail = () => {
  const { id } = useParams();
  const [company, setCompany] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCompanyData();
  }, [id]);

  const fetchCompanyData = async () => {
    try {
      setLoading(true);
      
      // Fetch company profile
      const { data: companyData, error: companyError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', id)
        .single();

      if (companyError) throw companyError;

      // Fetch company's jobs
      const { data: jobsData, error: jobsError } = await supabase
        .from('jobs')
        .select('*')
        .eq('employer_id', id)
        .eq('status', 'active');

      if (jobsError) throw jobsError;

      setCompany(companyData);
      setJobs(jobsData);
    } catch (err) {
      console.error('Error fetching company data:', err);
      setError('Failed to load company information');
    } finally {
      setLoading(false);
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

  if (!company) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Alert severity="info">Company not found</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box display="flex" flexDirection="column" alignItems="center">
              <Avatar
                src={company.avatar_url}
                alt={company.company_name}
                sx={{ width: 200, height: 200, mb: 2 }}
              />
              <Typography variant="h4" gutterBottom>
                {company.company_name}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                {company.job_title}
              </Typography>
              <Box sx={{ mt: 2 }}>
                {company.skills?.map((skill, index) => (
                  <Chip
                    key={index}
                    label={skill}
                    sx={{ m: 0.5 }}
                  />
                ))}
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={8}>
            <Typography variant="h5" gutterBottom>
              About the Company
            </Typography>
            <Typography paragraph>
              {company.bio}
            </Typography>

            <Divider sx={{ my: 3 }} />

            <Typography variant="h5" gutterBottom>
              Open Positions
            </Typography>
            <List>
              {jobs.map((job) => (
                <ListItem key={job.id} divider>
                  <ListItemText
                    primary={job.title}
                    secondary={
                      <>
                        <Typography component="span" variant="body2" color="text.primary">
                          {job.location} • {job.type}
                        </Typography>
                        <br />
                        <Typography component="span" variant="body2" color="text.secondary">
                          {job.salary}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
              ))}
              {jobs.length === 0 && (
                <ListItem>
                  <ListItemText
                    primary="No open positions"
                    secondary="Check back later for new opportunities"
                  />
                </ListItem>
              )}
            </List>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default CompanyDetail; 