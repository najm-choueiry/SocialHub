import { zodResolver } from "@hookform/resolvers/zod"
import {useForm} from  'react-hook-form'
import * as z from 'zod'

import { Button} from '@/components/ui/button'

import {
    Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage
} from '@/components/ui/form'

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import FileUploader from "../Shared/FileUploader"


const formSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at leart 2 characters",
    })
})

const PostFrom = () => {

   const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: ""
        }
   }) 

   function onSubmit(values: z.infer<typeof formSchema>) {

   }

   return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} 
        className="flex-col gap-9 w-full max-w-5xl">
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
                <FileUploader />
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
              <FormLabel className="shad-form_label">Caption</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" />
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
                />
              </FormControl>
              <FormMessage className="shad-form_message"/>
            </FormItem>
          )}
        />


        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

export default PostFrom