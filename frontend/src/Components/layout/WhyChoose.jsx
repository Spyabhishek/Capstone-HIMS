import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  useTheme,
  alpha,
  Card,
  CardContent,
  Divider,
  IconButton
} from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

const WhyChooseUs = () => {
  const theme = useTheme();

  const features = [
    {
      icon: <HomeIcon sx={{ fontSize: 30 }} />,
      title: "Coverage",
      description: "Protect your home and belongings.",
    },
    {
      icon: <FlashOnIcon sx={{ fontSize: 30 }} />,
      title: "Fast Claims",
      description: "Quick resolution and minimal disruption.",
    },
    {
      icon: <AttachMoneyIcon sx={{ fontSize: 30 }} />,
      title: "Great Rates",
      description: "Best value with flexible options.",
    },
    {
      icon: <SupportAgentIcon sx={{ fontSize: 30 }} />,
      title: "24/7 Support",
      description: "Experts ready to assist anytime.",
    },
  ];

  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        pt: { xs: 0, md: 0 }, // No top padding
        pb: { xs: 4, md: 6 }, // Kept bottom padding
        overflow: 'hidden',
        backgroundColor: theme.palette.mode === 'dark' 
          ? theme.palette.background.default 
          : alpha(theme.palette.primary.light, 0.04)
      }}
    >
      {/* Decorative elements */}
      <Box 
        sx={{ 
          position: 'absolute', 
          top: 0, 
          right: 0, 
          width: '40%', 
          height: '40%', 
          opacity: 0.05,
          backgroundImage: 'radial-gradient(circle, transparent 20%, currentColor 20%, currentColor 25%, transparent 25%, transparent 30%, currentColor 30%, currentColor 35%, transparent 35%)',
          backgroundSize: '120px 120px',
          color: theme.palette.primary.main,
          transform: 'rotate(15deg)'
        }} 
      />
      <Box 
        sx={{ 
          position: 'absolute', 
          bottom: 0, 
          left: 0, 
          width: '30%', 
          height: '30%', 
          borderRadius: '50%', 
          background: `radial-gradient(circle, ${alpha(theme.palette.secondary.main, 0.15)} 0%, transparent 70%)`,
          filter: 'blur(40px)',
          zIndex: 0
        }} 
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Section Header */}
        <Box sx={{ textAlign: 'center', mb: { xs: 2, md: 3 } }}> {/* Minimal margin */}
          <Typography
            variant="overline"
            component="div"
            sx={{
              fontSize: '1rem',
              fontWeight: 600,
              color: theme.palette.primary.main,
              letterSpacing: 2,
              mb: 0 // No margin bottom
            }}
          >
            YOUR TRUSTED INSURANCE PARTNER
          </Typography>
          
          <Typography
            variant="h2"
            component="h2"
            sx={{
              fontWeight: 800,
              mb: 1, // Minimal margin
              fontSize: { xs: '2.2rem', md: '3rem' },
              background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              WebkitBackgroundClip: 'text',
              position: 'relative',
              display: 'inline-block',
            }}
          >
            Our Key Benefits
          </Typography>
          
          <Divider
            sx={{
              width: '80px',
              mx: 'auto',
              mb: 1, // Minimal margin
              borderBottomWidth: 4,
              borderRadius: 2,
              backgroundColor: theme.palette.primary.main,
            }}
          />
          
          <Typography
            variant="h6"
            sx={{
              maxWidth: '700px',
              mx: 'auto',
              color: theme.palette.text.secondary,
              mb: 2
            }}
          >
            We combine industry expertise with exceptional customer service to deliver 
            insurance solutions you can count on
          </Typography>
        </Box>

        {/* Features Grid - 2x2 layout */}
        <Grid container spacing={3}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Card
                elevation={4}
                sx={{
                  height: '100%',
                  borderRadius: 3,
                  overflow: 'hidden',
                  position: 'relative',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: theme.shadows[8],
                    '& .feature-icon-wrapper': {
                      transform: 'scale(1.1)',
                    },
                    '& .feature-icon': {
                      color: theme.palette.common.white,
                    },
                    '& .feature-icon-bg': {
                      opacity: 1,
                      transform: 'scale(1.2)', // Reduced from 1.5 to avoid overlapping
                    }
                  },
                }}
              >
                <CardContent sx={{ p: 3, height: '100%' }}>
                  <Box
                    sx={{
                      position: 'relative',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      height: '100%',
                    }}
                  >
                    {/* Icon with animated background */}
                    <Box
                      className="feature-icon-wrapper"
                      sx={{
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 2,
                        transition: 'transform 0.3s ease',
                        zIndex: 1,
                      }}
                    >
                      <Box
                        className="feature-icon-bg"
                        sx={{
                          position: 'absolute',
                          width: '50px', // Reduced from 60px
                          height: '50px', // Reduced from 60px
                          borderRadius: '50%',
                          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                          opacity: 0.2,
                          transition: 'all 0.3s ease',
                          zIndex: -1,
                        }}
                      />
                      <IconButton
                        sx={{
                          width: 40,
                          height: 40,
                          padding: 0,
                          backgroundColor: 'transparent',
                          '&:hover': {
                            backgroundColor: 'transparent',
                          },
                          color: theme.palette.primary.main,
                          transition: 'all 0.3s ease',
                        }}
                      >
                        {feature.icon}
                      </IconButton>
                    </Box>

                    <Typography
                      variant="h6"
                      component="h3"
                      sx={{
                        fontWeight: 700,
                        mb: 1.5,
                        color: theme.palette.mode === 'dark' 
                          ? theme.palette.primary.light
                          : theme.palette.primary.dark,
                      }}
                    >
                      {feature.title}
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{
                        color: theme.palette.text.secondary,
                        lineHeight: 1.6,
                      }}
                    >
                      {feature.description}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Trust Indicators */}
        <Box
          sx={{
            mt: 6, // Reduced from mt: 8
            pt: 6,
            pb: 5,
            px: { xs: 3, md: 6 },
            borderRadius: 4,
            background: theme.palette.mode === 'dark'
              ? alpha(theme.palette.primary.dark, 0.2)
              : alpha(theme.palette.primary.light, 0.1),
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Background decoration */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              opacity: 0.03,
              backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23000000\' fill-opacity=\'1\' fill-rule=\'evenodd\'%3E%3Ccircle cx=\'3\' cy=\'3\' r=\'3\'/%3E%3Ccircle cx=\'13\' cy=\'13\' r=\'3\'/%3E%3C/g%3E%3C/svg%3E")',
              backgroundSize: '24px 24px',
            }}
          />

          <Typography
            variant="h4"
            component="div"
            sx={{
              fontWeight: 700,
              mb: 3,
              color: theme.palette.primary.main,
              position: 'relative',
            }}
          >
            Trust by Thousands of Customers Nationwide
          </Typography>

          <Grid container spacing={4} justifyContent="center">
            {[
              { value: '30+', label: 'Years of Experience' },
              { value: '50K+', label: 'Policies Active' },
              { value: '99%', label: 'Claims Satisfaction' },
            ].map((stat, index) => (
              <Grid item key={index} xs={12} sm={4}>
                <Box>
                  <Typography
                    variant="h3"
                    sx={{
                      fontWeight: 800,
                      color: theme.palette.secondary.main,
                    }}
                  >
                    {stat.value}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      color: theme.palette.text.secondary,
                      fontWeight: 500,
                    }}
                  >
                    {stat.label}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default WhyChooseUs;