"use client";
import { Issue, Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

const statuses: { label: string; value: Status }[] = [
  { label: "Open", value: "OPEN" },
  { label: "In progress", value: "IN_PROGRESS" },
  { label: "Closed", value: "CLOSED" },
];

export default function IssueStatusSelect({ issue }: { issue: Issue }) {
  const router = useRouter();
  async function handleChange(status: Status) {
    try {
      await axios.patch(`/api/issues/${issue.id}`, {
        status,
      });
      toast.success("Status successfully changed");
      router.refresh();
    } catch (error) {
      toast.error("Changes could not be saved");
    }
  }

  return (
    <>
      <Select.Root defaultValue={issue.status} onValueChange={handleChange}>
        <Select.Trigger placeholder="Change the status to..." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Status</Select.Label>
            {statuses.map((status) => (
              <Select.Item key={status.value} value={status.value}>
                {status.label}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
}
