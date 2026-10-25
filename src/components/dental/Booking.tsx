"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CalendarCheck, CheckCircle2, Clock, Loader2, Send, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Reveal, SectionHeading } from "./shared";
import { useLanguage } from "./LanguageProvider";
import { motion } from "framer-motion";

interface BookingFormValues {
  name: string;
  phone: string;
  email?: string;
  service: string;
  doctor: string;
  date: string;
  time: string;
  message?: string;
}

/**
 * Static builds (GitHub Pages) have no backend — appointments are stored
 * client-side in localStorage instead of the API.
 */
const IS_STATIC = process.env.NEXT_PUBLIC_STATIC === "1";
const LOCAL_BOOKINGS_KEY = "dentora-local-bookings";

function readLocalBookings(): Record<string, unknown>[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(LOCAL_BOOKINGS_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveLocalBooking(values: Record<string, unknown>) {
  const list = readLocalBookings();
  list.push({ ...values, createdAt: new Date().toISOString() });
  try {
    window.localStorage.setItem(LOCAL_BOOKINGS_KEY, JSON.stringify(list));
  } catch {
    /* storage full — ignore */
  }
}

function sameMonthCount(list: Record<string, unknown>[]): number {
  const now = new Date();
  return list.filter((item) => {
    const created = typeof item.createdAt === "string" ? new Date(item.createdAt) : null;
    return !!created && created.getMonth() === now.getMonth() && created.getFullYear() === now.getFullYear();
  }).length;
}

export function Booking() {
  const { t, locale } = useLanguage();
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [monthCount, setMonthCount] = useState<number | null>(null);

  useEffect(() => {
    if (IS_STATIC) {
      setMonthCount(sameMonthCount(readLocalBookings()));
      return;
    }
    fetch("/api/appointments")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (d && typeof d.count === "number") setMonthCount(d.count);
      })
      .catch(() => {});
  }, []);

  const schema = z.object({
    name: z.string().min(2),
    phone: z.string().min(7),
    email: z.string().email().optional().or(z.literal("")),
    service: z.string().min(1),
    doctor: z.string().max(160).optional().or(z.literal("")),
    date: z.string().min(1),
    time: z.string().min(1),
    message: z.string().optional(),
  });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<BookingFormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", phone: "", email: "", service: "", doctor: "", date: "", time: "", message: "" },
  });

  const doctorValue = watch("doctor");

  const timeSlots = ["09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00", "18:00"];
  const today = new Date().toISOString().split("T")[0];

  const onSubmit = async (values: BookingFormValues) => {
    setSubmitting(true);
    try {
      if (IS_STATIC) {
        saveLocalBooking({ ...values, lang: locale });
        setMonthCount(sameMonthCount(readLocalBookings()));
      } else {
        const res = await fetch("/api/appointments", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...values, lang: locale }),
        });
        if (!res.ok) throw new Error("request failed");
        const data = await res.json();
        if (typeof data.count === "number") setMonthCount(data.count);
      }
      toast({
        title: t.booking.successTitle,
        description: t.booking.successDesc,
        variant: "default",
      });
      reset();
    } catch {
      toast({
        title: t.booking.errorTitle,
        description: t.booking.errorDesc,
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const sidePoints = [Sparkles, Clock, CalendarCheck, ShieldCheck];

  return (
    <section id="booking" className="relative overflow-hidden bg-secondary/40 py-20 lg:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -end-24 h-80 w-80 rounded-full bg-teal-400/15 blur-3xl animate-blob"
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading badge={t.booking.badge} title={t.booking.title} subtitle={t.booking.subtitle} />

        <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_380px]">
          {/* Form card */}
          <Reveal>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="rounded-[2rem] border border-border/70 bg-card p-6 shadow-soft sm:p-8"
              noValidate
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="bk-name">{t.booking.name}</Label>
                  <Input id="bk-name" placeholder={t.booking.namePh} {...register("name")} />
                  {errors.name && <p className="text-xs text-destructive">{t.booking.name}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bk-phone">{t.booking.phone}</Label>
                  <Input id="bk-phone" dir="ltr" placeholder={t.booking.phonePh} {...register("phone")} />
                  {errors.phone && <p className="text-xs text-destructive">{t.booking.phone}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bk-email">{t.booking.email}</Label>
                  <Input id="bk-email" dir="ltr" type="email" placeholder={t.booking.emailPh} {...register("email")} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bk-service">{t.booking.service}</Label>
                  <Select onValueChange={(v) => setValue("service", v, { shouldValidate: true })}>
                    <SelectTrigger id="bk-service" className="w-full">
                      <SelectValue placeholder={t.booking.servicePh} />
                    </SelectTrigger>
                    <SelectContent>
                      {t.services.items.map((s) => (
                        <SelectItem key={s.title} value={s.title}>
                          {s.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bk-doctor">{t.booking.doctor}</Label>
                  <Select value={doctorValue || t.booking.doctorAny} onValueChange={(v) => setValue("doctor", v, { shouldValidate: true })}>
                    <SelectTrigger id="bk-doctor" className="w-full">
                      <SelectValue placeholder={t.booking.doctorAny} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={t.booking.doctorAny}>{t.booking.doctorAny}</SelectItem>
                      {t.doctors.items.map((d) => (
                        <SelectItem key={d.name} value={d.name}>
                          {d.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bk-date">{t.booking.date}</Label>
                  <Input id="bk-date" type="date" min={today} {...register("date")} />
                  {errors.date && <p className="text-xs text-destructive">{t.booking.date}</p>}
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="bk-time">{t.booking.time}</Label>
                  <Select onValueChange={(v) => setValue("time", v, { shouldValidate: true })}>
                    <SelectTrigger id="bk-time" className="w-full">
                      <SelectValue placeholder={t.booking.timePh} />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((slot) => (
                        <SelectItem key={slot} value={slot} dir="ltr">
                          {slot}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="bk-message">{t.booking.message}</Label>
                  <Textarea id="bk-message" rows={3} placeholder={t.booking.messagePh} {...register("message")} />
                </div>
              </div>

              <Button
                type="submit"
                disabled={submitting}
                size="lg"
                className="mt-7 w-full rounded-2xl text-base shadow-soft-lg"
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    {t.booking.submitting}
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    {t.booking.submit}
                  </>
                )}
              </Button>
            </form>
          </Reveal>

          {/* Side panel */}
          <Reveal delay={0.15}>
            <div className="flex h-full flex-col gap-5">
              <div className="rounded-[2rem] bg-gradient-to-br from-teal-600 to-emerald-600 p-7 text-white shadow-soft-lg dark:from-teal-700 dark:to-emerald-700">
                <CalendarCheck className="h-9 w-9 opacity-90" />
                <h3 className="mt-4 text-xl font-extrabold">{t.booking.sideTitle}</h3>
                <p className="mt-2 text-sm leading-7 text-white/85">{t.booking.sideDesc}</p>
                <ul className="mt-5 space-y-3">
                  {t.booking.sidePoints.map((point, i) => {
                    const Icon = sidePoints[i % sidePoints.length];
                    return (
                      <motion.li
                        key={point}
                        initial={{ opacity: 0, x: 12 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 + i * 0.08 }}
                        className="flex items-center gap-2.5 text-sm font-medium"
                      >
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/15">
                          <Icon className="h-3.5 w-3.5" />
                        </span>
                        {point}
                      </motion.li>
                    );
                  })}
                </ul>
              </div>

              <div className="flex flex-1 items-center justify-center rounded-[2rem] border border-primary/20 bg-primary/5 p-7 text-center">
                <div>
                  <CheckCircle2 className="mx-auto h-8 w-8 text-primary" />
                  {monthCount !== null ? (
                    <>
                      <p className="mt-3 text-4xl font-black text-primary" dir="ltr">
                        {new Intl.NumberFormat(locale === "fa" ? "fa-IR" : locale === "ar" ? "ar-EG" : "tr-TR").format(monthCount)}
                      </p>
                      <p className="mt-1 text-sm font-medium text-muted-foreground">{t.booking.bookedLabel}</p>
                    </>
                  ) : (
                    <p className="mt-3 text-sm text-muted-foreground">...</p>
                  )}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
