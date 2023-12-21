import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import {useForm} from 'react-hook-form';

import { Button } from "@/components/ui/button"
import {Form,FormControl,FormDescription,FormField,FormItem,FormLabel,FormMessage,
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import { SignupValidation } from "@/lib/validation";

const SignupForm = () => {
  
  const isLoading = true;
  
   const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: ""
    },
  })
 
  
  function onSubmit(values: z.infer<typeof SignupValidation>) {
    console.log(values)
  }

  return (
    <Form {...form}>

      <div className="sm:w-420 flex-center flex-col"> 
        <img src="/assets/images/logo.svg" alt="logo"/>
        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12"> Create a new account</h2>
        <p className="text-light-3 small-medium md:base-regular mt-2"> To use Social Hub, enter your details</p>
      
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4`">
          {/* name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Name" type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* username */}
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Name" type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Name" type="email" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />   

          {/* password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="Name" type="password" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />  

          <Button type="submit" className="shad-button_primary">
            {isLoading ? (
              <div className="flex-center gap-2">
                  Loading...
              </div>
            ) : (
              "Sign Up"
            )}
          </Button>
        </form>
      </div>
    </Form>
  )
}

export default SignupForm