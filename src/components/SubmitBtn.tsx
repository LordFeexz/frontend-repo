"use client";

import { Button, type ButtonProps } from "@mui/material";
import { useFormStatus } from "react-dom";
import LoaderSvg from "./svg/LoaderSvg";

export interface SubmitBtnProps extends ButtonProps {
  text: string;
  className?: string;
}

export default function SubmitBtn({
  text,
  className,
  disabled,
  ...rest
}: SubmitBtnProps) {
  const { pending } = useFormStatus();

  return (
    <Button
      {...rest}
      disabled={pending || disabled}
      aria-disabled={pending}
      className={`rounded-md ${pending && "cursor-wait"} ${
        disabled && "cursor-not-allowed opacity-40"
      } ${className} w-full flex justify-center items-center shadow-xl py-2.5 px-4 text-sm font-semibold rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none`}
    >
      {pending ? <LoaderSvg /> : text}
    </Button>
  );
}
