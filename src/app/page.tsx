import TopicCreateForm from '@/components/topics/TopicCreateForm'
import React from 'react'

export default async function page() {

  return (
    <div className='grid grid-cols-4 gap-4 p-4'>
      <div className='col-span-3'>
        <h1 className='text-xl font-bold m-2'>Home Page</h1>
      </div>

      <div className='justify-self-end'>
        <TopicCreateForm />
      </div>

    </div>
  )
}
