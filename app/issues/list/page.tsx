import Pagination from "@/app/components/pagination";
import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import { Flex } from "@radix-ui/themes";
import { Metadata } from "next";
import IssueActions from "./IssueActions";
import IssueTable, { IssueQuery, columnNames } from "./IssueTable";
import { getServerSession } from "next-auth";

interface Props {
  searchParams: IssueQuery;
}

export default async function IssuesPage({ searchParams }: Props) {
  const session = await getServerSession();
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const currentUser = session?.user
    ? await prisma.user.findUnique({
        where: { email: session?.user?.email! },
      })
    : undefined;

  const where = { status, assignedToUserId: currentUser?.id };

  const orderBy =
    columnNames.includes(searchParams.orderBy) || searchParams.order
      ? { [searchParams.orderBy]: searchParams.order }
      : undefined;

  const page = Number(searchParams.page) || 1;
  const pageSize = 10;

  const issues = currentUser
    ? await prisma.issue.findMany({
        where,
        orderBy,
        skip: (page - 1) * pageSize,
        take: pageSize,
      })
    : [];

  const totalIssues = await prisma.issue.count({
    where,
  });

  return (
    <Flex direction="column" gap="3">
      <IssueActions />
      <IssueTable searchParams={searchParams} issues={issues} />
      <Pagination
        currentPage={page}
        itemCount={totalIssues}
        pageSize={pageSize}
      />
    </Flex>
  );
}

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Issue Tracker - Issue List",
  description: "View all project issues",
};
