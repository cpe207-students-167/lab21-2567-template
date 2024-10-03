import { checkToken } from "@lib/checkToken";
import { Payload } from "@lib/types";
import { NextResponse } from "next/server";
import sleep from "sleep-promise";

//check if attached token is still valid
export const GET = async () => {
  await sleep(1000);
  const payload = checkToken();
  if (!payload) {
    return NextResponse.json(
      {
        ok: false,
        message: "Invalid token",
      },
      { status: 401 }
    );
  }

  return NextResponse.json({ ok: true, username: (<Payload>payload).username });
};
