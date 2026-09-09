import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export const POST = async function (req: NextRequest) {
  try {
    const body = await req.json();
    revalidateTag(`tenant:${body.subdomain}:page:${body.page}`, { expire: 0 });
    return NextResponse.json({ code: 200, message: "Successfull" });
  } catch (error: any) {
    return NextResponse.json({ message: error.message, }, { status: 500 });
  }
}