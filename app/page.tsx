import prisma from "@/prisma/client";
import { Flex, Grid } from "@radix-ui/themes";
import { Metadata } from "next";
import IssueChart from "./IssueChart";
import IssueSummary from "./IssueSummary";
import LatestIssues from "./LatestIssues";

export default async function Home() {
  try {
    const open = await prisma.issue.count({ where: { status: "OPEN" } });
    const inProgress = await prisma.issue.count({
      where: { status: "IN_PROGRESS" },
    });
    const closed = await prisma.issue.count({ where: { status: "CLOSED" } });
    const all = await prisma.issue.findMany();

    console.log("Open", open);
    console.log("Progress", inProgress);
    console.log("Closed", closed);
    console.log("All", all);

    return (
      <Grid columns={{ initial: "1", md: "2" }} gap="5">
        <Flex direction="column" gap="5">
          <IssueSummary open={open} inProgress={inProgress} closed={closed} />
          <IssueChart open={open} inProgress={inProgress} closed={closed} />
        </Flex>
        <LatestIssues />
      </Grid>
    );
  } catch (error) {
    console.log(error);
  }
}

export const metadata: Metadata = {
  title: "Issue Tracker - Dashboard",
  description: "View a summary of project issues",
};
