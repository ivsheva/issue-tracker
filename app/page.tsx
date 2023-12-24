import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import { Flex, Grid } from "@radix-ui/themes";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import IssueChart from "./IssueChart";
import IssueSummary from "./IssueSummary";
import LatestIssues from "./LatestIssues";

async function countIssuesByStatus(status: Status, userId?: string) {
  if (userId)
    return prisma.issue.count({
      where: { status, assignedToUserId: userId },
    });
  return 0;
}

export default async function Home() {
  const session = await getServerSession();
  const currentUser = session?.user
    ? await prisma.user.findUnique({
        where: { email: session?.user?.email! },
      })
    : undefined;

  const open = await countIssuesByStatus("OPEN", currentUser?.id);
  const inProgress = await countIssuesByStatus("IN_PROGRESS", currentUser?.id);
  const closed = await countIssuesByStatus("CLOSED", currentUser?.id);

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Flex direction="column" gap="5">
        <IssueSummary open={open} inProgress={inProgress} closed={closed} />
        <IssueChart open={open} inProgress={inProgress} closed={closed} />
      </Flex>
      <LatestIssues />
    </Grid>
  );
}

export const metadata: Metadata = {
  title: "Issue Tracker - Dashboard",
  description: "View a summary of project issues",
};
