"use client";
import { Button, TextArea, TextField } from "@radix-ui/themes";

export default function NewIssuePage() {
  return (
    <div className="max-w-xl space-y-3">
      <TextField.Root>
        <TextField.Input placeholder="Title" />
      </TextField.Root>
      <TextArea placeholder="Description" />
      <Button>Submit new Issue</Button>
    </div>
  );
}
