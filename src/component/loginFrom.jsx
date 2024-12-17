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
import { useNavigate } from "react-router-dom";
import "./Login.css";

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
    <Box className="container">
      <Box className="card">
        <Typography className="title" variant="h4" gutterBottom>
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
            sx={{ mb: 2 }}
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
            sx={{ mb: 2 }}
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
          <Button type="submit" fullWidth className="button">
            Login
          </Button>
        </form>
        <Box mt={2}>
          <Typography>
            New Here?{" "}
            <span onClick={() => navigate("/signup")} className="link">
              Sign-Up
            </span>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
