import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

export default function IssuesPage() {
  return (
    <div>
      <Button>
        <Link href="/issues/new">New issue</Link>
      </Button>
    </div>
  );
}
