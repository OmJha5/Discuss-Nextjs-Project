import { prisma } from '@/lib';
import { notFound } from 'next/navigation'
import React from 'react'

export default async function PostShow(props : {postId : string}) {
    let postId = props.postId

    if(!postId) notFound();

    let post = await prisma.post.findUnique({
        where : {id : postId}
    })

  return (
    <div>
        <h1 className='font-bold text-2xl my-2'>{post?.title}</h1>
        <p className='border rounded p-2'>{post?.content}</p>
    </div>
  )
}
