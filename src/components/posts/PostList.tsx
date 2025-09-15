import React from 'react'
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { PostWithData } from '@/lib/query/post'

type fetchPostsBySlugType = {
    fetchPostsBySlug : () => Promise<PostWithData[]>
}

export default async function PostList(props : fetchPostsBySlugType) {
    let posts = await props.fetchPostsBySlug()

    return (
        <div className='flex flex-col gap-2'>
            {
                posts?.map((post) => {
                    return <Card key={post.id}>
                        <CardHeader>
                            <CardTitle>{post.title}</CardTitle>
                            <CardDescription>
                                <div className="flex items-center justify-between">
                                    <p>{post.user.name}</p>
                                    <p>{post._count.comments} comments</p>
                                </div>
                            </CardDescription>
                        </CardHeader>
                    </Card>
                })
            }
        </div>
    )
}
