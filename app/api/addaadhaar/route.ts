import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function PATCH(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }
  const body = await request.json();
  const { aadhaar } = body;

  if (aadhaar) {
    await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        aadhaar,
      },
    });
  }

  const updatedUser = await prisma.user.findUnique({
    where: {
      id: currentUser.id,
    },
  });

  return NextResponse.json(updatedUser);
}
