// Get data from "Real database"
import { NextResponse } from "next/server";
import { getPrisma } from "@lib/getPrisma";

export const GET = async () => {
  const prisma = getPrisma();

  const courses = await prisma.course.findMany();

  return NextResponse.json({ ok: true, courses });
};
