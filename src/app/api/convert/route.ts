import { NextResponse } from "next/server";
import { convertToMD } from "@/lib/medium/convert";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");

  if (!url) {
    return NextResponse.json(
      { error: true, markdown: "No URL provided." },
      { status: 400 }
    );
  }

  const result = await convertToMD(url);

  if ("error" in result && result.error) {
    return NextResponse.json({ error: true, markdown: result.markdown });
  } else {
    // result is { error: false, markdown: string, title: string }
    return NextResponse.json({ error: false, markdown: result.markdown, title: result.title });
  }
}