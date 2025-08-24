import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const USER = "bencfielder@gmail.com";
const PASS = "wlrg cojv beny peyv";
const TO = "bencfielder@outlook.com";

export async function POST(request: Request) {
    try {
        const { name, email, subject, message } = await request.json();

        // Create a transporter
        const transporter = nodemailer.createTransport({
            service: "gmail", // or your preferred email service
            auth: {
                user: USER,
                pass: PASS,
            },
        });

        // Email content
        const mailOptions = {
            from: USER,
            to: TO, // Your email where you want to receive messages
            subject: `New Message from ${name} (${email})`,
            text: `
        Name: ${name}
        Email: ${email}
        Subject: ${subject}
        
        Message:
        ${message}
      `,
            html: `
        <h3>Space Worm Contact Form:</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
        };

        // Send email
        await transporter.sendMail(mailOptions);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error sending email:", error);
        return NextResponse.json({ error: "Error sending email" }, { status: 500 });
    }
}