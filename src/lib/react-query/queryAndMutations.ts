import { INewUser } from '@/types'
import {useQuery, useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query'
import { createUserAccount, signInAccount, signOutAccount } from '../appwrite/api'

// Creating the account
export const useCreateUserAccount = () => {
    return useMutation({
        mutationFn:(user: INewUser) => createUserAccount(user)
    })
}


// Sigin into the account
export const useSignInAccount = () => {

    return useMutation({
        mutationFn:(user: {
            email: string, 
            password: string
        }) => signInAccount(user)
    })
}


// Sigin out
export const useSignOutAccount = () => {

    return useMutation({
        mutationFn: signOutAccount
    })
}



// CREATE POST
export const useCreatePost = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (post: INewPost) => createPost(post),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
        });
      },
    });
  };
  