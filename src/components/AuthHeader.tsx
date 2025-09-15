"use client"
import { useSession } from 'next-auth/react'
import React from 'react'
import { SignInButton } from '@/actions/signInButton'
import { SignOutButton } from '@/actions/signOutButton'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"

export default function AuthHeader() {
  let session = useSession();

  if(session.status == "loading") return null;

  let authNode: React.ReactNode;

  if (session.data?.user) {
    authNode = (
      <div className='justify-self-end'>
        <Popover>
          <PopoverTrigger asChild>
            <Avatar>
              <AvatarImage src={session.data.user.image || ""} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </PopoverTrigger>

          <PopoverContent >
            <h1>{session.data.user.name}</h1>
            <Separator className='my-2' />
            <SignOutButton />
          </PopoverContent>
        </Popover>
      </div>
    )
  }
  else {
    authNode = (
      <div className='space-x-2 justify-self-end'>
        <SignInButton />
      </div>
    )
  }

  return authNode;
}
