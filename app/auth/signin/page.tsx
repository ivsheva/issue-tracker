"use client";
import { ErrorMessage } from "@/app/components";
import { LoginUserSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { Button, TextField } from "@radix-ui/themes";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import CalloutError from "../CalloutError";

const loginBlocks: { label: string; value: "email" | "password" }[] = [
  {
    label: "Email",
    value: "email",
  },
  {
    label: "Password",
    value: "password",
  },
];

type LoginFormData = z.infer<typeof LoginUserSchema>;

export default function LoginPage() {
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<LoginFormData>({ resolver: zodResolver(LoginUserSchema) });
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callBackUrl") || "/";

  const onSubmit = async (data: LoginFormData) => {
    const response = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
      callbackUrl,
    });
    if (response?.error) setError("Invalid email or password.");
    else router.push(callbackUrl);
  };

  return (
    <form
      className="flex flex-col items-center justify-center border rounded-xl h-96 w-96 m-auto space-y-5 py-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      {error && <CalloutError>{error}</CalloutError>}
      {loginBlocks.map((block, index) => (
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
