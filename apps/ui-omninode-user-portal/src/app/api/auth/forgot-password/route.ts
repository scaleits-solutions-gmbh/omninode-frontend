import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest):Promise<NextResponse<null|unknown>>{
    const { email } = await request.json();
    console.log(email);
    return NextResponse.json(null);
    
}
