"use client";
import React, { useState } from "react";
import { Box, TextField, Button, Alert, CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";

function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setLoading(true);

    try {
      const response = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: email, // API uses 'username' field
          password: password,
          expiresInMins: 30, // optional, defaults to 60
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Store token and user data in localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("refreshToken", data.refreshToken);
      localStorage.setItem("user", JSON.stringify(data));

      setSuccess(true);
      
      // Redirect to dashboard after successful login
      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);

    } catch (err) {
      setError(err.message || "Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5 flex justify-center items-center min-h-screen">
      <div className="flex justify-center items-center">
        <Box
          component="form"
          onSubmit={handleLogin}
          sx={{ maxWidth: "100%", width: 500 }}
          className="flex flex-col gap-5 border p-5 border-gray-300 rounded-md"
        >
          <p className="text-center text-gray-700 font-semibold text-base sm:text-lg md:text-2xl">
            User Login
          </p>

          {error && (
            <Alert severity="error" onClose={() => setError("")}>
              {error}
            </Alert>
          )}

          {success && (
            <Alert severity="success">
              Login successful! Redirecting...
            </Alert>
          )}

          <TextField
            fullWidth
            label="Enter your username"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />

          <TextField
            fullWidth
            label="Enter your password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
          />

          <Button
            type="submit"
            variant="contained"
            className="w-full"
            disabled={loading}
            sx={{
              backgroundColor: "#1f2937",
              "&:hover": {
                backgroundColor: "#374151",
              },
            }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
          </Button>

          <div className="text-center text-sm text-gray-600">
            <p>Test credentials:</p>
            <p>Username: <strong>emilys</strong></p>
            <p>Password: <strong>emilyspass</strong></p>
          </div>
        </Box>
      </div>
    </div>
  );
}

export default Login;