import React, { useState } from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  Link,
  IconButton,
  useTheme,
  useMediaQuery
} from "@mui/material";
import {
  Facebook,
  Twitter,
  LinkedIn,
  Instagram,
  Phone,
  Email,
  LocationOn,
  KeyboardArrowRight
} from "@mui/icons-material";
import HomeIcon from "@mui/icons-material/Home";
import ShieldIcon from "@mui/icons-material/Shield";

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [hoveredLink, setHoveredLink] = useState(null);

  const socialLinks = [
    { icon: Facebook, name: "Facebook", link: "#" },
    { icon: Instagram, name: "Instagram", link: "#" },
    { icon: Twitter, name: "Twitter", link: "#" },
    { icon: LinkedIn, name: "LinkedIn", link: "#" }
  ];

  const quickLinks = [
    { name: "Home", path: "#" },
    { name: "About Us", path: "#" },
    { name: "Services", path: "#" },
    { name: "Contact", path: "#" }
  ];

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: theme.palette.primary.main,
        color: "#fff",
        py: 2.7, // Reduced height by 10%
        px: 0,
        width: "100%",
        position: "relative",
        margin: 0,
      }}
    >
      <Container maxWidth="xl" sx={{ px: 0 }}>
        <Grid container spacing={5}>
          {/* About Us */}
          <Grid item xs={12} sm={6} md={3}>
            <Box
              sx={{
                p: 3.5,
                borderRadius: 2,
                backgroundColor: "rgba(255,255,255,0.08)",
                backdropFilter: "blur(4px)",
                minHeight: "auto",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "flex-start",
                width: "100%",
              }}
            >
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom sx={{ fontSize: "1.2rem" }}>
                About Us
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.85, fontSize: "0.95rem" }} paragraph>
                Griha Suraksha is India's leading home insurance provider.
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.85, fontSize: "0.95rem" }}>
                Recognized as "Best Home Insurance Provider" for 3 years.
              </Typography>
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={3}>
            <Box
              sx={{
                p: 3.5,
                borderRadius: 2,
                backgroundColor: "rgba(255,255,255,0.08)",
                backdropFilter: "blur(4px)",
                minHeight: "auto",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "flex-start",
                width: "100%",
                height: "90%",
              }}
            >
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom sx={{ fontSize: "1.2rem" }}>
                Quick Links
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  {quickLinks.slice(0, 2).map((link, i) => (
                    <Box key={i} sx={{ mb: 1 }}>
                      <Link
                        href={link.path}
                        underline="none"
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          color: "#fff",
                          fontSize: "0.95rem",
                          opacity: 0.85,
                          "&:hover": { opacity: 1 }
                        }}
                      >
                        <KeyboardArrowRight fontSize="small" sx={{ mr: 1 }} />
                        {link.name}
                      </Link>
                    </Box>
                  ))}
                </Grid>
                <Grid item xs={6}>
                  {quickLinks.slice(2, 4).map((link, i) => (
                    <Box key={i} sx={{ mb: 1 }}>
                      <Link
                        href={link.path}
                        underline="none"
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          color: "#fff",
                          fontSize: "0.95rem",
                          opacity: 0.85,
                          "&:hover": { opacity: 1 }
                        }}
                      >
                        <KeyboardArrowRight fontSize="small" sx={{ mr: 1 }} />
                        {link.name}
                      </Link>
                    </Box>
                  ))}
                </Grid>
              </Grid>
            </Box>
          </Grid>

          {/* Contact Us */}
          <Grid item xs={12} sm={6} md={3}>
            <Box
              sx={{
                p: 3.5,
                borderRadius: 2,
                backgroundColor: "rgba(255,255,255,0.08)",
                backdropFilter: "blur(4px)",
                minHeight: "auto",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "flex-start",
                width: "100%",
                height: "90%",
              }}
            >
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom sx={{ fontSize: "1.2rem" }}>
                Contact Us
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <LocationOn sx={{ mr: 1, fontSize: 18 }} />
                <Typography variant="body2" sx={{ fontSize: "0.95rem", opacity: 0.85 }}>
                  Griha Suraksha Tower, Mumbai 400001
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <Phone sx={{ mr: 1, fontSize: 18 }} />
                <Typography variant="body2" sx={{ fontSize: "0.95rem", opacity: 0.85 }}>
                  +91 9876 543 210
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Email sx={{ mr: 1, fontSize: 18 }} />
                <Typography variant="body2" sx={{ fontSize: "0.95rem", opacity: 0.85 }}>
                  info@grihasuraksha.com
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* Social Media Links positioned at the top right */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            position: "absolute",
            top: 20, // Adjusted to move it down
            right: 20, // Adjusted to move it left
            gap: 1
          }}
        >
          {socialLinks.map(({ icon: Icon, link }, i) => (
            <IconButton
              key={i}
              href={link}
              target="_blank"
              sx={{
                p: 0.5,
                color: "#fff",
                backgroundColor: "rgba(255,255,255,0.1)",
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.2)"
                }
              }}
            >
              <Icon fontSize="small" />
            </IconButton>
          ))}
        </Box>

        <Box
          sx={{
            mt: 2,
            pt: 3,
            textAlign: "center",
            borderTop: "1px solid rgba(255,255,255,0.1)"
          }}
        >
          <Typography variant="caption" sx={{ opacity: 0.6 }}>
            © {new Date().getFullYear()} Griha Suraksha Insurance Ltd. Registered with IRDAI.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
