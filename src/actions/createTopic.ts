"use server"
import { auth } from "@/auth";
import { prisma } from "@/lib";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {z} from "zod";

const createTopicSchema = z.object({
    name : z.string().min(3).regex(/^[a-z-]+$/ , {message : "Name must be in lowercase and hyphen(-) only"}),
    description : z.string().min(10)
})

type createTopicFormState = {
    errors : {
        name ?: string[],
        description ?: string[],
        formError ?: string[]
    }
}

export const createTopic = async(prevState : createTopicFormState , formData : FormData) : Promise<createTopicFormState> => {

    const result = createTopicSchema.safeParse({
        name : formData.get("name"),
        description : formData.get("description")
    })

    if(!result.success){
        console.log(result.error)
        return {
            errors : result.error.flatten().fieldErrors
            // Above will return something like 
            /*
            {
                name : ["error1" , "error2"],
                description : ["error1" , "error2"]
            }
            */
        }
    }

    const session = await auth();
    if(!session || !session.user){
        return {
            errors : {
                formError : ["You must be signed in to create a topic"]
            }
        }
    }

    try{
        await prisma.topic.create({
            data : {
                slug : result.data.name,
                description : result.data.description,
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

    revalidatePath("/");
    redirect(`/topics/${result.data.name}`);
    
}