"use client";
import { Select } from "@radix-ui/themes";

export default function IssueSelect() {
  return (
    <Select.Root>
      <Select.Trigger placeholder="Assign..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          <Select.Item value="1">Shevchenko Ivan</Select.Item>
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
}
