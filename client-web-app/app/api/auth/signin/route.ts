import { signin } from "@/src/presentation/api/authClient";
import { toHttpError } from "@/src/presentation/api/toHttpError";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request:NextRequest){
    try {
        const {email, password, } = await request.json();
       const response =  await signin({email, password})
        console.log(response);
       return NextResponse.json(response);
    } catch (error) {
       const http = toHttpError(error);
       return NextResponse.json(http.body, {status:http.status});
    }
}