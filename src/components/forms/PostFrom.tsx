import { zodResolver } from "@hookform/resolvers/zod"
import {useForm} from  'react-hook-form'
import * as z from 'zod'

import { Button} from '@/components/ui/button'

import {
    Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage
} from '@/components/ui/form'

import { Input } from "@/components/ui/input"

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
    <div>PostFrom</div>
  )
}

export default PostFrom