import React from 'react';
import { Box, Container, Typography, Button, Grid} from '@mui/material';

import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import PeopleIcon from '@mui/icons-material/People';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import styled from '@emotion/styled';

const HeroContent = styled(Box)({
  backgroundColor: '#f9f9f9',
  padding: '64px 0 48px',
  backgroundImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.1) 100%, transparent 100%), url("./assets/images/med-bg.jpg")',
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
            <Typography component="h1" variant="h2" align="center"  gutterBottom className="text-white">
                Welcome to MedConnect
            </Typography>
            <Typography variant="h5" align="center" className="text-white" paragraph>
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
                  <Button variant="contrast" className='text-white'>
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
              <Box textAlign="center" className="border-r-2 border-red-900 pr-4">
                <FeatureIcon>
                  <MedicalServicesIcon fontSize="large" className="text-red-900"/>
                </FeatureIcon>
                <Typography variant="h6" gutterBottom>
                  Our Services
                </Typography>
                <Typography variant="subtitle1">
                  Connecting patients with <br /> local health care providers.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4} >
              <Box textAlign="center">
                <FeatureIcon>
                  <PeopleIcon fontSize="large" className="text-red-900"/>
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
              <Box textAlign="center" className="border-l-2 border-red-900 pl-4">
                <FeatureIcon>
                  <ContactSupportIcon fontSize="large" className="text-red-900"/>
                </FeatureIcon>
                <Typography variant="h6" gutterBottom>
                  Contact Us
                </Typography>
                <Typography variant="subtitle1">
                  We are here to help.<br /> Get in touch with us.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </main>

      <Footer>
        <Container maxWidth="lg">
          <Typography variant="h6" align="center">
            <span className="border-b-2 border-red-900 pb-1">
              MedConnect
            </span>
          </Typography>
          <Box className="mt-2">
            <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                Delivering Excellence in Healthcare.
            </Typography>
          </Box>
        </Container>
      </Footer>
    </div>
  );
}

export default LandingPage;
