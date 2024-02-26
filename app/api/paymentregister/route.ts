import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";

interface Props {
  listingId: string;
  price: number;
}
export async function POST(params: Props) {
  const currentUser = await getCurrentUser();
  //   const { id } = currentUser;
  if (!currentUser) {
    return NextResponse.error();
  }

  const { listingId, price } = params;
  if (!listingId || typeof listingId !== "string") {
    throw new Error("Invalid ID");
  }

  const payment = prisma?.paymentHistory.create({
    data: {
      listingId,
      amount: price,
      userId: currentUser.id,
    },
  });
  if (!payment) {
    return NextResponse.error();
  }
  return NextResponse.json({
    status: 200,
    message: "payment history saved",
  });
}
