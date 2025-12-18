"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/useAuthStore";
import { Button, TextField, Box } from "@mui/material";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const setAuth = useAuthStore((s) => s.setAuth);
  const [form, setForm] = useState({ username: "", password: "" });

  const handleLogin = async () => {
    const res = await signIn("credentials", {
      ...form,
      redirect: false,
    });

    if (!res.error) router.push("/dashboard");
  };

  return (
    <Box className="min-h-screen flex justify-center items-center">
      <Box width={400} p={4}>
        <TextField fullWidth label="Username" onChange={(e)=>setForm({...form,username:e.target.value})}/>
        <TextField fullWidth label="Password" type="password" sx={{mt:2}}
          onChange={(e)=>setForm({...form,password:e.target.value})}/>
        <Button fullWidth variant="contained" sx={{mt:3}} onClick={handleLogin}>
          Login
        </Button>
      </Box>
    </Box>
  );
}
