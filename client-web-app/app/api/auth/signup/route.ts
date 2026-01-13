import { signup } from "@/src/presentation/api/authClient";
import { toHttpError } from "@/src/presentation/api/toHttpError";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request:NextRequest){
    const redirectUrl = `${request.nextUrl.origin}/auth/verified-email`;
    try {
        const {email, password, username, first_name, last_name} = await request.json();
       const response =  await signup({email, password, first_name, last_name , username, redirectUrl})
        console.log(response);
       return NextResponse.json(response);
    } catch (error) {
       const http = toHttpError(error);
       return NextResponse.json({body:http.body, status:http.status});
     
    }
}