"use client";
import { signIn } from "next-auth/react";

export default function OAuth() {
  return (
    <>
      <div className="flex flex-col gap-2 w-3/4">
        <button
          onClick={() => signIn("github", { redirect: true, callbackUrl: "/" })}
          className="w-full bg-gray-800 text-white font-semibold py-2 px-4 rounded hover:bg-gray-600 transition duration-200"
        >
          Login with github
        </button>
        <button
          onClick={() => signIn("google", { redirect: true, callbackUrl: "/" })}
          className="bg-red-600 text-white font-semibold py-2 px-4 rounded hover:bg-red-500 transition duration-200"
        >
          Login with google
        </button>
      </div>
    </>
  );
}
