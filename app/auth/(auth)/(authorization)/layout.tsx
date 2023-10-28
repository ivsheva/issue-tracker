/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { useSearchParams } from "next/navigation";
import { PropsWithChildren } from "react";
import CalloutError from "../../CalloutError";
import OAuth from "../../OAuth";

export default function layout({ children }: PropsWithChildren) {
  const searchParams = useSearchParams();

  const error = searchParams.get("error");

  return (
    <div className="flex flex-col items-center justify-center border rounded-xl h-auto w-96 m-auto py-5 space-y-5">
      {error && (
        <CalloutError>{`${error}, Try sign in with different provider or using credentials`}</CalloutError>
      )}
      {children}
      <OAuth />
    </div>
  );
}
