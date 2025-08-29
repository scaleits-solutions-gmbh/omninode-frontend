import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest):Promise<NextResponse<null|unknown>>{
    const { password } = await request.json();
    console.log(password);
    return NextResponse.json(null);
    
}
