import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";

const contactSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email().max(160),
  subject: z.string().max(200).optional().or(z.literal("")),
  message: z.string().min(5).max(3000),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: "validation", issues: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }
    const data = parsed.data;
    const saved = await db.contactMessage.create({
      data: {
        name: data.name,
        email: data.email,
        subject: data.subject || null,
        message: data.message,
      },
    });
    return NextResponse.json({ success: true, id: saved.id }, { status: 201 });
  } catch (error) {
    console.error("[contact POST]", error);
    return NextResponse.json({ success: false, error: "server" }, { status: 500 });
  }
}
