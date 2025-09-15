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
import { createTopic } from '@/actions/createTopic'

export default function TopicCreateForm() {
    const [formState, action] = useActionState(createTopic, { errors: {} })

    return (
        <Dialog>

            <DialogTrigger asChild>
                <Button variant="outline">New Topic</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form action={action} className='space-y-3'>
                    <DialogHeader>
                        <DialogTitle>Create A Topic</DialogTitle>
                        <DialogDescription>
                            Start with a name and description for your topic. for Discussion
                        </DialogDescription>
                    </DialogHeader>
                    <div className='space-y-4'>
                        <div className='space-y-2'>
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" name="name" />
                        </div>
                        {
                            formState.errors.name && <p className='text-sm text-red-600'>{formState.errors.name}</p>
                        }
                        <div className='space-y-2'>
                            <Label htmlFor="description">Description</Label>
                            <Textarea id="description" name="description" />
                        </div>
                        {
                            formState.errors.description && <p className='text-sm text-red-600'>{formState.errors.description}</p>
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

