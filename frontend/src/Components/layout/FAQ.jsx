import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Collapse,
  IconButton,
  Divider,
  useTheme,
  alpha
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import SecurityIcon from '@mui/icons-material/Security';
import InsightsIcon from '@mui/icons-material/Insights';
import ContactPopup from "./ContactPopup"; // import popup component

const FAQ = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(null);
  const [popupOpen, setPopupOpen] = useState(false);

  const handleClick = (index) => {
    setOpen(open === index ? null : index);
  };

  const faqItems = [
    {
      icon: <HelpOutlineIcon sx={{ fontSize: 20 }} />,
      question: "What does home insurance cover?",
      answer: "Our home insurance covers structural damage, personal belongings, liability protection, and additional living expenses. We also offer optional coverage for high-value items and natural disasters specific to your region."
    },
    {
      icon: <QuestionAnswerIcon sx={{ fontSize: 20 }} />,
      question: "How do I file a claim?",
      answer: "You can file a claim through our website, mobile app, or by calling our 24/7 support line. Our claims specialists will guide you through every step of the process, ensuring a smooth and fast resolution."
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 20 }} />,
      question: "Can I customize my coverage?",
      answer: "Yes, we offer flexible plans that can be customized to meet your specific needs. Our insurance advisors can help you build a policy that provides the right protection for your home and belongings without paying for coverage you don't need."
    },
    {
      icon: <InsightsIcon sx={{ fontSize: 20 }} />,
      question: "How are my premium rates determined?",
      answer: "Premium rates are calculated based on several factors including your home's location, construction type, age, safety features, claim history, and coverage limits. We offer various discounts for home security systems, bundled policies, and claim-free periods."
    }
  ];

  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        py: { xs: 5, md: 8 },
        overflow: 'hidden',
        backgroundColor: theme.palette.mode === 'dark' 
          ? theme.palette.background.default 
          : alpha(theme.palette.secondary.light, 0.05)
      }}
    >
      <Box 
        sx={{ 
          position: 'absolute', 
          bottom: 0, 
          right: 0, 
          width: '35%', 
          height: '35%', 
          opacity: 0.07,
          backgroundImage: 'linear-gradient(45deg, currentColor 25%, transparent 25%, transparent 50%, currentColor 50%, currentColor 75%, transparent 75%, transparent)',
          backgroundSize: '30px 30px',
          color: theme.palette.secondary.main,
          transform: 'rotate(-10deg)',
          zIndex: 0
        }} 
      />
      <Box 
        sx={{ 
          position: 'absolute', 
          top: '10%', 
          left: '5%', 
          width: '25%', 
          height: '25%', 
          borderRadius: '50%', 
          background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.12)} 0%, transparent 70%)`,
          filter: 'blur(50px)',
          zIndex: 0
        }} 
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ textAlign: 'center', mb: { xs: 3, md: 4 } }}>
          <Typography variant="overline" component="div" sx={{ fontSize: '0.875rem', fontWeight: 600, color: theme.palette.secondary.main, letterSpacing: 2, mb: 0.5 }}>
            ANSWERS TO YOUR QUESTIONS
          </Typography>
          <Typography variant="h2" component="h2" sx={{ fontWeight: 800, mb: 2, fontSize: { xs: '2rem', md: '2.5rem' }, background: `linear-gradient(90deg, ${theme.palette.secondary.main} 0%, ${theme.palette.primary.main} 100%)`, backgroundClip: 'text', WebkitTextFillColor: 'transparent', WebkitBackgroundClip: 'text', position: 'relative', display: 'inline-block' }}>
            Frequently Asked Questions
          </Typography>
          <Divider sx={{ width: '80px', mx: 'auto', mb: 2, borderBottomWidth: 4, borderRadius: 2, backgroundColor: theme.palette.secondary.main }} />
          <Typography variant="h6" sx={{ maxWidth: '700px', mx: 'auto', color: theme.palette.text.secondary, mb: 2 }}>
            Everything you need to know about our insurance policies and services
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {faqItems.map((item, index) => (
            <Grid item xs={12} key={index}>
              <Card elevation={3} sx={{ borderRadius: 3, overflow: 'hidden', transition: 'all 0.3s ease', border: open === index ? `1px solid ${alpha(theme.palette.primary.main, 0.3)}` : '1px solid transparent', boxShadow: open === index ? `0 8px 24px ${alpha(theme.palette.primary.main, 0.15)}` : theme.shadows[2], '&:hover': { boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.15)}` } }}>
                <CardContent sx={{ p: 0 }}>
                  <Box onClick={() => handleClick(index)} sx={{ display: 'flex', alignItems: 'center', py: 1.5, px: 2, cursor: 'pointer', gap: 1.5 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: 0.75, borderRadius: '50%', background: open === index ? `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)` : alpha(theme.palette.primary.light, 0.1), color: open === index ? theme.palette.common.white : theme.palette.primary.main, transition: 'all 0.3s ease' }}>
                      {item.icon}
                    </Box>
                    <Typography variant="h6" component="h3" sx={{ fontWeight: 600, fontSize: '1rem', flex: 1, color: open === index ? theme.palette.primary.main : theme.palette.text.primary, transition: 'color 0.3s ease' }}>
                      {item.question}
                    </Typography>
                    <IconButton size="small" sx={{ backgroundColor: open === index ? alpha(theme.palette.primary.main, 0.1) : 'transparent', color: open === index ? theme.palette.primary.main : theme.palette.text.secondary, transition: 'all 0.3s ease', '&:hover': { backgroundColor: alpha(theme.palette.primary.main, 0.1) } }}>
                      {open === index ? <RemoveIcon /> : <AddIcon />}
                    </IconButton>
                  </Box>
                  <Collapse in={open === index}>
                    <Box sx={{ px: 2, pb: 1.5, pt: 0, ml: 5, borderLeft: `2px solid ${alpha(theme.palette.primary.main, 0.2)}` }}>
                      <Typography variant="body2" color="text.secondary" sx={{ pl: 1.5, lineHeight: 1.5 }}>
                        {item.answer}
                      </Typography>
                    </Box>
                  </Collapse>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* CTA Section */}
        <Box sx={{ mt: 6, p: { xs: 3, md: 5 }, borderRadius: 4, background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.9)} 0%, ${alpha(theme.palette.secondary.main, 0.9)} 100%)`, textAlign: 'center', position: 'relative', overflow: 'hidden', color: theme.palette.common.white }}>
                   <Typography variant="h4" component="div" sx={{ fontWeight: 700, mb: 2, position: 'relative' }}>
            Still Have Questions?
          </Typography>
          <Typography variant="h6" component="div" sx={{ fontWeight: 400, mb: 4, maxWidth: '800px', mx: 'auto', opacity: 0.9 }}>
            Our customer support team is available 24/7 to answer any additional questions you may have
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'center', gap: 3 }}>
            <Box
              component="button"
              onClick={() => setPopupOpen(true)}
              sx={{ py: 1.5, px: 4, borderRadius: 10, backgroundColor: theme.palette.common.white, color: theme.palette.primary.main, fontWeight: 600, fontSize: '1rem', border: 'none', cursor: 'pointer', transition: 'all 0.3s ease', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', '&:hover': { transform: 'translateY(-3px)', boxShadow: '0 8px 20px rgba(0,0,0,0.15)' } }}
            >
              Contact Support
            </Box>
            <Box component="button" sx={{ py: 1.5, px: 4, borderRadius: 10, backgroundColor: 'transparent', color: theme.palette.common.white, fontWeight: 600, fontSize: '1rem', border: `2px solid ${theme.palette.common.white}`, cursor: 'pointer', transition: 'all 0.3s ease', '&:hover': { backgroundColor: alpha(theme.palette.common.white, 0.1), transform: 'translateY(-3px)' } }}>
              Browse Resources
            </Box>
          </Box>
          <ContactPopup open={popupOpen} onClose={() => setPopupOpen(false)} />
        </Box>
      </Container>
    </Box>
  );
};

export default FAQ;
