import { UserSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

export async function POST(request: NextRequest) {
  const body = (await request.json()) as z.infer<typeof UserSchema>;

  const validation = UserSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  const user = await prisma.user.findUnique({
    where: { email: body.email },
  });
  if (user)
    return NextResponse.json({ error: "User already exists" }, { status: 400 });

  const hashedPassword = await bcrypt.hash(body.password, 10);

  const newUser = await prisma.user.create({
    data: {
      email: body.email,
      name: body.username,
      hashedPassword,
      image: "https://i.pinimg.com/564x/23/7d/11/237d115aef37f46928913548d631710d.jpg"
    },
  });

  return NextResponse.json({ email: newUser.email, username: newUser.name });
}
