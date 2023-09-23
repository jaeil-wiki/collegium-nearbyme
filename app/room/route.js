import {NextResponse} from "next/server";
import {getMockAdvertisements, getMockAttendees} from "@/lib/storage";

export async function GET() {
  const users = await getMockAttendees()
  return NextResponse.json(users.map((k) => k.split(':').slice(-1)[0]))
}
