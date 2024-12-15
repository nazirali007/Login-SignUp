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
import SignInImage from "../../public/images/signup-bg.jpg";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ email: "", password: "" });
  const [passwordVisible, setPasswordVisible] = useState(false);

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

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
        // Simulate an API call with async/await
        const response = await fakeLoginAPI({ email, password });
        if (response.success) {
          alert("Login successful!");
        } else {
          alert("Login failed: " + response.message);
        }
      } catch (error) {
        console.error("Error during login:", error);
        alert("An unexpected error occurred. Please try again.");
      }
    }
  };

  // Mock API function for demonstration
  const fakeLoginAPI = async (credentials) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (
          credentials.email === "test@gmail.com" &&
          credentials.password === "test123"
        ) {
          resolve({ success: true });
        } else {
          resolve({ success: false, message: "Invalid credentials" });
        }
      }, 1000);
    });
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        backgroundImage: `url(${SignInImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: 425,
          padding: 4,
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontSize: { xs: "1.8rem", sm: "2rem", md: "2.5rem" },
            textAlign: "center",
          }}
        >
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!error.email}
            helperText={error.email}
            sx={{ mb: 2, filter: "none" }}
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            type={passwordVisible ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!error.password}
            helperText={error.password}
            sx={{ mb: 2, filter: "none" }}
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

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              padding: "10px",
              mt: 2,
              backgroundColor: "#088076",
              "&:hover": {
                backgroundColor: "#06635A",
              },
            }}
          >
            Login
          </Button>
        </form>
        <Box mt={2}>
          <Typography>
            New Here ?{" "}
            <span
              onClick={() => navigate("/signup")}
              style={{
                color: "#4cb5ad",
                cursor: "pointer",
                textDecoration: "underline",
              }}
            >
              Sign-Up
            </span>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
