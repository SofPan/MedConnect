import React from 'react';
import { Box, Container, Typography, Button, Grid, AppBar, Toolbar, IconButton } from '@mui/material';

import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import PeopleIcon from '@mui/icons-material/People';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import styled from '@emotion/styled';

const HeroContent = styled(Box)({
  backgroundColor: '#f9f9f9',
  padding: '64px 0 48px',
  backgroundImage: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.25) 100%, transparent 100%), url("./assets/images/med-bg.jpg")',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center left',
});

const HeroButtons = styled(Box)({
  marginTop: '32px',
});

const FeatureIcon = styled(Box)({
  marginBottom: '16px',
});

const Footer = styled(Box)({
  padding: '48px',
  marginTop: 'auto',
  backgroundColor: '#f9f9f9',
});

function LandingPage() {
  return (
    <div>
      

      <main>
        <HeroContent>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center"  gutterBottom color="textPrimary" className="text-red-900">
                Welcome to MedConnect
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              Providing compassionate and comprehensive healthcare to the community.
            </Typography>
            <HeroButtons>
              <Grid container spacing={2} justifyContent="center">
                <Grid item>
                  <Button variant="contained" color="primary">
                    Learn More
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="outlined" color="primary">
                    Contact Us
                  </Button>
                </Grid>
              </Grid>
            </HeroButtons>
          </Container>
        </HeroContent>

        <Container maxWidth="md" component="main">
          <Grid container spacing={5} alignItems="flex-end" padding="36px 0">
            <Grid item xs={12} sm={6} md={4}>
              <Box textAlign="center">
                <FeatureIcon>
                  <MedicalServicesIcon fontSize="large" />
                </FeatureIcon>
                <Typography variant="h6" gutterBottom>
                  Our Services
                </Typography>
                <Typography variant="subtitle1">
                  Connecting patients with local health care providers.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Box textAlign="center">
                <FeatureIcon>
                  <PeopleIcon fontSize="large" />
                </FeatureIcon>
                <Typography variant="h6" gutterBottom>
                  Meet Our Team
                </Typography>
                <Typography variant="subtitle1">
                  Experienced and compassionate healthcare professionals.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Box textAlign="center">
                <FeatureIcon>
                  <ContactSupportIcon fontSize="large" />
                </FeatureIcon>
                <Typography variant="h6" gutterBottom>
                  Contact Us
                </Typography>
                <Typography variant="subtitle1">
                  We are here to help. Get in touch with us.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </main>

      <Footer>
        <Container maxWidth="lg">
          <Typography variant="h6" align="center">
            MedConnect
          </Typography>
          <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
            Delivering Excellence in Healthcare.
          </Typography>
        </Container>
      </Footer>
    </div>
  );
}

export default LandingPage;
