import { NextResponse } from "next/server";
import { main } from "@/app/api/blog/route";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient
export async function GET (req: Request){
    try {
        const id: number = parseInt (req.url.split("/blog/")[1]);//urlパースして取得したほうがいい？
        await main();
        const post = await prisma.post.findFirst({
            where: {id}
        });
        
        return NextResponse.json({ message: 'Success', post }, { status: 200 });
    }catch (error) {
        console.error("Database Error:", error);
        return NextResponse.json({ message: 'error', error }, { status: 500 });
    }  finally {
        await prisma.$disconnect();
      }
};

export async function PUT (req: Request){
    try {

        const {title, description} = await req.json();
        const id: number = parseInt (req.url.split("/blog/")[1]);//urlパースして取得したほうがいい？
        await main();
        const post = await prisma.post.update({
            data:{title, description},
            where: {id}
        });
        
        return NextResponse.json({ message: 'Success', post }, { status: 200 });
    }catch (error) {
        console.error("Database Error:", error);
        return NextResponse.json({ message: 'error', error }, { status: 500 });
    }  finally {
        await prisma.$disconnect();
      }
};
export async function DELETE (req: Request){
    try {

        const id: number = parseInt (req.url.split("/blog/")[1]);//urlパースして取得したほうがいい？
        await main();
        const post = await prisma.post.delete({
            where: {id}
        });
        
        return NextResponse.json({ message: 'Success', post }, { status: 200 });
    }catch (error) {
        console.error("Database Error:", error);
        return NextResponse.json({ message: 'error', error }, { status: 500 });
    }  finally {
        await prisma.$disconnect();
      }
};