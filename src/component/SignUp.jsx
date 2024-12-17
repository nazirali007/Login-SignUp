import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import SignUpImage from "/images/sign-Up-Bg.jpg";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      backgroundImage: `url(${SignUpImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      padding: "1rem",
    },
    formContainer: {
      backgroundColor: "rgba(255, 255, 255, 0.9)",
      padding: "2rem",
      borderRadius: "8px",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
      maxWidth: "400px",
      width: "100%",
    },
    title: {
      textAlign: "center",
      fontSize: "1.5rem",
      fontWeight: "bold",
      color: "#333",
      marginBottom: "1.5rem",
    },
    textField: {
      marginBottom: "1rem",
    },
    button: {
      backgroundColor: "#1976d2",
      color: "white",
      fontWeight: "bold",
      textTransform: "none",
      width: "100%",
      padding: "0.75rem 1rem",
      borderRadius: "4px",
      backgroundColor: "#088076",
      "&:hover": {
        backgroundColor: "#06635A",
      },
    },
    footer: {
      textAlign: "center",
      marginTop: "1rem",
    },
    footerLink: {
      color: "#4cb5ad",
      cursor: "pointer",
      textDecoration: "underline",
      fontWeight: "bold",
    },
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState({});
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newError = {};
    let valid = true;

    // Validation checks
    if (!formData.name) {
      newError.name = "Name is required.";
      valid = false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newError.email = "Invalid email format.";
      valid = false;
    }
    if (formData.password.length < 8) {
      newError.password = "Password must be at least 8 characters long.";
      valid = false;
    }
    if (formData.password !== formData.confirmPassword) {
      newError.confirmPassword = "Passwords do not match.";
      valid = false;
    }

    setError(newError);

    if (valid) {
      try {
        await new Promise((resolve) => setTimeout(resolve, 500));
        localStorage.setItem("user", JSON.stringify(formData));
        alert("Signup successful!");
      } catch (error) {
        console.error("Error during signup:", error);
        alert("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <Box style={styles.container}>
      <Box style={styles.formContainer}>
        <Typography style={styles.title}>Sign Up</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={!!error.name}
            helperText={error.name}
            style={styles.textField}
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={!!error.email}
            helperText={error.email}
            style={styles.textField}
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            type={passwordVisible ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
            error={!!error.password}
            helperText={error.password}
            style={styles.textField}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibility} edge="end">
                    {passwordVisible ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            fullWidth
            label="Confirm Password"
            name="confirmPassword"
            type={confirmPasswordVisible ? "text" : "password"}
            value={formData.confirmPassword}
            onChange={handleChange}
            error={!!error.confirmPassword}
            helperText={error.confirmPassword}
            style={styles.textField}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={toggleConfirmPasswordVisibility}
                    edge="end"
                  >
                    {confirmPasswordVisible ? (
                      <VisibilityOff />
                    ) : (
                      <Visibility />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={styles.button}
          >
            SignUp
          </Button>
        </form>
        <Box>
          <Typography style={styles.footer}>
            Already have an account?{" "}
            <span style={styles.footerLink} onClick={() => navigate("/login")}>
              Login
            </span>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default SignUp;
