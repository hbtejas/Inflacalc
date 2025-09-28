import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Calculate,
  Description,
  TrendingUp,
  Security,
  Speed,
  Support,
  CheckCircle,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  const features = [
    {
      icon: <Calculate color="primary" />,
      title: 'Smart Tax Calculator',
      description: 'Calculate your income tax with our intelligent calculator supporting both old and new tax regimes.',
    },
    {
      icon: <Description color="primary" />,
      title: 'Document Management',
      description: 'Upload and manage all your tax documents in one secure place.',
    },
    {
      icon: <TrendingUp color="primary" />,
      title: 'Tax Planning',
      description: 'Get personalized recommendations for tax-saving investments.',
    },
    {
      icon: <Security color="primary" />,
      title: 'Secure & Private',
      description: 'Your financial data is encrypted and stored securely.',
    },
    {
      icon: <Speed color="primary" />,
      title: 'Quick Filing',
      description: 'File your returns quickly with our streamlined process.',
    },
    {
      icon: <Support color="primary" />,
      title: '24/7 Support',
      description: 'Get help from our tax experts whenever you need it.',
    },
  ];

  const benefits = [
    'Free basic tax calculation',
    'Support for all income sources',
    'Automatic deduction optimization',
    'Tax regime comparison',
    'Investment recommendations',
    'Secure document storage',
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Hero Section */}
      <Box textAlign="center" mb={6}>
        <Typography variant="h2" component="h1" gutterBottom color="primary" fontWeight="bold">
          TaxSaathi
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom color="text.secondary" sx={{ mb: 3 }}>
          Your Trusted Tax Filing Companion
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}>
          Simplify your tax calculations and filing process with our comprehensive platform. 
          Get accurate calculations, expert guidance, and secure document management all in one place.
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button
            variant="contained"
            size="large"
            component={Link}
            to="/calculator"
            sx={{ px: 4, py: 1.5 }}
          >
            Calculate Tax Now
          </Button>
          <Button
            variant="outlined"
            size="large"
            component={Link}
            to="/docs"
            sx={{ px: 4, py: 1.5 }}
          >
            Learn More
          </Button>
        </Box>
      </Box>

      {/* Features Grid */}
      <Grid container spacing={4} sx={{ mb: 6 }}>
        {features.map((feature, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card sx={{ height: '100%', transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-4px)' } }}>
              <CardContent sx={{ textAlign: 'center', p: 3 }}>
                <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                <Typography variant="h6" component="h3" gutterBottom>
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Benefits Section */}
      <Paper sx={{ p: 4, mb: 6, bgcolor: 'primary.main', color: 'white' }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h4" component="h2" gutterBottom>
              Why Choose TaxSaathi?
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
              We make tax filing simple, accurate, and stress-free. Join thousands of satisfied users 
              who trust us with their tax calculations and filing needs.
            </Typography>
            <List>
              {benefits.map((benefit, index) => (
                <ListItem key={index} sx={{ py: 0.5 }}>
                  <ListItemIcon>
                    <CheckCircle sx={{ color: 'white' }} />
                  </ListItemIcon>
                  <ListItemText primary={benefit} />
                </ListItem>
              ))}
            </List>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                bgcolor: 'rgba(255,255,255,0.1)',
                p: 3,
                borderRadius: 2,
                textAlign: 'center',
              }}
            >
              <Typography variant="h3" component="div" gutterBottom>
                50,000+
              </Typography>
              <Typography variant="h6" component="div" gutterBottom>
                Happy Users
              </Typography>
              <Typography variant="body2">
                Trusted by individuals and businesses across India
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* CTA Section */}
      <Box textAlign="center" sx={{ py: 4 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Ready to Get Started?
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Calculate your taxes in minutes and file with confidence.
        </Typography>
        <Button
          variant="contained"
          size="large"
          component={Link}
          to="/calculator"
          sx={{ px: 6, py: 2 }}
        >
          Start Your Tax Calculation
        </Button>
      </Box>
    </Container>
  );
};

export default HomePage;