import cloudinary from "../../../lib/cloudinary";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json(
        { message: "File not found" },
        { status: 400 }
      );
    }

    // 🔥 IMPORTANT
    const mimeType = file.type; // image/png | video/mp4
    const isVideo = mimeType.startsWith("video");

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: "AuraWear",
          resource_type: isVideo ? "video" : "image", // 🔥 FIX
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(buffer);
    });

    return NextResponse.json({
      url: uploadResult.secure_url,
      type: isVideo ? "video" : "image",
    });

  } catch (error) {
    console.error("Cloudinary Upload Error:", error);

    return NextResponse.json(
      { message: error.message || "Upload Failed" },
      { status: 500 }
    );
  }
}
