import PostCreateForm from '@/components/posts/PostCreateForm';
import PostList from '@/components/posts/PostList';
import { fetchPostByTopicSlug } from '@/lib/query/post';
import React from 'react'

type propsSlugType = {
  params : {
    slug : string
  }
}

export default async function TopicShowPosts(props : propsSlugType) {
  let {slug} = await props.params

  return (
    <div className='grid grid-cols-4 gap-4 p-4'>
      <div className='col-span-3 space-y-6'>
        <h1 className='text-xl font-bold'>{slug}</h1>

        <PostList fetchPostsBySlug={() => fetchPostByTopicSlug(slug)} />
      </div>

      <div className='justify-self-end'>
          <PostCreateForm slug={slug} />
      </div>
    </div>
  )
}
