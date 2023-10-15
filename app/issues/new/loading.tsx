import { Box } from "@radix-ui/themes";
import { Skeleton } from "@/app/components";

export default function LoadingNewIssuePage() {
  return (
    <Box className="max-w-xl">
      <Skeleton />
      <Skeleton height="20rem" />
    </Box>
  );
}
