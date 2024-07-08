"use client";

import SubmitBtn from "@/components/SubmitBtn";
import { Box, TextField } from "@mui/material";
import { useState, type ChangeEvent } from "react";
import { loginHandler } from "../action";
import { swalError } from "@/utils/swal";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const [{ email, password }, setData] = useState({
    email: "",
    password: "",
  });

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const actionHandler = async (formData: FormData) => {
    if (!email || !password) return;

    formData.append("email", email);
    formData.append("password", password);
    const { error, data } = await loginHandler(formData);
    if (error) {
      swalError(error);
      return;
    }

    if (data) {
      await signIn("credentials", { access_token: data, redirect: false });
      router.push("/");
      return;
    }

    swalError("unexpected error");
  };

  return (
    <Box
      component="form"
      sx={{
        mt: 1,
        border: "1px solid #E2E8F0",
        m: "auto",
        width: "100%",
        maxWidth: "400px",
        p: 4,
        borderRadius: "6px",
      }}
      action={actionHandler}
      className="space-y-6"
    >
      <TextField
        margin="normal"
        required
        fullWidth
        sx={{ borderRadius: "6px" }}
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        autoFocus
        value={email}
        onChange={onChangeHandler}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        sx={{ borderRadius: "6px" }}
        id="password"
        autoComplete="current-password"
        className="w-full text-sm px-4 py-3.5 rounded-md outline-blue-600"
        value={password}
        onChange={onChangeHandler}
      />

      <SubmitBtn
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        text="Sign in"
        disabled={!email || !password}
      />
    </Box>
  );
}
