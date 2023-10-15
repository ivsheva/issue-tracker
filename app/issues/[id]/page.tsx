import prisma from "@/prisma/client";
import { notFound } from "next/navigation";

interface Props {
  params: {
    id: string;
  };
}

export default async function IssueDetailPage({ params: { id } }: Props) {
  const issue = await prisma.issue.findUnique({
    where: { id: Number(id) },
  });

  if (!issue) notFound();

  return (
    <div>
      <p>{issue.title}</p>
      <p>{issue.description}</p>
      <p>{issue.status}</p>
      <p>{issue.createdAt.toDateString()}</p>
    </div>
  );
}
