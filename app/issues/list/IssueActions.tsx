"use client";
import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import IssueFilter from "./IssueFilter";

export default function IssueActions() {
  return (
    <Flex justify="between">
      <IssueFilter />
      <Button>
        <Link href="/issues/new">New issue</Link>
      </Button>
    </Flex>
  );
}
