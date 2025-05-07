import React from "react";
import { Box, Typography, IconButton, Grid, useTheme } from "@mui/material";
import { Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material";

const SampleFooter = () => {
  const theme = useTheme();

  const iconColor = "#fff"; // White icons for contrast
  const footerBgColor = "#1976D2"; // Set to MUI primary blue
  const footerTextColor = "#fff"; // White text for better readability

  return (
    <Box
      component="footer"
      sx={{
        mt: 4,
        py: 2,
        backgroundColor: footerBgColor,
        color: footerTextColor,
        border: "1px solid #1976D2",
      }}
    >
      <Grid container justifyContent="center" spacing={0}>
        {[Facebook, Twitter, Instagram, LinkedIn].map((Icon, index) => (
          <Grid item key={index}>
            <IconButton href="#" sx={{ color: iconColor, fontSize: 20 }}>
              <Icon />
            </IconButton>
          </Grid>
        ))}
      </Grid>

      <Typography
        variant="body2"
        align="center"
        sx={{ mt: 1, fontSize: "0.875rem", color: footerTextColor }}
      >
        © 2025 Griha Suraksha. All rights reserved.
      </Typography>
    </Box>
  );
};

export default SampleFooter;
