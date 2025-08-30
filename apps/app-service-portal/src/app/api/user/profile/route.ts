import { NextResponse } from "next/server";
import { FeUserProfile } from "@/types/fe-user";

export async function GET(): Promise<NextResponse<FeUserProfile>|NextResponse<unknown>> {
    return NextResponse.json({
        id: "1",
        name: "User 1",
        email: "user1@example.com",
        imageUrl: "https://via.placeholder.com/150",
        firstName: "John",
        middleNames: "Doe",
        lastName: "Doe",
        position: "Software Engineer",
        theme: "light",
        language: "en",
        createdAt: new Date(),
    });
}
