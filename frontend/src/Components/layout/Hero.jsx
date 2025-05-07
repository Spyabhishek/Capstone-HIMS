import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Container, 
  Paper, 
  Grid,
  useTheme,
  alpha,
  Stack,
  IconButton
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ContactPopup from './ContactPopup';
import QuotePopup from './QuotePopup';

const Hero = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isContactPopupOpen, setIsContactPopupOpen] = useState(false);
  const [isQuotePopupOpen, setIsQuotePopupOpen] = useState(false);
  const sliderRef = useRef(null);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const timerRef = useRef(null);

  const slides = [
    {
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?...',
      title: 'Protect Your Home',
      description: 'Comprehensive coverage for your most valuable asset',
      path: '/policies',
    },
    {
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?...',
      title: 'Peace of Mind',
      description: '24/7 protection and support when you need it most',
      path: '/quote/renters',
    },
    {
      image: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?...',
      title: 'Customized Coverage',
      description: 'Tailored insurance solutions for your unique needs',
      path: '/quote/auto',
    },
    {
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?...',
      title: 'Fast Claims Process',
      description: 'Quick and efficient claims handling for your convenience',
      path: '/raise-claim',
    },
  ];

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    resetAutoplayTimer();
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    resetAutoplayTimer();
  };

  const handleSliderHover = (isHovering) => {
    setIsAutoplay(!isHovering);
    if (isHovering) {
      clearAutoplayTimer();
    } else {
      resetAutoplayTimer();
    }
  };

  const clearAutoplayTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const resetAutoplayTimer = () => {
    clearAutoplayTimer();
    if (isAutoplay) {
      timerRef.current = setInterval(() => {
        goToNextSlide();
      }, 4000);
    }
  };

  useEffect(() => {
    resetAutoplayTimer();
    return () => clearAutoplayTimer();
  }, [isAutoplay]);

  useEffect(() => {
    // Cleanup timer on unmount
    return () => clearAutoplayTimer();
  }, []);

  return (
    <Box sx={{ 
      position: 'relative',
      mt: 3, 
      overflow: 'hidden',
      bgcolor: theme.palette.background.default
    }}>
      {/* Hero Slider Section */}
      <Box 
        ref={sliderRef}
        sx={{ 
          position: 'relative',
          width: '100%',
          height: '100vh',
          overflow: 'hidden',
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: '180px',
            background: `linear-gradient(to top, ${alpha(theme.palette.background.default, 0.8)}, transparent)`,
            zIndex: 1
          }
        }}
        onMouseEnter={() => handleSliderHover(true)}
        onMouseLeave={() => handleSliderHover(false)}
      >
        {slides.map((slide, index) => (
          <Box 
            key={index} 
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              opacity: currentSlide === index ? 1 : 0,
              visibility: currentSlide === index ? 'visible' : 'hidden',
              transition: 'opacity 0.4s ease, visibility 0.4s ease',
              zIndex: currentSlide === index ? 1 : 0,
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: `linear-gradient(135deg, 
                  ${alpha(theme.palette.common.black, 0.7)} 0%,
                  ${alpha(theme.palette.common.black, 0.3)} 50%,
                  ${alpha(theme.palette.primary.dark, 0.4)} 100%)`,
                zIndex: 1
              }
            }}
          >
            <Box
              component="img"
              src={slide.image}
              alt={slide.title}
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transform: 'scale(1.05)',
                animation: 'zoomEffect 6s infinite alternate ease-in-out',
                '@keyframes zoomEffect': {
                  '0%': {
                    transform: 'scale(1)',
                  },
                  '100%': {
                    transform: 'scale(1.08)',
                  },
                },
              }}
            />
            <Container 
              maxWidth="md"
              sx={{
                position: 'absolute',
                zIndex: 2,
                textAlign: 'center',
                px: 3,
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                animation: currentSlide === index ? 'fadeInUp 0.5s forwards' : 'none',
                '@keyframes fadeInUp': {
                  '0%': {
                    opacity: 0,
                    transform: 'translate(-50%, -30%)',
                  },
                  '100%': {
                    opacity: 1,
                    transform: 'translate(-50%, -50%)',
                  },
                },
              }}
            >
              <Typography 
                variant="h1" 
                component="h2" 
                sx={{
                  fontSize: { xs: '2.8rem', md: '4.5rem' },
                  fontWeight: 800,
                  mb: 2,
                  color: 'common.white',
                  textShadow: '2px 2px 8px rgba(0,0,0,0.6)',
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: -12,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '80px',
                    height: '4px',
                    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    borderRadius: '2px',
                  }
                }}
              >
                {slide.title}
              </Typography>
              <Typography 
                variant="h5" 
                sx={{
                  mb: 5,
                  mt: 3,
                  color: 'common.white',
                  textShadow: '1px 1px 3px rgba(0,0,0,0.6)',
                  maxWidth: '700px',
                  mx: 'auto',
                  fontSize: { xs: '1.1rem', md: '1.4rem' },
                  fontWeight: 400,
                }}
              >
                {slide.description}
              </Typography>
              <Button
                variant="contained"
                size="large"
                endIcon={<ArrowForwardIcon />}
                onClick={() => {
                  if (slide.title === 'Peace of Mind') {
                    setIsContactPopupOpen(true);
                  } else {
                    navigate(slide.path);
                  }
                }}
                sx={{
                  px: 4,
                  py: 1.5,
                  borderRadius: 3,
                  textTransform: 'none',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  boxShadow: `0 10px 25px -5px ${alpha(theme.palette.primary.main, 0.5)}`,
                  '&:hover': {
                    transform: 'translateY(-3px) scale(1.05)',
                    boxShadow: `0 14px 30px -8px ${alpha(theme.palette.primary.main, 0.6)}`,
                    background: `linear-gradient(90deg, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
                  },
                  transition: 'all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                }}
              >
                Learn More
              </Button>
            </Container>
          </Box>
        ))}
        
        {/* Navigation Arrows */}
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: 0,
            right: 0,
            transform: 'translateY(-50%)',
            display: 'flex',
            justifyContent: 'space-between',
            px: { xs: 2, md: 5 },
            zIndex: 3,
            opacity: 0.5,
            transition: 'opacity 0.2s ease',
            '&:hover': {
              opacity: 1
            }
          }}
        >
          <IconButton
            onClick={goToPrevSlide}
            aria-label="Previous slide"
            sx={{
              backgroundColor: alpha(theme.palette.common.white, 0.2),
              backdropFilter: 'blur(8px)',
              color: 'white',
              '&:hover': {
                backgroundColor: alpha(theme.palette.common.white, 0.3),
                transform: 'scale(1.1)',
              },
              transition: 'all 0.15s ease',
              width: { xs: 40, md: 56 },
              height: { xs: 40, md: 56 },
            }}
          >
            <ArrowBackIosNewIcon />
          </IconButton>
          <IconButton
            onClick={goToNextSlide}
            aria-label="Next slide"
            sx={{
              backgroundColor: alpha(theme.palette.common.white, 0.2),
              backdropFilter: 'blur(8px)',
              color: 'white',
              '&:hover': {
                backgroundColor: alpha(theme.palette.common.white, 0.3),
                transform: 'scale(1.1)',
              },
              transition: 'all 0.15s ease',
              width: { xs: 40, md: 56 },
              height: { xs: 40, md: 56 },
            }}
          >
            <ArrowForwardIosIcon />
          </IconButton>
        </Box>
        
        {/* Slider Dots */}
        <Stack 
          direction="row" 
          spacing={2}
          sx={{
            position: 'absolute',
            bottom: 40,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 2,
            p: 1,
            borderRadius: 3,
            backgroundColor: alpha(theme.palette.common.black, 0.3),
            backdropFilter: 'blur(10px)',
          }}
        >
          {slides.map((_, index) => (
            <Box
              key={index}
              onClick={() => {
                setCurrentSlide(index);
                resetAutoplayTimer();
              }}
              sx={{
                width: { xs: 30, md: 40 },
                height: 4,
                borderRadius: 2,
                backgroundColor: currentSlide === index 
                  ? theme.palette.primary.main 
                  : alpha(theme.palette.common.white, 0.4),
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                '&:hover': {
                  backgroundColor: currentSlide === index 
                    ? theme.palette.primary.light
                    : alpha(theme.palette.common.white, 0.6),
                  transform: 'scaleY(1.5)',
                }
              }}
            />
          ))}
        </Stack>

        {/* Slide counter */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 40,
            right: 40,
            zIndex: 2,
            p: 1.5,
            px: 2.5,
            borderRadius: 2,
            backgroundColor: alpha(theme.palette.common.black, 0.3),
            backdropFilter: 'blur(10px)',
            color: 'white',
            fontWeight: 600,
            fontSize: '0.9rem',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            border: `1px solid ${alpha(theme.palette.common.white, 0.1)}`,
          }}
        >
          {currentSlide + 1} / {slides.length}
        </Box>
      </Box>

      {/* Popup Components */}
      <ContactPopup open={isContactPopupOpen} onClose={() => setIsContactPopupOpen(false)} />
      <QuotePopup open={isQuotePopupOpen} onClose={() => setIsQuotePopupOpen(false)} />

      {/* Content Section */}
      <Container maxWidth="lg" sx={{ py: 3 }}>
        <Box 
          sx={{ 
            position: 'relative', 
            mb: 2,
            textAlign: 'center',
            overflow: 'hidden',
            p: { xs: 3, md: 6 },
            borderRadius: 4,
            boxShadow: theme.shadows[8],
            background: `linear-gradient(135deg, 
              ${alpha(theme.palette.primary.light, 0.15)} 0%, 
              ${alpha(theme.palette.secondary.light, 0.15)} 100%)`
          }}
        >
          {/* Decorative elements */}
          <Box 
            sx={{ 
              position: 'absolute', 
              top: -100, 
              right: -100, 
              width: 300, 
              height: 300, 
              borderRadius: '50%', 
              background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.1)} 0%, transparent 70%)`,
              zIndex: 0
            }} 
          />
          <Box 
            sx={{ 
              position: 'absolute', 
              bottom: -80, 
              left: -80, 
              width: 200, 
              height: 200, 
              borderRadius: '50%', 
              background: `radial-gradient(circle, ${alpha(theme.palette.secondary.main, 0.1)} 0%, transparent 70%)`,
              zIndex: 0
            }} 
          />
          
          <Box position="relative" zIndex={1}>
            <Typography 
              variant="h2" 
              component="h1"
              sx={{
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                fontWeight: 800,
                mb: 3,
                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                WebkitBackgroundClip: 'text',
                position: 'relative',
                display: 'inline-block',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -10,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 80,
                  height: 4,
                  borderRadius: 2,
                  backgroundColor: theme.palette.primary.main,
                }
              }}
            >
              Protect What Matters Most
            </Typography>
            
            <Typography 
              variant="h6" 
              sx={{ 
                maxWidth: 700, 
                mx: 'auto',
                mb: 5,
                lineHeight: 1.8,
                fontWeight: 400,
                color: theme.palette.text.secondary,
              }}
            >
              Get comprehensive insurance coverage for your home, belongings, and family.
              <Box component="span" sx={{ color: theme.palette.primary.main, fontWeight: 600 }}> Fast, reliable, and affordable </Box>
              protection you can trust.
            </Typography>
          
            <Stack 
              direction={{ xs: 'column', sm: 'row' }}
              spacing={3}
              justifyContent="center"
            >
              <Button 
                variant="contained" 
                size="large"
                onClick={() => setIsQuotePopupOpen(true)}
                sx={{
                  px: 5,
                  py: 1.8,
                  borderRadius: 3,
                  textTransform: 'none',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                  boxShadow: `0 8px 20px -5px ${alpha(theme.palette.primary.main, 0.5)}`,
                  '&:hover': {
                    background: `linear-gradient(90deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
                    transform: 'translateY(-3px)',
                    boxShadow: `0 12px 28px -8px ${alpha(theme.palette.primary.main, 0.6)}`,
                  },
                  transition: 'all 0.15s ease',
                }}
                startIcon={
                  <Box 
                    component="span" 
                    sx={{ 
                      mr: 1,
                      display: 'flex',
                      alignItems: 'center',
                      '& svg': { fontSize: 20 }
                    }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2L4 5V11.09C4 16.14 7.41 20.85 12 22C16.59 20.85 20 16.14 20 11.09V5L12 2Z" fill="currentColor" fillOpacity="0.2"/>
                      <path d="M12 2L4 5V11.09C4 16.14 7.41 20.85 12 22C16.59 20.85 20 16.14 20 11.09V5L12 2ZM12 4.04L18 6.25V11.09C18 15.09 15.45 18.79 12 19.82C8.55 18.79 6 15.09 6 11.09V6.25L12 4.04Z" fill="currentColor"/>
                    </svg>
                  </Box>
                }
              >
                Get a Quote
              </Button>
              <Button 
                variant="outlined" 
                size="large"
                onClick={() => navigate('/raise-claim')}
                sx={{
                  px: 5,
                  py: 1.8,
                  borderRadius: 3,
                  textTransform: 'none',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  borderWidth: 2,
                  borderColor: theme.palette.primary.main,
                  color: theme.palette.primary.main,
                  backgroundColor: alpha(theme.palette.primary.main, 0.03),
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.primary.main, 0.08),
                    borderWidth: 2,
                    transform: 'translateY(-3px)',
                    boxShadow: theme.shadows[4],
                  },
                  transition: 'all 0.15s ease',
                }}
                startIcon={
                  <Box 
                    component="span" 
                    sx={{ 
                      mr: 1,
                      display: 'flex',
                      alignItems: 'center',
                      '& svg': { fontSize: 20 }
                    }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19 5V19H5V5H19ZM19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3Z" fill="currentColor"/>
                      <path d="M14 17H7V15H14V17ZM17 13H7V11H17V13ZM17 9H7V7H17V9Z" fill="currentColor"/>
                    </svg>
                  </Box>
                }
              >
                File a Claim
              </Button>
            </Stack>
          </Box>
        </Box>
      </Container>

      {/* Stats Section */}
      <Box 
        sx={{ 
          position: 'relative',
          py: 3,
          overflow: 'hidden',
          background: theme.palette.mode === 'dark' 
            ? `linear-gradient(145deg, ${alpha(theme.palette.primary.dark, 0.3)} 0%, ${alpha(theme.palette.background.paper, 0.9)} 100%)`
            : `linear-gradient(145deg, ${alpha(theme.palette.primary.light, 0.15)} 0%, ${alpha(theme.palette.background.paper, 0.9)} 100%)`
        }}
      >
        {/* Decorative background elements */}
        <Box 
          sx={{ 
            position: 'absolute',
            top: '20%',
            left: '5%',
            width: '30%',
            height: '60%',
            borderRadius: '50%',
            filter: 'blur(80px)',
            backgroundColor: alpha(theme.palette.primary.main, 0.07),
            zIndex: 0
          }}
        />
        <Box 
          sx={{ 
            position: 'absolute',
            bottom: '10%',
            right: '5%',
            width: '25%',
            height: '50%',
            borderRadius: '50%',
            filter: 'blur(80px)',
            backgroundColor: alpha(theme.palette.secondary.main, 0.07),
            zIndex: 0
          }}
        />
        
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Typography
              variant="h3"
              component="h2"
              sx={{
                fontWeight: 700,
                mb: 2,
                fontSize: { xs: '2rem', md: '2.5rem' }
              }}
            >
              Why Choose 
              <Box component="span" sx={{ color: theme.palette.primary.main }}> Us</Box>
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{
                maxWidth: 700,
                mx: 'auto',
                color: theme.palette.text.secondary
              }}
            >
              Join millions of satisfied customers who trust us with their protection needs
            </Typography>
          </Box>
          
          <Grid container spacing={4} justifyContent="center">
            {[
              {
                value: '98%',
                label: 'Customer Satisfaction',
                icon: (
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" fill="currentColor"/>
                  </svg>
                )
              },
              {
                value: '1M+',
                label: 'Claims Processed',
                icon: (
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 13H5V11H3V13ZM3 17H5V15H3V17ZM3 9H5V7H3V9ZM7 13H21V11H7V13ZM7 17H21V15H7V17ZM7 7V9H21V7H7Z" fill="currentColor"/>
                  </svg>
                )
              },
              {
                value: '24/7',
                label: 'Support Available',
                icon: (
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z" fill="currentColor"/>
                  </svg>
                )
              }
            ].map((stat, index) => (
              <Grid item xs={12} sm={4} key={index}>
                <Paper
                  elevation={4}
                  sx={{
                    p: 4,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    borderRadius: 4,
                    transition: 'all 0.15s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: theme.shadows[8],
                    },
                    background: theme.palette.background.paper,
                  }}
                >
                  <Box
                    sx={{
                      mb: 2,
                      color: theme.palette.primary.main,
                      transform: 'scale(1.2)',
                    }}
                  >
                    {stat.icon}
                  </Box>
                  <Typography
                    variant="h2"
                    component="h3"
                    sx={{
                      fontWeight: 800,
                      fontSize: { xs: '2.5rem', md: '3rem' },
                      mb: 1,
                      background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                      backgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      WebkitBackgroundClip: 'text',
                    }}
                  >
                    {stat.value}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 500,
                      color: theme.palette.text.secondary,
                    }}
                  >
                    {stat.label}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Hero;