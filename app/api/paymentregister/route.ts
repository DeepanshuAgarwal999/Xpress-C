import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";

interface Props {
  listingId: string;
  price: string;
}
export async function POST(request:Request) {
  const currentUser = await getCurrentUser();
  const body:unknown = await request.json();
  const { listingId, price } = body as Props;
  if (!currentUser) {
    return NextResponse.error();
  }
  console.log("1")
  // const { listingId, price } = params;
  if (!listingId || typeof listingId !== "string") {
    throw new Error("Invalid ID");
  }
  console.log("2")
  const payment:unknown = await prisma?.paymentHistory.create({
    data: {
      listingId,
      amount: parseInt(parseFloat(price)),
      userId: currentUser.id,
    },
  });
  console.log("3.5")

  if (!payment) {
    console.log("3")
    return NextResponse.error();
  }
  console.log("4")
  return NextResponse.json({
    status: 200,
    message: "payment history saved",
  });
}
