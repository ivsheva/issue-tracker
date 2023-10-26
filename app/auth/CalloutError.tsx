import { Callout } from "@radix-ui/themes";
import { ReactNode } from "react";

export default function CalloutError({ children }: { children: ReactNode }) {
  return (
    <Callout.Root>
      <Callout.Text color="red">{children}</Callout.Text>
    </Callout.Root>
  );
}
