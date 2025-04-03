"use client";


import { useRouter } from "next/navigation";
import {  useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";

interface UpdateBlogProps {
    title:string;
    description: string;
    id: number
};

const editBlog = async ({title, description, id}:UpdateBlogProps ) => {
    try{
        const res = await fetch(`http://localhost:3000/api/blog/${id}`, {
            method: "PUT",
            body: JSON.stringify({title, description, id}),
            headers: {"Content-Type": "application/json"},
        }
        );
        return res.json();
      } catch(error){
        console.error("Fetching error",error);
      }
}
const deleteBlog = async (id:number ) => {
    try{
        const res = await fetch(`http://localhost:3000/api/blog/${id}`, {
            method: "DELETE",
            headers: {"Content-Type": "application/json"},
        }
        );
        return res.json();
      } catch(error){
        console.error("Fetching error",error);
      }
}

const getBlogById = async (id: number ) => {
    try{
        const res = await fetch(`http://localhost:3000/api/blog/${id}`);
        const data = await res.json();
        return data.post;
      } catch(error){
        console.error("Fetching error",error);
      }
}

const UpdateBlog = ({params}:{params: {id:number}}) => {
    const router = useRouter();
    const [editTitle, setEditTitle] = useState<string>(""); 
    const [editDescription, setEditDescription] = useState<string>(""); 

    useEffect(() => {
        toast.dismiss(); 
      }, []);



    const handleDelete = async() => {
        const toastId = toast.loading('delete...');
        toast.loading("削除中です...",{id:toastId});
        await deleteBlog(params.id);
        toast.success("削除に成功しました",{id:toastId});
        toast.dismiss(toastId);
    }
    useEffect(()=> {
        const fetchBlog = async () => {
            try {
                const data = await getBlogById(params.id);
                console.log(data);
                    if(data){
                        setEditTitle(data.title);
                        setEditDescription(data.description);
                    }
            } catch (error){
                console.log("取得失敗", error)
                toast.error("エラー", {id:"1"});
            };
        };
        fetchBlog();
    },[params.id]);

    const handleSubmit = async (e: React.FormEvent) =>{
        e.preventDefault();
        const toastId = toast.loading('Loading...');
        toast.loading("編集中です...",{id:toastId});
        await editBlog({title: editTitle, description:editDescription , id: params.id, });

        toast.success("編集編集に成功しました",{id:toastId});
        toast.dismiss(toastId);
        router.push("/");
        router.refresh();
    };
    return (
        <>
        <Toaster />
        <div className="w-full m-auto flex my-4">
            <div className="flex flex-col justify-center items-center m-auto">
            <p className="text-2xl text-slate-200 font-bold p-3">ブログの編集 🚀</p>
            <form  onSubmit={handleSubmit}>
                <input
                placeholder="タイトルを入力"
                type="text"
                value={editTitle}
                onChange={(e)=>setEditTitle(e.target.value) }
                className="rounded-md px-4 w-full py-2 my-2"
                />
                <textarea
                placeholder="記事詳細を入力"
                value={editDescription}
                onChange={(e)=>setEditDescription(e.target.value) }
                className="rounded-md px-4 py-2 w-full my-2"
                ></textarea>
                <button className="font-semibold px-4 py-2 shadow-xl bg-slate-200 rounded-lg m-auto hover:bg-slate-100">
                更新
                </button>
                <button onClick={handleDelete} className="ml-2 font-semibold px-4 py-2 shadow-xl bg-red-400 rounded-lg m-auto hover:bg-slate-100">
                削除
                </button>
            </form>
            </div>
        </div>
        </>
    )
};
export default UpdateBlog;