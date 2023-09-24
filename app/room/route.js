import {NextResponse} from "next/server";
import {getMockAdvertisements, getMockAttendees} from "@/lib/storage";

export async function GET() {
  const users = await getMockAttendees()
  // FIXME : storage result is cached though it has no-cache header
  return NextResponse.json(users.map((k) => k.split(':').slice(-1)[0]))
}
