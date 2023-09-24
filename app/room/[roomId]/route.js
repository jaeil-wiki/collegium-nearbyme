import {NextResponse} from "next/server";
import {getMockAdvertisements, setMockAdvertisement, setMockAttendee} from "@/lib/storage";

export async function GET(req, res, {params}) {
  const {roomId} = params
  const users = await getMockAdvertisements(roomId || 0)
  return NextResponse.json(users.map((k) => k.split(':').slice(-1)[0]))
}

export async function POST(req, {params}) {
  const {roomId} = params
  const {accountId} = await req.json()
  if (!accountId || accountId === 'undefined' || accountId === 'null') {
    return NextResponse.error(new Error('accountId is required'))
  }
  await setMockAttendee(accountId)
  await setMockAdvertisement(roomId, accountId)
  const users = await getMockAdvertisements(roomId)
  console.log('POST/ users', users)

  return NextResponse.json(users.map((k) => k.split(':').slice(-1)[0]))
}