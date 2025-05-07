import React, { useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Button,
  Container,
  Avatar,
  Tooltip,
  ListItemIcon,
  Divider,
  Badge,
  Fade,
  useTheme,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useMediaQuery
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ContactPopup from "./ContactPopup"; // Adjust the path based on your structure

// Material UI Icons
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import ShieldIcon from "@mui/icons-material/Shield";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

// Logo Component
const GrihaSurakshaLogo = ({ onClick }) => {
  const theme = useTheme();
  
  return (
    <Box 
      onClick={onClick}
      sx={{ 
        display: "flex", 
        alignItems: "center", 
        gap: 1.5, 
        cursor: "pointer",
        transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        "&:hover": {
          transform: "scale(1.05)",
          "& .logo-icon": {
            transform: "rotate(5deg)"
          },
          "& .logo-text": {
            letterSpacing: "0.01em"
          }
        }
      }}
    >
      <Box 
        className="logo-icon"
        sx={{ 
          position: "relative", 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center", 
          width: 44, 
          height: 44, 
          borderRadius: 3, 
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 50%, #4338ca 100%)`,
          boxShadow: `0 4px 10px ${theme.palette.mode === 'dark' ? 'rgba(30, 64, 175, 0.5)' : 'rgba(30, 64, 175, 0.3)'}`,
          overflow: "hidden",
          transition: "transform 0.3s ease",
          border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.5)'}`,
        }}
      >
        <Box 
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "50%",
            background: "rgba(255, 255, 255, 0.15)",
            borderRadius: "3px 3px 0 0"
          }}
        />
        
        {/* Central Circle */}
        <Box
          sx={{
            position: "absolute",
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(2px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        />
        
        {/* House Icon */}
        <HomeIcon 
          sx={{ 
            position: "absolute", 
            top: "4px", 
            left: "4px", 
            width: "22px", 
            height: "22px", 
            color: "white",
            filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.3))"
          }} 
        />
        
        {/* Shield Icon */}
        <ShieldIcon 
          sx={{ 
            position: "absolute", 
            bottom: "4px", 
            right: "4px", 
            width: "22px", 
            height: "22px", 
            color: "white",
            filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.3))"
          }} 
        />
        
        {/* Shimmer Effect */}
        <Box 
          sx={{
            position: "absolute",
            width: "150%",
            height: "100%",
            background: "linear-gradient(to right, transparent, rgba(255,255,255,0.4), transparent)",
            animation: "shimmer 2.5s infinite ease-in-out",
            "@keyframes shimmer": {
              "0%": { transform: "translateX(-100%) skewX(-15deg)" },
              "100%": { transform: "translateX(100%) skewX(-15deg)" }
            }
          }}
        />
        
        {/* Background Dots */}
        <Box sx={{
          position: "absolute",
          width: "100%",
          height: "100%",
          opacity: 0.2,
          backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "8px 8px"
        }} />
      </Box>
      
      <Box 
        className="logo-text"
        sx={{ 
          display: "flex", 
          flexDirection: "column",
          transition: "all 0.3s ease"
        }}
      >
        <Typography 
          variant="h6" 
          sx={{ 
            lineHeight: 1.1, 
            fontWeight: "bold", 
            background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: "0 1px 2px rgba(0,0,0,0.1)"
          }}
        >
          Griha Suraksha
        </Typography>
        <Typography 
          variant="caption" 
          sx={{ 
            lineHeight: 1, 
            color: theme.palette.text.secondary, 
            mt: -0.3,
            fontStyle: "italic",
            opacity: 0.8,
            ml: 0.5
          }}
        >
          ग्रिह सुरक्षा
        </Typography>
      </Box>
    </Box>
  );
};

// Header Component
const Header = ({ isDarkMode, toggleDarkMode, isLoggedIn, onLogout, onSignInClick }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  
  // Menu anchor states
  const [productsAnchor, setProductsAnchor] = useState(null);
  const [claimsAnchor, setClaimsAnchor] = useState(null);
  const [supportAnchor, setSupportAnchor] = useState(null);
  const [profileAnchor, setProfileAnchor] = useState(null);
  const [mobileAnchor, setMobileAnchor] = useState(null);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  
  // Menu open states
  const productsMenuOpen = Boolean(productsAnchor);
  const claimsMenuOpen = Boolean(claimsAnchor);
  const supportMenuOpen = Boolean(supportAnchor);
  const profileMenuOpen = Boolean(profileAnchor);
  const mobileMenuOpen = Boolean(mobileAnchor);

  // Menu handlers
  const handleMenuOpen = (event, setter) => {
    setter(event.currentTarget);
  };

  const handleMenuClose = (setter) => {
    setter(null);
  };

  const handleCloseAllMenus = () => {
    setProductsAnchor(null);
    setClaimsAnchor(null);
    setSupportAnchor(null);
    setProfileAnchor(null);
    setMobileAnchor(null);
  };

  const handleItemClick = (item) => {
    handleCloseAllMenus();
    
    // Navigate based on menu item
    switch (item) {
      case "Raise New Claim":
        navigate("/raise-claim");
        break;
      case "Track Claim":
        navigate("/track-claim");
        break;
      case "Policies":
        navigate("/policies");
        break;
      case "Premium":
        navigate("/premium");
        break;
      case "Coverage":
        navigate("/coverage");
        break;
      case "Property":
        navigate("/add-property");
        break;
      case "Renewals":
        navigate("/renewals");
        break;
      case "My Profile":
        navigate("/profile");
        break;
      case "Contact Us":
        setContactModalOpen(true);
        break;
      case "Chat Support":
        navigate("/chat-support");
        break;
      default:
        console.log(`Clicked on ${item}`);
        break;
    }
  };

  return (
    <AppBar 
      position="sticky" 
      color="default" 
      elevation={1} 
      sx={{ 
        backgroundColor: theme.palette.background.paper,
        borderBottom: `1px solid ${theme.palette.divider}`
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ height: 64 }}>
          {/* Logo */}
          <Box sx={{ mr: 2, display: { xs: "none", md: "flex" } }}>
            <GrihaSurakshaLogo onClick={() => navigate("/")} />
          </Box>
          
          {/* Mobile menu icon */}
          <Box sx={{ flexGrow: 0, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-controls="mobile-menu"
              aria-haspopup="true"
              onClick={(e) => handleMenuOpen(e, setMobileAnchor)}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="mobile-menu"
              anchorEl={mobileAnchor}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "left" }}
              open={mobileMenuOpen}
              onClose={() => handleMenuClose(setMobileAnchor)}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              <MenuItem onClick={() => handleItemClick("Products")}>
                <Typography>Products</Typography>
              </MenuItem>
              {isLoggedIn && (
                <MenuItem onClick={() => handleItemClick("Claims")}>
                  <Typography>Claims</Typography>
                </MenuItem>
              )}
              <MenuItem onClick={() => handleItemClick("Property")}>
                <Typography>Property</Typography>
              </MenuItem>
              {isLoggedIn && (
                <MenuItem onClick={() => handleItemClick("Renewals")}>
                  <Typography>Renewals</Typography>
                </MenuItem>
              )}
              <MenuItem onClick={() => handleItemClick("Support")}>
                <Typography>Support</Typography>
              </MenuItem>
            </Menu>
          </Box>
          
          {/* Mobile logo */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" }, justifyContent: "center" }}>
            <GrihaSurakshaLogo onClick={() => navigate("/")} />
          </Box>
          
          {/* Desktop Navigation */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, ml: 2 }}>
            {/* Products Dropdown */}
            <Button
              onClick={(e) => handleMenuOpen(e, setProductsAnchor)}
              sx={{
                color: theme.palette.text.primary,
                mx: 0.5,
                px: 1.5,
                py: 1,
                borderRadius: 1,
                display: "flex",
                alignItems: "center",
                "&:hover": {
                  backgroundColor: theme.palette.action.hover,
                  transform: "translateY(-2px)",
                  transition: "transform 0.2s"
                }
              }}
              endIcon={<KeyboardArrowDownIcon />}
            >
              Products
            </Button>
            <Menu
              id="products-menu"
              anchorEl={productsAnchor}
              open={productsMenuOpen}
              onClose={() => handleMenuClose(setProductsAnchor)}
              TransitionComponent={Fade}
              MenuListProps={{ sx: { py: 0.5 } }}
              PaperProps={{
                elevation: 3,
                sx: {
                  mt: 1.5,
                  width: 200,
                  borderRadius: 2,
                  overflow: "visible",
                  border: `1px solid ${theme.palette.divider}`,
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    left: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                    borderTop: `1px solid ${theme.palette.divider}`,
                    borderLeft: `1px solid ${theme.palette.divider}`,
                  }
                }
              }}
            >
              {isLoggedIn && (
                <MenuItem onClick={() => handleItemClick("Policies")}
                  sx={{ 
                    py: 1.5, 
                    borderLeft: `2px solid transparent`,
                    "&:hover": { 
                      borderLeft: `2px solid ${theme.palette.primary.main}`,
                      backgroundColor: theme.palette.action.hover
                    }
                  }}
                >
                  Policies
                </MenuItem>
              )}
              <MenuItem onClick={() => handleItemClick("Premium")}
                sx={{ 
                  py: 1.5, 
                  borderLeft: `2px solid transparent`,
                  "&:hover": { 
                    borderLeft: `2px solid ${theme.palette.primary.main}`,
                    backgroundColor: theme.palette.action.hover
                  }
                }}
              >
                Premium
              </MenuItem>
              <MenuItem onClick={() => handleItemClick("Coverage")}
                sx={{ 
                  py: 1.5, 
                  borderLeft: `2px solid transparent`,
                  "&:hover": { 
                    borderLeft: `2px solid ${theme.palette.primary.main}`,
                    backgroundColor: theme.palette.action.hover
                  }
                }}
              >
                Coverage
              </MenuItem>
            </Menu>
            
            {/* Claims Dropdown - Only when logged in */}
            {isLoggedIn && (
              <>
                <Button
                  onClick={(e) => handleMenuOpen(e, setClaimsAnchor)}
                  sx={{
                    color: theme.palette.text.primary,
                    mx: 0.5,
                    px: 1.5,
                    py: 1,
                    borderRadius: 1,
                    display: "flex",
                    alignItems: "center",
                    "&:hover": {
                      backgroundColor: theme.palette.action.hover,
                      transform: "translateY(-2px)",
                      transition: "transform 0.2s"
                    }
                  }}
                  endIcon={<KeyboardArrowDownIcon />}
                >
                  Claims
                </Button>
                <Menu
                  id="claims-menu"
                  anchorEl={claimsAnchor}
                  open={claimsMenuOpen}
                  onClose={() => handleMenuClose(setClaimsAnchor)}
                  TransitionComponent={Fade}
                  MenuListProps={{ sx: { py: 0.5 } }}
                  PaperProps={{
                    elevation: 3,
                    sx: {
                      mt: 1.5,
                      width: 200,
                      borderRadius: 2,
                      overflow: "visible",
                      border: `1px solid ${theme.palette.divider}`,
                      "&:before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        left: 14,
                        width: 10,
                        height: 10,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                        borderTop: `1px solid ${theme.palette.divider}`,
                        borderLeft: `1px solid ${theme.palette.divider}`,
                      }
                    }
                  }}
                >
                  <MenuItem onClick={() => handleItemClick("Raise New Claim")}
                    sx={{ 
                      py: 1.5, 
                      borderLeft: `2px solid transparent`,
                      "&:hover": { 
                        borderLeft: `2px solid ${theme.palette.primary.main}`,
                        backgroundColor: theme.palette.action.hover
                      }
                    }}
                  >
                    Raise New Claim
                  </MenuItem>
                  <MenuItem onClick={() => handleItemClick("Track Claim")}
                    sx={{ 
                      py: 1.5, 
                      borderLeft: `2px solid transparent`,
                      "&:hover": { 
                        borderLeft: `2px solid ${theme.palette.primary.main}`,
                        backgroundColor: theme.palette.action.hover
                      }
                    }}
                  >
                    Track Claim
                  </MenuItem>
                </Menu>
              </>
            )}
            
            {/* Property Button */}
            <Button
              onClick={() => handleItemClick("Property")}
              sx={{
                color: theme.palette.text.primary,
                mx: 0.5,
                px: 1.5,
                py: 1,
                borderRadius: 1,
                display: "flex",
                alignItems: "center",
                "&:hover": {
                  backgroundColor: theme.palette.action.hover,
                  transform: "translateY(-2px)",
                  transition: "transform 0.2s"
                }
              }}
            >
              Property
            </Button>
            
            {/* Renewals Button - Only when logged in */}
            {isLoggedIn && (
              <Button
                onClick={() => handleItemClick("Renewals")}
                sx={{
                  color: theme.palette.text.primary,
                  mx: 0.5,
                  px: 1.5,
                  py: 1,
                  borderRadius: 1,
                  display: "flex",
                  alignItems: "center",
                  "&:hover": {
                    backgroundColor: theme.palette.action.hover,
                    transform: "translateY(-2px)",
                    transition: "transform 0.2s"
                  }
                }}
              >
                Renewals
              </Button>
            )}
          </Box>
          
          {/* Right Section */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {/* Support Dropdown */}
            <Button
              onClick={(e) => handleMenuOpen(e, setSupportAnchor)}
              sx={{
                color: theme.palette.text.primary,
                mx: 0.5,
                px: 1.5,
                py: 1,
                borderRadius: 1,
                display: "flex",
                alignItems: "center",
                "&:hover": {
                  backgroundColor: theme.palette.action.hover,
                  transform: "translateY(-2px)",
                  transition: "transform 0.2s"
                }
              }}
              endIcon={<KeyboardArrowDownIcon />}
            >
              Support
            </Button>
            <Menu
              id="support-menu"
              anchorEl={supportAnchor}
              open={supportMenuOpen}
              onClose={() => handleMenuClose(setSupportAnchor)}
              TransitionComponent={Fade}
              MenuListProps={{ sx: { py: 0.5 } }}
              PaperProps={{
                elevation: 3,
                sx: {
                  mt: 1.5,
                  width: 200,
                  borderRadius: 2,
                  overflow: "visible",
                  border: `1px solid ${theme.palette.divider}`,
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                    borderTop: `1px solid ${theme.palette.divider}`,
                    borderLeft: `1px solid ${theme.palette.divider}`,
                  }
                }
              }}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <MenuItem onClick={() => handleItemClick("Contact Us")}
                sx={{ 
                  py: 1.5, 
                  borderLeft: `2px solid transparent`,
                  "&:hover": { 
                    borderLeft: `2px solid ${theme.palette.primary.main}`,
                    backgroundColor: theme.palette.action.hover
                  }
                }}
              >
                Contact Us
              </MenuItem>
              <MenuItem onClick={() => handleItemClick("Chat Support")}
                sx={{ 
                  py: 1.5, 
                  borderLeft: `2px solid transparent`,
                  "&:hover": { 
                    borderLeft: `2px solid ${theme.palette.primary.main}`,
                    backgroundColor: theme.palette.action.hover
                  }
                }}
              >
                Chat Support
              </MenuItem>
            </Menu>
            
            {/* Theme Toggle Button */}
            <IconButton 
              onClick={toggleDarkMode}
              color="inherit"
              sx={{ 
                ml: 1,
                bgcolor: theme.palette.action.hover,
                "&:hover": {
                  bgcolor: theme.palette.action.selected,
                  transform: "rotate(12deg)",
                  transition: "transform 0.3s"
                }
              }}
              title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
            
            {/* Notifications - Only when logged in */}
            {isLoggedIn && (
              <IconButton
                color="inherit"
                sx={{ ml: 1 }}
                title="Notifications"
              >
                <Badge badgeContent={3} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            )}
            
            {/* Profile Section */}
            {isLoggedIn ? (
              <Box sx={{ ml: 1 }}>
                <Tooltip title="Account settings">
                  <IconButton
                    onClick={(e) => handleMenuOpen(e, setProfileAnchor)}
                    size="small"
                    sx={{ 
                      ml: 1,
                      "&:hover": {
                        transform: "scale(1.1)",
                        transition: "transform 0.2s"
                      }
                    }}
                  >
                    <Avatar 
                      sx={{ 
                        width: 36, 
                        height: 36, 
                        bgcolor: "linear-gradient(to top right, #2563eb, #4338ca)",
                        boxShadow: 2
                      }}
                    >
                      <PersonIcon />
                    </Avatar>
                  </IconButton>
                </Tooltip>
                <Menu
                  id="profile-menu"
                  anchorEl={profileAnchor}
                  open={profileMenuOpen}
                  onClose={() => handleMenuClose(setProfileAnchor)}
                  TransitionComponent={Fade}
                  PaperProps={{
                    elevation: 3,
                    sx: {
                      mt: 1.5,
                      width: 220,
                      borderRadius: 2,
                      overflow: "visible",
                      border: `1px solid ${theme.palette.divider}`,
                      "&:before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                        borderTop: `1px solid ${theme.palette.divider}`,
                        borderLeft: `1px solid ${theme.palette.divider}`,
                      }
                    }
                  }}
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  transformOrigin={{ vertical: "top", horizontal: "right" }}
                >
                  <MenuItem onClick={() => handleItemClick("My Profile")}
                    sx={{ 
                      py: 1.5, 
                      borderLeft: `2px solid transparent`,
                      "&:hover": { 
                        borderLeft: `2px solid ${theme.palette.primary.main}`,
                        backgroundColor: theme.palette.action.hover
                      }
                    }}
                  >
                    <ListItemIcon>
                      <PersonIcon fontSize="small" />
                    </ListItemIcon>
                    My Profile
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={onLogout}
                    sx={{ 
                      py: 1.5, 
                      borderLeft: `2px solid transparent`,
                      "&:hover": { 
                        borderLeft: `2px solid ${theme.palette.error.main}`,
                        color: theme.palette.error.main,
                        backgroundColor: theme.palette.action.hover,
                        "& .MuiListItemIcon-root": {
                          color: theme.palette.error.main
                        }
                      }
                    }}
                  >
                    <ListItemIcon>
                      <LogoutIcon fontSize="small" />
                    </ListItemIcon>
                    Logout
                  </MenuItem>
                </Menu>
              </Box>
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={onSignInClick}
                sx={{ 
                  ml: 2,
                  px: 3,
                  py: 1,
                  borderRadius: 2,
                  boxShadow: 2,
                  fontWeight: 500,
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: 4,
                    transition: "all 0.3s"
                  }
                }}
              >
                Sign In
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
      
      {/* Contact Modal */}
      <ContactPopup open={contactModalOpen} onClose={() => setContactModalOpen(false)} />
    </AppBar>
  );
};

export default Header;