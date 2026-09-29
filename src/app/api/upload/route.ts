import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Sanitize file name and prepend timestamp
    const cleanFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const uniqueFileName = `${Date.now()}_${cleanFileName}`;
    const uploadDir = path.join(process.cwd(), "public", "uploads");

    try {
      await fs.mkdir(uploadDir, { recursive: true });
      const filePath = path.join(uploadDir, uniqueFileName);
      await fs.writeFile(filePath, buffer);

      const publicUrl = `/uploads/${uniqueFileName}`;
      return NextResponse.json({
        success: true,
        url: publicUrl,
        fileName: uniqueFileName,
      });
    } catch (fsError) {
      console.warn("Filesystem write restricted, converting to data URI for serverless compatibility:", fsError);
      const mime = file.type || "image/png";
      const base64 = buffer.toString("base64");
      const dataUrl = `data:${mime};base64,${base64}`;

      return NextResponse.json({
        success: true,
        url: dataUrl,
        fileName: uniqueFileName,
        serverless: true,
      });
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to upload image", details: String(error) },
      { status: 500 }
    );
  }
}

