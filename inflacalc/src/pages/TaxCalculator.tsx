import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Card,
  CardContent,
  Divider,
  Alert,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { Calculate, Download, Compare } from '@mui/icons-material';

interface TaxCalculation {
  grossIncome: number;
  totalDeductions: number;
  taxableIncome: number;
  taxAmount: number;
  cess: number;
  totalTax: number;
  netIncome: number;
}

const TaxCalculator: React.FC = () => {
  const [formData, setFormData] = useState({
    salary: '',
    otherIncome: '',
    hra: '',
    section80C: '',
    section80D: '',
    homeLoanInterest: '',
    taxRegime: 'old',
    age: 'below60',
  });

  const [calculation, setCalculation] = useState<TaxCalculation | null>(null);
  const [showComparison, setShowComparison] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const calculateTax = (income: number, regime: string, age: string): number => {
    if (regime === 'new') {
      // New tax regime slabs (2023-24)
      if (income <= 300000) return 0;
      if (income <= 600000) return (income - 300000) * 0.05;
      if (income <= 900000) return 15000 + (income - 600000) * 0.10;
      if (income <= 1200000) return 45000 + (income - 900000) * 0.15;
      if (income <= 1500000) return 90000 + (income - 1200000) * 0.20;
      return 150000 + (income - 1500000) * 0.30;
    } else {
      // Old tax regime slabs
      const basicExemption = age === 'senior' ? 300000 : age === 'superSenior' ? 500000 : 250000;
      if (income <= basicExemption) return 0;
      if (income <= 500000) return (income - basicExemption) * 0.05;
      if (income <= 1000000) return (500000 - basicExemption) * 0.05 + (income - 500000) * 0.20;
      return (500000 - basicExemption) * 0.05 + 500000 * 0.20 + (income - 1000000) * 0.30;
    }
  };

  const handleCalculate = () => {
    const salary = parseFloat(formData.salary) || 0;
    const otherIncome = parseFloat(formData.otherIncome) || 0;
    const grossIncome = salary + otherIncome;

    let totalDeductions = 0;
    if (formData.taxRegime === 'old') {
      const hra = parseFloat(formData.hra) || 0;
      const section80C = Math.min(parseFloat(formData.section80C) || 0, 150000);
      const section80D = Math.min(parseFloat(formData.section80D) || 0, 25000);
      const homeLoanInterest = Math.min(parseFloat(formData.homeLoanInterest) || 0, 200000);
      totalDeductions = hra + section80C + section80D + homeLoanInterest;
    }

    const taxableIncome = Math.max(0, grossIncome - totalDeductions);
    const taxAmount = calculateTax(taxableIncome, formData.taxRegime, formData.age);
    const cess = taxAmount * 0.04; // 4% Health and Education Cess
    const totalTax = taxAmount + cess;
    const netIncome = grossIncome - totalTax;

    setCalculation({
      grossIncome,
      totalDeductions,
      taxableIncome,
      taxAmount,
      cess,
      totalTax,
      netIncome,
    });
  };

  const handleCompareRegimes = () => {
    setShowComparison(true);
    // Calculate for both regimes
    handleCalculate();
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom color="primary" fontWeight="bold">
        Income Tax Calculator
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Calculate your income tax for FY 2023-24 (AY 2024-25) with support for both old and new tax regimes.
      </Typography>

      <Grid container spacing={4}>
        {/* Input Form */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Income Details
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Annual Salary"
                  type="number"
                  value={formData.salary}
                  onChange={(e) => handleInputChange('salary', e.target.value)}
                  InputProps={{ startAdornment: '₹' }}
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Other Income"
                  type="number"
                  value={formData.otherIncome}
                  onChange={(e) => handleInputChange('otherIncome', e.target.value)}
                  InputProps={{ startAdornment: '₹' }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Tax Regime</InputLabel>
                  <Select
                    value={formData.taxRegime}
                    onChange={(e) => handleInputChange('taxRegime', e.target.value)}
                  >
                    <MenuItem value="old">Old Regime</MenuItem>
                    <MenuItem value="new">New Regime</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Age Category</InputLabel>
                  <Select
                    value={formData.age}
                    onChange={(e) => handleInputChange('age', e.target.value)}
                  >
                    <MenuItem value="below60">Below 60 years</MenuItem>
                    <MenuItem value="senior">60-80 years</MenuItem>
                    <MenuItem value="superSenior">Above 80 years</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            {formData.taxRegime === 'old' && (
              <>
                <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
                  Deductions (Old Regime Only)
                </Typography>
                
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="HRA Exemption"
                      type="number"
                      value={formData.hra}
                      onChange={(e) => handleInputChange('hra', e.target.value)}
                      InputProps={{ startAdornment: '₹' }}
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Section 80C (Max ₹1.5L)"
                      type="number"
                      value={formData.section80C}
                      onChange={(e) => handleInputChange('section80C', e.target.value)}
                      InputProps={{ startAdornment: '₹' }}
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Section 80D (Max ₹25K)"
                      type="number"
                      value={formData.section80D}
                      onChange={(e) => handleInputChange('section80D', e.target.value)}
                      InputProps={{ startAdornment: '₹' }}
                    />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Home Loan Interest (Max ₹2L)"
                      type="number"
                      value={formData.homeLoanInterest}
                      onChange={(e) => handleInputChange('homeLoanInterest', e.target.value)}
                      InputProps={{ startAdornment: '₹' }}
                    />
                  </Grid>
                </Grid>
              </>
            )}

            <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
              <Button
                variant="contained"
                startIcon={<Calculate />}
                onClick={handleCalculate}
                fullWidth
              >
                Calculate Tax
              </Button>
              <Button
                variant="outlined"
                startIcon={<Compare />}
                onClick={handleCompareRegimes}
              >
                Compare
              </Button>
            </Box>
          </Paper>
        </Grid>

        {/* Results */}
        <Grid item xs={12} md={6}>
          {calculation && (
            <Paper sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">
                  Tax Calculation Results
                </Typography>
                <Chip 
                  label={formData.taxRegime === 'old' ? 'Old Regime' : 'New Regime'} 
                  color="primary" 
                />
              </Box>

              <TableContainer>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell>Gross Income</TableCell>
                      <TableCell align="right">{formatCurrency(calculation.grossIncome)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Total Deductions</TableCell>
                      <TableCell align="right">{formatCurrency(calculation.totalDeductions)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><strong>Taxable Income</strong></TableCell>
                      <TableCell align="right"><strong>{formatCurrency(calculation.taxableIncome)}</strong></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Income Tax</TableCell>
                      <TableCell align="right">{formatCurrency(calculation.taxAmount)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Health & Education Cess (4%)</TableCell>
                      <TableCell align="right">{formatCurrency(calculation.cess)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><strong>Total Tax</strong></TableCell>
                      <TableCell align="right"><strong>{formatCurrency(calculation.totalTax)}</strong></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><strong>Net Income</strong></TableCell>
                      <TableCell align="right"><strong>{formatCurrency(calculation.netIncome)}</strong></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>

              <Box sx={{ mt: 3 }}>
                <Button
                  variant="outlined"
                  startIcon={<Download />}
                  fullWidth
                  onClick={() => window.print()}
                >
                  Download Report
                </Button>
              </Box>

              <Alert severity="info" sx={{ mt: 2 }}>
                This is an estimate. Actual tax may vary based on additional factors and latest tax rules.
              </Alert>
            </Paper>
          )}

          {!calculation && (
            <Paper sx={{ p: 3, textAlign: 'center', color: 'text.secondary' }}>
              <Calculate sx={{ fontSize: 64, mb: 2, opacity: 0.3 }} />
              <Typography variant="h6" gutterBottom>
                Enter your income details
              </Typography>
              <Typography variant="body2">
                Fill in the form on the left to calculate your income tax
              </Typography>
            </Paper>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default TaxCalculator;