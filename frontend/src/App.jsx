import React, { useState, useEffect } from "react";
import { Box, CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Routes, Route, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Components
import Hero from "./Components/layout/Hero";
import Header from "./Components/layout/Header";
import LoginForm from "./Components/auth/LoginForm";
import RegisterForm from "./Components/auth/RegisterForm";
import WhyChoose from "./Components/layout/WhyChoose";
import FAQ from "./Components/layout/FAQ";
import Footer from "./Components/layout/Footer";
import ResetPassword from "./Components/auth/ResetPassword";
import AddProperty from "./Components/customerManagement/AddProperty";
import RaiseNewClaim from "./Components/claims/RaiseNewClaim";
import MyProfile from "./Components/customerManagement/MyProfile";
import ClaimTrack from "./Components/claims/ClaimTrack";
import PremiumCalculator from "./Components/claims/PremiumCalculator";
import HomeInsurancePolicies from "./Components/policies/HomeInsurancePolicies";
import PolicyDetails from "./Components/policies/PolicyDetails";
import Coverage from "./Components/claims/Coverage";
const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authDialog, setAuthDialog] = useState(null);
  const navigate = useNavigate();

  // Add/remove .dark class to <body> for CSS variables
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
    return () => document.body.classList.remove("dark");
  }, [isDarkMode]);

  // Session expiration logic
  useEffect(() => {
    const token = localStorage.getItem("token");
    const loginTimestamp = localStorage.getItem("loginTimestamp");

    if (token && loginTimestamp) {
      const currentTime = Date.now();
      const sessionDuration = currentTime - loginTimestamp;

      if (sessionDuration > 30 * 60 * 1000) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("loginTimestamp");
        setIsLoggedIn(false);
        navigate("/login");
      } else {
        setIsLoggedIn(true);
      }
    } else {
      setIsLoggedIn(false);
    }
  }, [navigate]);

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setAuthDialog(null);
    localStorage.setItem("loginTimestamp", Date.now());
    navigate("/");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("loginTimestamp");
    setIsLoggedIn(false);
    navigate("/");
  };

  const theme = createTheme({
    palette: {
      mode: isDarkMode ? "dark" : "light",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Header
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
          isLoggedIn={isLoggedIn}
          onLogout={handleLogout}
          onSignInClick={() => setAuthDialog("login")}
          onSignUpClick={() => setAuthDialog("register")}
        />

        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <Box component="main" sx={{ marginTop: "64px", flex: 1 }}>
                  <WhyChoose />
                  <FAQ />
                </Box>
                <Footer />
              </>
            }
          />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/add-property" element={<AddProperty />} />
          <Route path="/raise-claim" element={<RaiseNewClaim darkMode={isDarkMode} />} />
          <Route path="/track-claim" element={<ClaimTrack />} />
          <Route path="/profile" element={<MyProfile darkMode={isDarkMode} />} />
          <Route path="/premium" element={<PremiumCalculator />} />
          <Route path="/policies" element={<HomeInsurancePolicies />} />
          <Route path="/policies/:id" element={<PolicyDetails />} /> 
          <Route path="/coverage" element={<Coverage />} />
        </Routes>

        <LoginForm
          open={authDialog === "login"}
          onClose={() => setAuthDialog(null)}
          onLoginSuccess={handleLoginSuccess}
          onRegisterClick={() => setAuthDialog("register")}
        />

        <RegisterForm
          open={authDialog === "register"}
          onClose={() => setAuthDialog(null)}
          onLoginClick={() => setAuthDialog("login")}
        />

        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme={isDarkMode ? "dark" : "light"}
        />
      </Box>
    </ThemeProvider>
  );
};

export default App;
