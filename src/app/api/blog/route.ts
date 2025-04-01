import { PrismaClient } from "@prisma/client";
import {  NextResponse } from "next/server";


const prisma = new PrismaClient();

export async function main() {
    try{
        await prisma.$connect();
    } catch(error){
        return ("DB接続に失敗しました");
    }
}


export async function GET (req: Request, res: NextResponse){
    try {
        await main();
        const posts = await prisma.post.findMany();
        
        return NextResponse.json({ message: 'Success', posts }, { status: 200 });
    }catch (error) {
        console.error("Database Error:", error);
        return NextResponse.json({ message: 'error', error }, { status: 500 });
    }  finally {
        await prisma.$disconnect();
      }
};

export async function POST (req: Request, res: NextResponse)  {
    try {
        const {title, description} = await req.json();
        await main();
        const newPost= await prisma.post.create({data:{title, description }});
        
        return NextResponse.json( { message: 'Success', newPost }, { status: 201 });
    }catch (error) {
        console.error("Database Error:", error);
        return NextResponse.json({ message: 'error', error }, { status: 500 });
    } finally {
        await prisma.$disconnect();
      }
};