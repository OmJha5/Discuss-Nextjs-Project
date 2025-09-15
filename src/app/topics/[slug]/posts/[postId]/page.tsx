import PostShow from '@/components/posts/PostShow'
import React from 'react'

type postPropsType = {
  params : {
    slug : string,
    postId : string
  }
}

export default async function page(props : postPropsType) {
  let {slug , postId} = await props.params

  return (
    <div>
      <PostShow postId={postId} />
    </div>
  )
}
