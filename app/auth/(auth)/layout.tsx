import { Metadata } from "next";
import { PropsWithChildren } from "react";

export default function layout({ children }: PropsWithChildren) {
  return <div>{children}</div>;
}

export const metadata: Metadata = {
  title: "Issue Tracker - Sign In",
};
