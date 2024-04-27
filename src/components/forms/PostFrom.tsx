import { zodResolver } from "@hookform/resolvers/zod"
import {useForm} from  'react-hook-form'
import * as z from 'zod'

const formSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at leart 2 characters",
    })
})

const PostFrom = () => {
  return (
    <div>PostFrom</div>
  )
}

export default PostFrom