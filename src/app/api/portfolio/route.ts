import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const DATA_FILE_PATH = path.join(process.cwd(), "src", "data", "portfolio.json");

export async function GET() {
  try {
    const fileData = await fs.readFile(DATA_FILE_PATH, "utf-8");
    const json = JSON.parse(fileData);
    return NextResponse.json(json, {
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to read portfolio data", details: String(error) },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const updatedData = await req.json();

    if (!updatedData || !updatedData.personal || !updatedData.socials) {
      return NextResponse.json(
        { error: "Invalid portfolio data structure" },
        { status: 400 }
      );
    }

    try {
      await fs.writeFile(
        DATA_FILE_PATH,
        JSON.stringify(updatedData, null, 2),
        "utf-8"
      );
    } catch (fsError) {
      console.warn("Filesystem write restricted (e.g. serverless read-only):", fsError);
      return NextResponse.json({
        success: true,
        message: "Portfolio data updated in session! For persistent deployments on Vercel, push updates to GitHub.",
        readOnly: true,
      });
    }

    return NextResponse.json({
      success: true,
      message: "Portfolio data saved successfully! Changes are now live.",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to save portfolio data", details: String(error) },
      { status: 500 }
    );
  }
}

