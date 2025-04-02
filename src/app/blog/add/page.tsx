"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";

interface BlogPostProps {
    title:string;
    description: string;
};

const postBlog = async ({title, description}:BlogPostProps) => {
    try{
        const res = await fetch('http://localhost:3000/api/blog', {
            method: "POST",
            body: JSON.stringify({title, description}),
            headers: {"Content-Type": "application/json"},
        }
        );
        return res.json();
      } catch(error){
        console.error("Fetching error",error);
      }
}


const AddBlog = () => {
    const router = useRouter();
    const [title, setTitle] = useState<string>(""); 
    const [description, setDescription] = useState<string>(""); 

    useEffect(() => {
        toast.dismiss(); 
      }, []);

    const handleSubmit = async (e: React.FormEvent) =>{
        e.preventDefault();

        toast.loading("投稿中です...");
        await postBlog({title, description});

        toast.success("投稿に成功しました");
        router.push("/");
        router.refresh();
    }
    return(
        <>
            <Toaster />
            <div className="w-full m-auto flex my-4">
            <div className="flex flex-col justify-center items-center m-auto">
            <p className="text-2xl text-slate-100 font-bold p-3">ブログ新規作成 🚀</p>
            <form onSubmit={handleSubmit}>
                <input 
                placeholder="タイトルを入力"
                type="text"
                value={title}
                onChange={(e)=>setTitle(e.target.value) }
                className="rounded-md px-4 w-full py-2 my-2 bg-slate-100"
                />
                <textarea
                placeholder="記事詳細を入力"
                value={description}
                onChange={(e)=>setDescription(e.target.value) }
                className="rounded-md px-4 py-2 w-full my-2 bg-slate-100"
                ></textarea>
                <button type="submit" className="font-semibold px-4 py-2 shadow-xl bg-slate-200 rounded-lg m-auto hover:bg-slate-100">
                投稿
                </button>
            </form>
            </div>
            </div>
        </>
    )
}; export default AddBlog;