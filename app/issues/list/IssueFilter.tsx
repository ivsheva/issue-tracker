import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";

const statuses: { label: string; value?: Status }[] = [
  { label: "All" },
  { label: "Open", value: "OPEN" },
  { label: "In progress", value: "IN_PROGRESS" },
  { label: "Closed", value: "CLOSED" },
];

export default function IssueFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleSubmit(status: Status) {
    const params = new URLSearchParams();
    if (status) params.append("status", status);
    if (searchParams.get("orderBy"))
      params.append("orderBy", searchParams.get("orderBy")!);
    const query = params.size ? "?" + params.toString() : "";
    router.push("/issues/list" + query);
  }

  return (
    <Select.Root
      defaultValue={searchParams.get("status") || ""}
      onValueChange={handleSubmit}
    >
      <Select.Trigger placeholder="Filter by status..." />
      <Select.Content>
        {statuses.map((status, index) => (
          <Select.Item key={index} value={status.value || ""}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
}
