import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  let body: {
    name?: unknown;
    email?: unknown;
    subject?: unknown;
    message?: unknown;
    website?: unknown;
  };

  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON request payload." },
      { status: 400 }
    );
  }

  // Honeypot check: If the hidden 'website' field is filled, silently return 200 without sending
  if (body.website && typeof body.website === "string" && body.website.trim().length > 0) {
    return NextResponse.json({ success: true, message: "Message received." }, { status: 200 });
  }

  const { name, email, subject, message } = body;

  // Validate presence and types
  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof subject !== "string" ||
    typeof message !== "string"
  ) {
    return NextResponse.json(
      { error: "Name, email, subject, and message are required fields." },
      { status: 400 }
    );
  }

  const trimmedName = name.trim();
  const trimmedEmail = email.trim();
  const trimmedSubject = subject.trim();
  const trimmedMessage = message.trim();

  // Validate lengths
  if (trimmedName.length === 0 || trimmedName.length > 100) {
    return NextResponse.json(
      { error: "Name must be between 1 and 100 characters." },
      { status: 400 }
    );
  }

  if (trimmedEmail.length === 0 || trimmedEmail.length > 254 || !EMAIL_REGEX.test(trimmedEmail)) {
    return NextResponse.json(
      { error: "Please provide a valid email address." },
      { status: 400 }
    );
  }

  if (trimmedSubject.length === 0 || trimmedSubject.length > 200) {
    return NextResponse.json(
      { error: "Subject must be between 1 and 200 characters." },
      { status: 400 }
    );
  }

  if (trimmedMessage.length === 0 || trimmedMessage.length > 5000) {
    return NextResponse.json(
      { error: "Message must be between 1 and 5000 characters." },
      { status: 400 }
    );
  }

  // Check Resend API key
  const resendApiKey = process.env.RESEND_API_KEY;
  if (!resendApiKey) {
    return NextResponse.json(
      { error: "Contact service is currently unavailable. Please try again later." },
      { status: 500 }
    );
  }

  try {
    const plainTextBody = `Name: ${trimmedName}\nEmail: ${trimmedEmail}\n\nMessage:\n${trimmedMessage}`;

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Portfolio <onboarding@resend.dev>",
        to: ["usmaank022@gmail.com"],
        reply_to: trimmedEmail,
        subject: `[Portfolio] ${trimmedSubject}`,
        text: plainTextBody,
      }),
    });

    if (!resendResponse.ok) {
      const errorJson = await resendResponse.json().catch(() => null);
      return NextResponse.json(
        { error: errorJson?.message || "Failed to deliver message via email provider." },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Message dispatched successfully.",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "An unexpected error occurred while dispatching the message." },
      { status: 500 }
    );
  }
}

export async function GET() {
  return new NextResponse("Method Not Allowed", { status: 405 });
}

export async function PUT() {
  return new NextResponse("Method Not Allowed", { status: 405 });
}

export async function DELETE() {
  return new NextResponse("Method Not Allowed", { status: 405 });
}

export async function PATCH() {
  return new NextResponse("Method Not Allowed", { status: 405 });
}

export async function HEAD() {
  return new NextResponse("Method Not Allowed", { status: 405 });
}

export async function OPTIONS() {
  return new NextResponse("Method Not Allowed", { status: 405 });
}
