"use client";
import React, { useState } from "react";
import { Box } from "@mui/material";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import Link from "next/link";

function Login() {
  const [isUser, setIsUser] = useState(false);

  return (
    <div className=" p-5 flex justify-center items-center min-h-screen ">
      <div className="flex justify-center items-center  ">
        <Box
          sx={{ maxWidth: "100%", width: 500 }}
          className="flex flex-col gap-5 border p-5 border-gray-300 rounded-md"
        >
          <p className="text-center text-gray-700 font-semibold text-base sm:text-lg md:text-2xl">
            User Login
          </p>
          <TextField
            fullWidth
            id="fullwidth"
            label="Enter your email"
            type="text"
            className="outline-none w-full"
          />
          <TextField
            label="Enter your password "
            type="text"
            className="outline-none hover:outline-none border border-blue-500"
          />

          <Link href={"/dashboard"} className="w-full">
            <Button variant="contained" className="bg-gray-800 w-full">
              Login
            </Button>
          </Link>
        </Box>
      </div>
    </div>
  );
}

export default Login;
