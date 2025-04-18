import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  TextField,
  InputAdornment,
  CircularProgress,
  Alert,
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { supabase } from '../../config/supabaseClient';

const Companies = () => {
  const navigate = useNavigate();
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('role', 'employer');

      if (error) throw error;
      setCompanies(data);
    } catch (err) {
      console.error('Error fetching companies:', err);
      setError('Failed to load companies');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredCompanies = companies.filter(company =>
    company.company_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    company.bio?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleViewCompany = (companyId) => {
    navigate(`/companies/${companyId}`);
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
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Companies
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search companies..."
          value={searchQuery}
          onChange={handleSearch}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 4 }}
        />
      </Box>

      <Grid container spacing={3}>
        {filteredCompanies.map((company) => (
          <Grid item xs={12} sm={6} md={4} key={company.id}>
            <Card 
              sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                '&:hover': {
                  boxShadow: 6,
                  cursor: 'pointer',
                },
              }}
              onClick={() => handleViewCompany(company.id)}
            >
              <CardMedia
                component="img"
                height="140"
                image={company.avatar_url || 'https://via.placeholder.com/300x140?text=Company+Logo'}
                alt={company.company_name}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  {company.company_name}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {company.bio}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Location: {company.location || 'Not specified'}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Industry: {company.industry || 'Not specified'}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Companies; 