import React from 'react'
import { Input } from './ui/input'
import AuthHeader from './AuthHeader'


export default async function HeaderPage() {

    return (
        <div className='h-17 grid grid-cols-3 items-center'>
            <div><h1 className='font-bold text-xl'>Discuss</h1></div>

            <div>
                <Input type='text' placeholder="Search Post..." />
            </div>

            <AuthHeader />

        </div>
    )
}
