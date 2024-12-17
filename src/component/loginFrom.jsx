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
import SignInImage from "/images/login-Bg.jpg";
import { useNavigate } from "react-router-dom";

const styles = {
  container: {
    width: "100%",
    height: "100vh",
    backgroundImage: `url(${SignInImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "16px",
  },
  card: {
    width: "100%",
    maxWidth: 425,
    padding: "24px",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: "8px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
  },
  title: {
    fontSize: { xs: "1.8rem", sm: "2rem", md: "2.5rem" },
    textAlign: "center",
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
  link: {
    color: "#4cb5ad",
    cursor: "pointer",
    textDecoration: "underline",
    fontWeight: "bold",
  },
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ email: "", password: "" });
  const [passwordVisible, setPasswordVisible] = useState(false);

  const navigate = useNavigate();

  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let valid = true;
    const newError = { email: "", password: "" };

    if (!/\S+@\S+\.\S+/.test(email)) {
      newError.email = "Invalid email format.";
      valid = false;
    }
    if (!password) {
      newError.password = "Password cannot be empty.";
      valid = false;
    }

    setError(newError);

    if (valid) {
      try {
        const response = await fakeLoginAPI({ email, password });
        response.success
          ? alert("Login successful!")
          : alert(`Login failed: ${response.message}`);
      } catch (error) {
        console.error("Error during login:", error);
        alert("An unexpected error occurred. Please try again.");
      }
    }
  };

  const fakeLoginAPI = async (credentials) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (
          credentials.email === "test@example.com" &&
          credentials.password === "password123"
        ) {
          resolve({ success: true });
        } else {
          resolve({ success: false, message: "Invalid credentials" });
        }
      }, 1000);
    });
  };

  return (
    <Box sx={styles.container}>
      <Box sx={styles.card}>
        <Typography variant="h4" sx={styles.title} gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!error.email}
            helperText={error.email}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            fullWidth
            label="Password"
            type={passwordVisible ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!error.password}
            helperText={error.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibility}>
                    {passwordVisible ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ marginBottom: 2 }}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={styles.button}
          >
            Login
          </Button>
        </form>
        <Box mt={2}>
          <Typography>
            Don't have an account?{" "}
            <span onClick={() => navigate("/signup")} style={styles.link}>
              Sign Up
            </span>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
