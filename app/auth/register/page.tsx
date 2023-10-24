"use client";
import { ErrorMessage } from "@/app/components";
import { UserSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { Button, Callout, TextField } from "@radix-ui/themes";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

type RegisterFormData = z.infer<typeof UserSchema>;

const registerBlocks: {
  label: string;
  value: "username" | "email" | "password";
}[] = [
  {
    label: "Username",
    value: "username",
  },
  {
    label: "Email",
    value: "email",
  },
  {
    label: "Password",
    value: "password",
  },
];

export default function RegisterForm() {
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(UserSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await axios.post("/api/register", data);
      await signIn("credentials", {
        email: data.email,
        password: data.password,
        callbackUrl: "/",
      });
    } catch (error: any) {
      if (typeof error === "object") setError(error.response.data.error);
      console.log(error);
    }
  };

  return (
    <form
      className="flex flex-col items-center justify-center border rounded-xl h-96 w-96 m-auto space-y-5 py-2 "
      onSubmit={handleSubmit(onSubmit)}
    >
      {error && (
        <Callout.Root>
          <Callout.Text color="red">{error}</Callout.Text>
        </Callout.Root>
      )}
      {registerBlocks.map((block, index) => (
        <div key={index}>
          <label>{block.label}</label>
          <TextField.Root>
            {block.value === "password" && (
              <TextField.Slot
                className="cursor-pointer"
                onClick={() => setShow((prevShow) => !prevShow)}
              >
                {show ? <EyeOpenIcon /> : <EyeClosedIcon />}
              </TextField.Slot>
            )}
            <TextField.Input
              {...register(block.value)}
              placeholder={block.label}
              type={block.value === "password" && !show ? "password" : "text"}
              min="8"
              max="60"
            />
          </TextField.Root>
          <ErrorMessage>
            {block.value === "email"
              ? errors.email?.message
              : errors.password?.message}
          </ErrorMessage>
        </div>
      ))}
      <Button disabled={isSubmitting}>Submit</Button>
    </form>
  );
}
