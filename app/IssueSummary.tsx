import { Status } from "@prisma/client";
import { Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

export default function IssueSummary({ open, inProgress, closed }: Props) {
  const container: { label: string; value: number; status: Status }[] = [
    {
      label: "Open issues",
      value: open,
      status: "OPEN",
    },
    {
      label: "In-progress issues",
      value: inProgress,
      status: "IN_PROGRESS",
    },
    {
      label: "Closed issues",
      value: closed,
      status: "CLOSED",
    },
  ];
  return (
    <Flex gap="4">
      {container.map((container) => (
        <Card key={container.label}>
          <Flex direction="column" gap="1">
            <Link
              href={`/issues/list?status=${container.status}`}
              className="text-sm font-medium"
            >
              {container.label}
            </Link>
            <Text size="5" weight="bold">
              {container.value}
            </Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
}
