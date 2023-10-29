import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { IssueSchema } from "../../validationSchemas";
import { getServerSession } from "next-auth";

export async function POST(request: NextRequest) {
  const session = await getServerSession();
  if (!session) return NextResponse.json({}, {status: 401})

  const body = await request.json();
  const validation = IssueSchema.safeParse(body);

  const currentUser = await prisma.user.findUnique({
    where: { email: session.user?.email! }
  }) // find current user

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const newIssue = await prisma.issue.create({
    data: {
      title: body.title,
      description: body.description,
      assignedToUserId: currentUser?.id
    },
  });

  return NextResponse.json(newIssue, { status: 201 });
}
