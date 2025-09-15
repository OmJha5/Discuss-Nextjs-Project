"use client"
import React, { useActionState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Button } from '../ui/button'
import { Textarea } from '../ui/textarea'
import { createPost } from '@/actions/createPost'

export default function PostCreateForm(props : {slug : string}) {
    const [formState, action] = useActionState(createPost.bind(null , props.slug), { errors: {} })

    return (
        <Dialog>

            <DialogTrigger asChild>
                <Button>Create Post</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form action={action}  className='space-y-3'>
                    <DialogHeader>
                        <DialogTitle>Create New Post</DialogTitle>
                        <DialogDescription>
                            Create post for starting the discussion
                        </DialogDescription>
                    </DialogHeader>
                    <div className='space-y-4'>
                        <div className='space-y-2'>
                            <Label htmlFor="title">Title</Label>
                            <Input id="title" name="title" />
                        </div>
                        {
                            formState.errors.title && <p className='text-sm text-red-600'>{formState.errors.title}</p>
                        }
                        <div className='space-y-2'>
                            <Label htmlFor="content">Content</Label>
                            <Textarea id="content" name="content" />
                        </div>
                        {
                            formState.errors.content && <p className='text-sm text-red-600'>{formState.errors.content}</p>
                        }
                        {
                            formState.errors.formError && <div className='border border-red-500 bg-red-200 p-2'>{formState.errors.formError}</div>
                        }
                    </div>
                    <DialogFooter>
                        <Button className='w-full' type="submit">Save changes</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

