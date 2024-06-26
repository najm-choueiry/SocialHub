import { zodResolver } from "@hookform/resolvers/zod"
import {useForm} from  'react-hook-form'
import * as z from 'zod'

import { Button} from '@/components/ui/button'

import {
    Form, FormControl, FormField, FormItem, FormLabel, FormMessage
} from '@/components/ui/form'

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import FileUploader from "../Shared/FileUploader"
import { PostValidation } from "@/lib/validation"
import { Models } from "appwrite"
import {useCreatePost} from '@/lib/react-query/queryAndMutations'

type PostFormProps = {
    post? : Models.Document
}

const PostFrom = ({post}: PostFormProps) => {

    const {mutateAsync: createPost , isPending: isLoadingCreate} = useCreatePost()

   const form = useForm<z.infer<typeof PostValidation>>({
        resolver: zodResolver(PostValidation),
        defaultValues: {
            caption: post ? post?.caption : "",
            file: [],
            location: post ? post?.location : "",
            tags: post ? post?.tags.join(',') : ''
        }
   }) 

   function onSubmit(values: z.infer<typeof PostValidation>) {
        console.log(values);
   }

   return (
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} 
            className="flex flex-col gap-9 w-full max-w-5xl">
            <FormField
            control={form.control}
            name="caption"
            render={({ field }) => (
                <FormItem>
                <FormLabel className="shad-form_label">Caption</FormLabel>
                <FormControl>
                    <Textarea placeholder="shadcn" className="shad-textarea custom-scrollbar" {...field} />
                </FormControl>
                <FormMessage className="shad-form_message"/>
                </FormItem>
            )}
            />

        <FormField
            control={form.control}
            name="file"
            render={({ field }) => (
                <FormItem>
                <FormLabel className="shad-form_label">Add Photos</FormLabel>
                <FormControl>
                    <FileUploader 
                        fieldChange={field.onChange}
                        mediaUrl={post?.imageUrl}
                    />
                </FormControl>
                <FormMessage className="shad-form_message"/>
                </FormItem>
            )}
            />

        <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
                <FormItem>
                <FormLabel className="shad-form_label">Add Location</FormLabel>
                <FormControl>
                    <Input 
                        type="text" 
                        className="shad-input" 
                        {...field}
                    />
                </FormControl>
                <FormMessage className="shad-form_message"/>
                </FormItem>
            )}
            />

        <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
                <FormItem>
                <FormLabel className="shad-form_label">Add tags (seperated by comma " , ")</FormLabel>
                <FormControl>
                    <Input 
                        type="text"
                        className="shad-input"
                        placeholder="Art, Expression, Learn"
                        {...field}
                    />
                </FormControl>
                <FormMessage className="shad-form_message"/>
                </FormItem>
            )}
            />

        <div className="flex gap-4 items-center justify-end">
            <Button type="button" className="shad-button_dark_4">Cancel</Button>
            <Button type="submit" className="shad-button_primary whitespace-nowrap">Submit</Button>
        </div>

      </form>
    </Form>
  )
}

export default PostFrom