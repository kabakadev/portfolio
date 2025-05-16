import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Read SMTP credentials from environment
const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, EMAIL_FROM, EMAIL_TO } =
  process.env;

if (
  !SMTP_HOST ||
  !SMTP_PORT ||
  !SMTP_USER ||
  !SMTP_PASS ||
  !EMAIL_FROM ||
  !EMAIL_TO
) {
  console.error("Missing one or more SMTP environment variables");
}

// Create reusable transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: Number(SMTP_PORT),
  secure: Number(SMTP_PORT) === 465, // true for 465, false for other ports
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
});

interface ContactRequest {
  name: string;
  email: string;
  message: string;
}

export async function POST(request: Request) {
  try {
    const data: ContactRequest = await request.json();
    const { name, email, message } = data;

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Send mail
    await transporter.sendMail({
      from: EMAIL_FROM,
      to: EMAIL_TO,
      subject: `New contact from ${name}`,
      replyTo: email,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      html: `<p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Message:</strong><br/>${message.replace(
               /\n/g,
               "<br/>"
             )}</p>`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in /api/contact:", error);
    return NextResponse.json(
      { error: (error as Error)?.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
