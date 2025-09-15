"use server"
import type { Post } from "@/generated/prisma"
import { prisma } from ".."

export type PostWithData = Post & {
    topic : {slug : string};
    _count : {comments : number};
    user : {name : string | null};
}

export const fetchPostByTopicSlug = async(slug : string) : Promise<PostWithData[]> => {
    return prisma.post.findMany({
        where : {
            topic : {slug}
        },

        include : {
            topic : {select : {slug : true}} ,
            _count : {select : {comments : true}} ,
            user : {select : {name : true}}
        }
    })
}