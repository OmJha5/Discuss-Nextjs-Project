"use server"
import { auth } from "@/auth";
import { Post } from "@/generated/prisma";
import { prisma } from "@/lib";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {z} from "zod";

const createPostSchema = z.object({
    title : z.string().min(3),
    content : z.string().min(10)
})

type createPostFormState = {
    errors : {
        title ?: string[],
        content ?: string[],
        formError ?: string[]
    }
}

export const createPost = async(slug : string , prevState : createPostFormState , formData : FormData) : Promise<createPostFormState> => {

    let result = createPostSchema.safeParse({
        title : formData.get("title"),
        content : formData.get("content")
    })

    if(!result.success){
        return {
            errors : result.error.flatten().fieldErrors
        }
    }

    let session = await auth();
    if(!session || !session.user || !session.user.id){
        return {
            errors : {
                formError : ["You must be signed in to create a Post"]
            }
        }
    }

    let topic = await prisma.topic.findFirst({
        where : {slug}
    }) 

    let post : Post;

    if(!topic || !topic.id){
        return {
            errors : {
                formError : ["Topic Name is not found"]
            }
        }
    }

    try{
        post = await prisma.post.create({
            data : {
                title : result.data.title,
                content : result.data.content,
                userId : session.user.id,
                topicId : topic.id
            }
        })
    }
    catch(err){
        if(err instanceof Error){
            return {
                errors : {
                    formError : [err.message]
                }
            }
        }
        else{
            return {
                errors : {
                    formError : ["Something went wrong"]
                }
            }
        }
    }

    revalidatePath(`/topics/${slug}`)
    redirect(`/topics/${slug}/posts/${post.id}`)

}