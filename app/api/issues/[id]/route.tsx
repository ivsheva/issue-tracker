import { PatchIssueSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

interface ParamsProps {
  params: { id: string };
}

export async function PATCH(request: NextRequest, { params }: ParamsProps) {
  const session = await getServerSession();
  if (!session) return NextResponse.json({}, { status: 401 });

  const body = await request.json();
  const validation = PatchIssueSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const issue = await prisma.issue.findUnique({
    where: { id: Number(params.id) },
  });

  const { title, description, assignedToUserId, status } = body;

  if (assignedToUserId) {
    const user = await prisma.user.findUnique({
      where: { id: assignedToUserId },
    });
    if (!user)
      return NextResponse.json(
        { error: "This user does not exist" },
        { status: 400 }
      );
  }

  if (!issue)
    return NextResponse.json({ error: "Invalid issue" }, { status: 404 });

  const updatedIssue = await prisma.issue.update({
    where: { id: issue.id },
    data: {
      title,
      description,
      assignedToUserId,
      status,
    },
  });

  return NextResponse.json(updatedIssue, { status: 200 });
}

export async function DELETE(request: NextRequest, { params }: ParamsProps) {
  const session = await getServerSession();
  if (!session) return NextResponse.json({}, { status: 401 });

  const issue = await prisma.issue.findUnique({
    where: { id: Number(params.id) },
  });

  if (!issue)
    return NextResponse.json(
      { error: "Issue does not exist" },
      { status: 404 }
    );

  await prisma.issue.delete({
    where: { id: issue.id },
  });

  return NextResponse.json({});
}
