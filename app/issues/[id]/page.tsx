import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import IssueDeleteButton from "./IssueDeleteButton";
import IssueDetails from "./IssueDetails";
import IssueEditButton from "./IssueEditButton";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";
import IssueSelect from "./IssueSelect";

interface Props {
  params: {
    id: string;
  };
}

export default async function IssueDetailPage({ params: { id } }: Props) {
  const issue = await prisma.issue.findUnique({
    where: { id: Number(id) },
  });
  const session = await getServerSession(authOptions);

  if (!issue) notFound();

  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className="md:col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      {session && (
        <Flex direction="column" gap="4">
          <IssueSelect />
          <IssueEditButton issueId={issue.id} />
          <IssueDeleteButton issueId={issue.id} />
        </Flex>
      )}
    </Grid>
  );
}
