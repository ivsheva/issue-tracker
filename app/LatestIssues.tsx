import prisma from "@/prisma/client";
import { Avatar, Card, Flex, Heading, Table } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import NextLink from "next/link";
import { IssueStatusBadge } from "./components";

export default async function LatestIssues() {
  const session = await getServerSession();
  const currentUser = session?.user
    ? await prisma.user.findUnique({
        where: { email: session?.user?.email! },
      })
    : undefined;

  const issues = currentUser
    ? await prisma.issue.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
        where: {
          assignedToUserId: currentUser?.id,
        },
      })
    : [];

  return (
    <Card>
      <Heading size="4">Latest issues</Heading>
      <Table.Root mt="5">
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Flex justify="between">
                  <Flex direction="column" align="start" gap="2">
                    <NextLink href={`/issues/${issue.id}`}>
                      {issue.title}
                    </NextLink>
                    <IssueStatusBadge status={issue.status} />
                  </Flex>
                  <Flex>
                    <Avatar
                      src={currentUser?.image!}
                      fallback="?"
                      size="2"
                      radius="full"
                    />
                  </Flex>
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Card>
  );
}
