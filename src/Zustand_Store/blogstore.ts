import {create} from "zustand";

export interface Admin {
    _id: string;
    adminname: string;
    email: string;
    position: string;
  }
  
  export interface Blog {
    _id: string;
    img: string;
    postdate: string; // it's ISO Date string
    timelength: string;
    catagory: string;
    admin: Admin;
    createdAt: string;
    updatedAt: string;
    title: string;
    description: string;
    blog: string;
  }
  export interface BlogsState {
    blogs: Blog[];
    fetchBlogs: (lang: string) => Promise<void>; // or Promise<{success: boolean, message: string}> if you want to handle error return too
  }
export const useBlogStore = create<BlogsState>((set)=>({
    blogs:[],
    fetchBlogs:async(lang:string)=>{
        try {
           const response = await fetch(`https://naethitasanv2.onrender.com/api/pages/blog?lang=${lang}`) 
           const data = await response.json()
           set({blogs:data.blogs})
           
        } catch (error) {
            console.log(error)
        }
    }
}))