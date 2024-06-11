import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromTOken } from "@/helpers/getDataFromToken";

connect();

export async function POST(request: NextRequest) {
  // extract data from token
  const userId = await getDataFromTOken(request);
  const user = await User.findOne({ _id: userId }).select("-password");
  if (!user) {
    return new Error("Invalid token");
  }
  return NextResponse.json({
    message: "User found",
    data: user,
  });
}
