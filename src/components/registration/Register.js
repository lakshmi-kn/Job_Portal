import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Link,
  Paper,
  Grid,
  Tabs,
  Tab,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
} from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
});

const employerValidationSchema = yup.object({
  companyName: yup.string().required('Company name is required'),
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
  industry: yup.string().required('Industry is required'),
  companySize: yup.string().required('Company size is required'),
});

const Register = () => {
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [error, setError] = useState('');

  const jobSeekerFormik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        console.log('Job Seeker Form submitted:', values);
        navigate('/job-seeker-dashboard');
      } catch (err) {
        setError('Registration failed. Please try again.');
      }
    },
  });

  const employerFormik = useFormik({
    initialValues: {
      companyName: '',
      email: '',
      password: '',
      confirmPassword: '',
      industry: '',
      companySize: '',
    },
    validationSchema: employerValidationSchema,
    onSubmit: async (values) => {
      try {
        console.log('Employer Form submitted:', values);
        navigate('/employer-dashboard');
      } catch (err) {
        setError('Registration failed. Please try again.');
      }
    },
  });

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setError('');
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          marginBottom: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Typography component="h1" variant="h5" gutterBottom>
            Create an Account
          </Typography>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            sx={{ mb: 3, width: '100%' }}
          >
            <Tab label="Job Seeker" />
            <Tab label="Employer" />
          </Tabs>

          {error && (
            <Alert severity="error" sx={{ mt: 2, width: '100%' }}>
              {error}
            </Alert>
          )}

          {tabValue === 0 ? (
            <Box
              component="form"
              onSubmit={jobSeekerFormik.handleSubmit}
              sx={{ mt: 1, width: '100%' }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    name="firstName"
                    value={jobSeekerFormik.values.firstName}
                    onChange={jobSeekerFormik.handleChange}
                    error={
                      jobSeekerFormik.touched.firstName &&
                      Boolean(jobSeekerFormik.errors.firstName)
                    }
                    helperText={
                      jobSeekerFormik.touched.firstName &&
                      jobSeekerFormik.errors.firstName
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    value={jobSeekerFormik.values.lastName}
                    onChange={jobSeekerFormik.handleChange}
                    error={
                      jobSeekerFormik.touched.lastName &&
                      Boolean(jobSeekerFormik.errors.lastName)
                    }
                    helperText={
                      jobSeekerFormik.touched.lastName &&
                      jobSeekerFormik.errors.lastName
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    value={jobSeekerFormik.values.email}
                    onChange={jobSeekerFormik.handleChange}
                    error={
                      jobSeekerFormik.touched.email &&
                      Boolean(jobSeekerFormik.errors.email)
                    }
                    helperText={
                      jobSeekerFormik.touched.email && jobSeekerFormik.errors.email
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    value={jobSeekerFormik.values.password}
                    onChange={jobSeekerFormik.handleChange}
                    error={
                      jobSeekerFormik.touched.password &&
                      Boolean(jobSeekerFormik.errors.password)
                    }
                    helperText={
                      jobSeekerFormik.touched.password &&
                      jobSeekerFormik.errors.password
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    id="confirmPassword"
                    value={jobSeekerFormik.values.confirmPassword}
                    onChange={jobSeekerFormik.handleChange}
                    error={
                      jobSeekerFormik.touched.confirmPassword &&
                      Boolean(jobSeekerFormik.errors.confirmPassword)
                    }
                    helperText={
                      jobSeekerFormik.touched.confirmPassword &&
                      jobSeekerFormik.errors.confirmPassword
                    }
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
            </Box>
          ) : (
            <Box
              component="form"
              onSubmit={employerFormik.handleSubmit}
              sx={{ mt: 1, width: '100%' }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="companyName"
                    label="Company Name"
                    name="companyName"
                    value={employerFormik.values.companyName}
                    onChange={employerFormik.handleChange}
                    error={
                      employerFormik.touched.companyName &&
                      Boolean(employerFormik.errors.companyName)
                    }
                    helperText={
                      employerFormik.touched.companyName &&
                      employerFormik.errors.companyName
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    value={employerFormik.values.email}
                    onChange={employerFormik.handleChange}
                    error={
                      employerFormik.touched.email &&
                      Boolean(employerFormik.errors.email)
                    }
                    helperText={
                      employerFormik.touched.email && employerFormik.errors.email
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth required>
                    <InputLabel id="industry-label">Industry</InputLabel>
                    <Select
                      labelId="industry-label"
                      id="industry"
                      name="industry"
                      value={employerFormik.values.industry}
                      onChange={employerFormik.handleChange}
                      error={
                        employerFormik.touched.industry &&
                        Boolean(employerFormik.errors.industry)
                      }
                    >
                      <MenuItem value="technology">Technology</MenuItem>
                      <MenuItem value="finance">Finance</MenuItem>
                      <MenuItem value="healthcare">Healthcare</MenuItem>
                      <MenuItem value="education">Education</MenuItem>
                      <MenuItem value="retail">Retail</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth required>
                    <InputLabel id="companySize-label">Company Size</InputLabel>
                    <Select
                      labelId="companySize-label"
                      id="companySize"
                      name="companySize"
                      value={employerFormik.values.companySize}
                      onChange={employerFormik.handleChange}
                      error={
                        employerFormik.touched.companySize &&
                        Boolean(employerFormik.errors.companySize)
                      }
                    >
                      <MenuItem value="1-10">1-10 employees</MenuItem>
                      <MenuItem value="11-50">11-50 employees</MenuItem>
                      <MenuItem value="51-200">51-200 employees</MenuItem>
                      <MenuItem value="201-500">201-500 employees</MenuItem>
                      <MenuItem value="501+">501+ employees</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    value={employerFormik.values.password}
                    onChange={employerFormik.handleChange}
                    error={
                      employerFormik.touched.password &&
                      Boolean(employerFormik.errors.password)
                    }
                    helperText={
                      employerFormik.touched.password &&
                      employerFormik.errors.password
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    id="confirmPassword"
                    value={employerFormik.values.confirmPassword}
                    onChange={employerFormik.handleChange}
                    error={
                      employerFormik.touched.confirmPassword &&
                      Boolean(employerFormik.errors.confirmPassword)
                    }
                    helperText={
                      employerFormik.touched.confirmPassword &&
                      employerFormik.errors.confirmPassword
                    }
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
            </Box>
          )}

          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link component={RouterLink} to="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Container>
  );
};

export default Register; 