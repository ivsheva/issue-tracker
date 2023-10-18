"use client";
import { Skeleton } from "@/app/components";
import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function IssueSelect({ issue }: { issue: Issue }) {
  const { data: users, isLoading, error } = useUsers();

  if (error) return null;

  if (isLoading) return <Skeleton />;

  function handleSubmit(userId: string) {
    axios.patch(`/api/issues/${issue.id}`, {
      assignedToUserId: userId !== "null" ? userId : null,
    });
  }

  return (
    <Select.Root
      defaultValue={issue.assignedToUserId || "null"}
      onValueChange={handleSubmit}
    >
      <Select.Trigger placeholder="Assign..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          <Select.Item value="null">Unassigned</Select.Item>
          {users?.map((user) => (
            <Select.Item key={user.id} value={user.id}>
              {user.name}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
}

const useUsers = () =>
  useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then((response) => response.data),
    staleTime: 60 * 1000, // 60sec
    retry: 3,
  });
