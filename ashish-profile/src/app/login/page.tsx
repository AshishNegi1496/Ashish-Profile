"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from '@/app/store/useAuthStore';
import {
  Box,
  Button,
  TextField,
  Typography,
  Alert,
  CircularProgress,
} from "@mui/material";
import { API_BASE_URL_PROJECTS } from "../config";

export default function LoginPage() {
  const router = useRouter();

  // Zustand store setters
  const { setToken, setUsername, setRole } = useAuthStore();

  // Local state for form
  const [usernameInput, setUsernameInput] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL_PROJECTS}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: usernameInput,
          password,
        }),
      });

      if (res.ok) {
        const data = await res.json();

        setToken(data.token);
        setUsername(data.username || usernameInput);
        setRole(data.role || "ROLE_USER");

        router.push("/projects"); 
      } else {
        setError("Invalid credentials");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      maxWidth={400}
      mx="auto"
      mt={10}
      p={4}
      bgcolor="background.paper"
      borderRadius={2}
      boxShadow={3}
      component="form"
      onSubmit={handleLogin}
      display="flex"
      flexDirection="column"
      gap={2}
    >
      <Typography variant="h5" color="primary" fontWeight={600} mb={2}>
        Login
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <TextField
        label="Username"
        variant="outlined"
        fullWidth
        value={usernameInput}
        onChange={(e) => setUsernameInput(e.target.value)}
        autoComplete="username"
        required
      />
      <TextField
        label="Password"
        variant="outlined"
        type="password"
        fullWidth
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoComplete="current-password"
        required
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        disabled={loading}
        size="large"
        sx={{ mt: 2 }}
        startIcon={loading ? <CircularProgress size={20} /> : null}
      >
        {loading ? "Logging in..." : "Login"}
      </Button>
    </Box>
  );
}
