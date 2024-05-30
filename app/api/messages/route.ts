import { retrieveData, retrieveDataById } from "@/lib/firebase/service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (id) {
    const detailMessage = await retrieveDataById("message", id);
    if (detailMessage) {
      return NextResponse.json({
        status: 200,
        message: "Success",
        data: detailMessage,
      });
    }

    return NextResponse.json({
      status: 404,
      message: "Not Found",
      data: [],
    });
  }

  const messages = await retrieveData("message");

  return NextResponse.json({ status: 200, message: "Success", data: messages });
}
