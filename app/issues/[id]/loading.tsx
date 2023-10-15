import { Box, Card, Flex } from "@radix-ui/themes";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function LoadingIssueDetailsPage() {
  return (
    <Box className="max-w-xl">
      <Skeleton width="10rem" height="1rem" />
      <Flex gap="3" my="2" mb="4">
        <Skeleton width="5rem" />
        <Skeleton width="8rem" />
      </Flex>
      <Card>
        <Skeleton count={5} />
      </Card>
    </Box>
  );
}
