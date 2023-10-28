import { Metadata } from "next";
import dynamic from "next/dynamic";
import IssueFormSkeleton from "../_components/IssueFormSkeleton";

const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

export default function NewIssuePage() {
  return <IssueForm />;
}

export const metadata: Metadata = {
  title: "Issue Tracker - Create New Issue",
};
