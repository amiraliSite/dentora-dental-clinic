import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";

const appointmentSchema = z.object({
  name: z.string().min(2, "Name too short").max(120),
  phone: z.string().min(7, "Phone too short").max(30),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  service: z.string().min(1).max(160),
  doctor: z.string().max(160).optional().or(z.literal("")),
  date: z.string().min(1).max(40),
  time: z.string().max(20).optional().or(z.literal("")),
  message: z.string().max(2000).optional().or(z.literal("")),
  lang: z.string().max(8).optional(),
});

function startOfMonth(): Date {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), 1);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = appointmentSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: "validation", issues: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const data = parsed.data;
    const appointment = await db.appointment.create({
      data: {
        name: data.name,
        phone: data.phone,
        email: data.email || null,
        service: data.service,
        doctor: data.doctor || null,
        date: data.date,
        time: data.time || null,
        message: data.message || null,
        lang: data.lang || "fa",
      },
    });

    const count = await db.appointment.count({
      where: { createdAt: { gte: startOfMonth() } },
    });

    return NextResponse.json({ success: true, id: appointment.id, count }, { status: 201 });
  } catch (error) {
    console.error("[appointments POST]", error);
    return NextResponse.json({ success: false, error: "server" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const count = await db.appointment.count({
      where: { createdAt: { gte: startOfMonth() } },
    });
    return NextResponse.json({ success: true, count });
  } catch (error) {
    console.error("[appointments GET]", error);
    return NextResponse.json({ success: true, count: 0 });
  }
}
