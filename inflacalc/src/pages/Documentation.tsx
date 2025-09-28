import React from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Alert,
} from '@mui/material';
import {
  ExpandMore,
  Info,
  Calculate,
  AccountBalance,
  Receipt,
  TrendingUp,
} from '@mui/icons-material';

const Documentation: React.FC = () => {
  const taxSlabs = {
    old: [
      { range: 'Up to ₹2.5 Lakh', rate: '0%' },
      { range: '₹2.5 - ₹5 Lakh', rate: '5%' },
      { range: '₹5 - ₹10 Lakh', rate: '20%' },
      { range: 'Above ₹10 Lakh', rate: '30%' },
    ],
    new: [
      { range: 'Up to ₹3 Lakh', rate: '0%' },
      { range: '₹3 - ₹6 Lakh', rate: '5%' },
      { range: '₹6 - ₹9 Lakh', rate: '10%' },
      { range: '₹9 - ₹12 Lakh', rate: '15%' },
      { range: '₹12 - ₹15 Lakh', rate: '20%' },
      { range: 'Above ₹15 Lakh', rate: '30%' },
    ],
  };

  const deductions = [
    {
      section: 'Section 80C',
      limit: '₹1,50,000',
      description: 'PPF, ELSS, Life Insurance Premium, Home Loan Principal, etc.',
    },
    {
      section: 'Section 80D',
      limit: '₹25,000',
      description: 'Health Insurance Premium for self and family',
    },
    {
      section: 'Section 24',
      limit: '₹2,00,000',
      description: 'Home Loan Interest for self-occupied property',
    },
    {
      section: 'HRA',
      limit: 'Variable',
      description: 'House Rent Allowance exemption',
    },
  ];

  const faqs = [
    {
      question: 'Which tax regime should I choose?',
      answer: 'The choice depends on your deductions. If you have significant deductions under sections 80C, 80D, HRA, etc., the old regime might be beneficial. If you have minimal deductions, the new regime with lower tax rates might save you money.',
    },
    {
      question: 'What is the due date for filing ITR?',
      answer: 'For individuals, the due date is typically July 31st of the assessment year. However, this can be extended by the government.',
    },
    {
      question: 'Can I switch between tax regimes?',
      answer: 'Yes, salaried individuals can choose their preferred regime each year. However, business owners who opt for the new regime cannot claim certain business deductions.',
    },
    {
      question: 'What documents do I need for tax filing?',
      answer: 'Form 16, bank statements, investment proofs, rent receipts, medical bills, and other relevant financial documents.',
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom color="primary" fontWeight="bold">
        Tax Documentation & Guide
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Everything you need to know about income tax calculation and filing in India.
      </Typography>

      <Grid container spacing={4}>
        {/* Tax Slabs Comparison */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3, mb: 4 }}>
            <Typography variant="h5" gutterBottom>
              Income Tax Slabs (FY 2023-24)
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <AccountBalance color="primary" sx={{ mr: 1 }} />
                      <Typography variant="h6">Old Tax Regime</Typography>
                    </Box>
                    <List dense>
                      {taxSlabs.old.map((slab, index) => (
                        <ListItem key={index}>
                          <ListItemText
                            primary={slab.range}
                            secondary={`Tax Rate: ${slab.rate}`}
                          />
                        </ListItem>
                      ))}
                    </List>
                    <Chip label="Deductions Available" color="success" size="small" />
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <TrendingUp color="primary" sx={{ mr: 1 }} />
                      <Typography variant="h6">New Tax Regime</Typography>
                    </Box>
                    <List dense>
                      {taxSlabs.new.map((slab, index) => (
                        <ListItem key={index}>
                          <ListItemText
                            primary={slab.range}
                            secondary={`Tax Rate: ${slab.rate}`}
                          />
                        </ListItem>
                      ))}
                    </List>
                    <Chip label="Limited Deductions" color="warning" size="small" />
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Deductions Guide */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3, mb: 4 }}>
            <Typography variant="h5" gutterBottom>
              Popular Tax Deductions (Old Regime)
            </Typography>
            
            <Grid container spacing={2}>
              {deductions.map((deduction, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="h6" color="primary" gutterBottom>
                        {deduction.section}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Limit: <strong>{deduction.limit}</strong>
                      </Typography>
                      <Typography variant="body2">
                        {deduction.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>

        {/* FAQ Section */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Frequently Asked Questions
            </Typography>
            
            {faqs.map((faq, index) => (
              <Accordion key={index}>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography variant="subtitle1">{faq.question}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2" color="text.secondary">
                    {faq.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Paper>
        </Grid>

        {/* Important Notes */}
        <Grid item xs={12}>
          <Alert severity="info" sx={{ mt: 2 }}>
            <Typography variant="body2">
              <strong>Disclaimer:</strong> This information is for educational purposes only. 
              Tax laws are subject to change. Please consult a tax professional for personalized advice.
            </Typography>
          </Alert>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Documentation;