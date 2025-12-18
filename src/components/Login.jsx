"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button, TextField, Box } from "@mui/material";
import { useState } from "react";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ username: "", password: "" });

  const handleLogin = async () => {
    const res = await signIn("credentials", {
      ...form,
      redirect: false,
    });

    console.log("res-->", res);

    if (res?.ok) {
      router.push("/dashboard");
    } else {
      toast.error("Invalid credentials");
    }
  };

  console.log(form);

  return (
    <Box className="min-h-screen flex justify-center items-center">
      <Box width={400} p={4} border={1}>
        <TextField
          fullWidth
          label="Username"
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          sx={{ mt: 2 }}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <Button
          fullWidth
          sx={{ mt: 3 }}
          variant="contained"
          onClick={handleLogin}
        >
          Login
        </Button>

        <p className="mt-5 text-gray-700 font-semibold">Credentail</p>
        <p className="text-lg text-gray-700">
          Username: <span className="text-base text-indigo-600">emilys</span>
        </p>
        <p className="text-lg text-gray-700">
          Password:{" "}
          <span className="text-base text-indigo-600">emilyspass</span>
        </p>
      </Box>
    </Box>
  );
}
