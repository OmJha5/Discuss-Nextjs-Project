import { Button } from '@/components/ui/button'
import React from 'react'
import { SignInButton } from './actions/signInButton'
import { SignOutButton } from './actions/signOutButton'
import { auth } from '@/auth'

export default async function page() {
  const session = await auth();

  return (
    <div>
      <h1>Home Page</h1>
      <SignInButton />
      <SignOutButton />
      
      {
        session?.user && <div>{JSON.stringify(session.user)}</div>
      }
    </div>
  )
}
