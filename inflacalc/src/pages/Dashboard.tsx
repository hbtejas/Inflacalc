import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  LinearProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Receipt,
  CloudUpload,
  Calculate,
  TrendingUp,
  CheckCircle,
  Warning,
  Add,
} from '@mui/icons-material';

const Dashboard: React.FC = () => {
  const [uploadDialog, setUploadDialog] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Mock data for demonstration
  const taxReturns = [
    { year: '2023-24', status: 'Draft', amount: 45000, dueDate: '2024-07-31' },
    { year: '2022-23', status: 'Filed', amount: 38000, dueDate: '2023-07-31' },
    { year: '2021-22', status: 'Processed', amount: 42000, dueDate: '2022-07-31' },
  ];

  const documents = [
    { name: 'Form 16 - 2023-24', type: 'PDF', uploadDate: '2024-01-15', size: '2.3 MB' },
    { name: 'Investment Proofs', type: 'PDF', uploadDate: '2024-01-10', size: '1.8 MB' },
    { name: 'Rent Receipts', type: 'PDF', uploadDate: '2024-01-05', size: '0.9 MB' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Filed': return 'success';
      case 'Processed': return 'primary';
      case 'Draft': return 'warning';
      default: return 'default';
    }
  };

  const handleFileUpload = () => {
    if (selectedFile) {
      // Handle file upload logic here
      console.log('Uploading file:', selectedFile.name);
      setUploadDialog(false);
      setSelectedFile(null);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom color="primary" fontWeight="bold">
        Tax Dashboard
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Manage your tax returns, documents, and track your filing progress.
      </Typography>

      <Grid container spacing={4}>
        {/* Quick Stats */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Receipt color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Current Year Tax</Typography>
              </Box>
              <Typography variant="h4" color="primary" gutterBottom>
                ₹45,000
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Estimated tax for FY 2023-24
              </Typography>
              <LinearProgress 
                variant="determinate" 
                value={75} 
                sx={{ mt: 2 }}
                color="primary"
              />
              <Typography variant="caption" color="text.secondary">
                75% documents uploaded
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TrendingUp color="success" sx={{ mr: 1 }} />
                <Typography variant="h6">Tax Saved</Typography>
              </Box>
              <Typography variant="h4" color="success.main" gutterBottom>
                ₹12,500
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Through deductions & investments
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <CloudUpload color="info" sx={{ mr: 1 }} />
                <Typography variant="h6">Documents</Typography>
              </Box>
              <Typography variant="h4" color="info.main" gutterBottom>
                {documents.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Uploaded documents
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Tax Returns History */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Tax Returns History
            </Typography>
            
            <List>
              {taxReturns.map((taxReturn, index) => (
                <ListItem key={index} divider>
                  <ListItemIcon>
                    <Receipt />
                  </ListItemIcon>
                  <ListItemText
                    primary={`Assessment Year ${taxReturn.year}`}
                    secondary={`Tax Amount: ₹${taxReturn.amount.toLocaleString()} | Due: ${taxReturn.dueDate}`}
                  />
                  <Chip 
                    label={taxReturn.status} 
                    color={getStatusColor(taxReturn.status) as any}
                    size="small"
                  />
                </ListItem>
              ))}
            </List>

            <Button
              variant="contained"
              startIcon={<Calculate />}
              sx={{ mt: 2 }}
              fullWidth
            >
              Start New Tax Calculation
            </Button>
          </Paper>
        </Grid>

        {/* Document Management */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">Documents</Typography>
              <Button
                size="small"
                startIcon={<Add />}
                onClick={() => setUploadDialog(true)}
              >
                Upload
              </Button>
            </Box>
            
            <List dense>
              {documents.map((doc, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <CheckCircle color="success" />
                  </ListItemIcon>
                  <ListItemText
                    primary={doc.name}
                    secondary={`${doc.size} • ${doc.uploadDate}`}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Alerts & Reminders */}
        <Grid item xs={12}>
          <Alert severity="warning" sx={{ mb: 2 }}>
            <Typography variant="body2">
              <strong>Reminder:</strong> ITR filing deadline for AY 2024-25 is July 31, 2024. 
              Don't forget to file your returns on time to avoid penalties.
            </Typography>
          </Alert>
          
          <Alert severity="info">
            <Typography variant="body2">
              <strong>Tip:</strong> You can save up to ₹46,800 in taxes by investing ₹1.5 lakh in 
              Section 80C instruments under the old tax regime.
            </Typography>
          </Alert>
        </Grid>
      </Grid>

      {/* Upload Dialog */}
      <Dialog open={uploadDialog} onClose={() => setUploadDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Upload Document</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
              style={{ marginBottom: 16 }}
            />
            {selectedFile && (
              <Typography variant="body2" color="text.secondary">
                Selected: {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
              </Typography>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setUploadDialog(false)}>Cancel</Button>
          <Button 
            onClick={handleFileUpload} 
            variant="contained" 
            disabled={!selectedFile}
          >
            Upload
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Dashboard;