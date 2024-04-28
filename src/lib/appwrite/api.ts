import { ID , Query} from "appwrite";
import { IUpdatePost, INewPost, INewUser, IUpdateUser } from "@/types";
import { appwriteConfig, account, databases, storage, avatars } from "./config";

// CREATING THE USER
export async function createUserAccount(user: INewUser){
    try {
        const newAccount = await account.create(
           ID.unique(),
            user.email,
            user.password,
            user.name
        )

        if(!newAccount) throw Error;

        const avatarUrl = avatars.getInitials(user.name)

        const newUser = await saveUserToDB({
            accountId: newAccount.$id,
            name: newAccount.name,
            email: newAccount.email,
            
            username: user.username,
            imageUrl: avatarUrl
        })

        return newUser
    }catch(error){
        console.log(error)
        return error
    }
}


// saving the user to the USERS DATABASE COLLECTION 
export async function saveUserToDB(user: {
    accountId: string;
    email: string,
    name: string,
    username?: string,
    imageUrl: URL
}) {
    try {
        const newUser = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            user
        )
        return newUser
    }catch(error){
        console.log(error)
    }
}



// Siging in the user
export async function signInAccount(user: {email:string, password: string}){
    try {
        const session = await account.createEmailSession(user.email, user.password)
        return session
    }catch(error){
        console.log(error)
    }
}


// Getting the current user
export async function getCurrentUser(){
    try {
        const currentAccount = await account.get()
        
        if(!currentAccount) throw Error

        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal("accountId", currentAccount.$id)]
        )

        if(!currentUser) throw Error

        return currentUser.documents[0]

    }catch(error){
        console.log(error)
    }
}


// signing out the user
export async function signOutAccount(){
    try {
        const session = await account.deleteSession("current")
        return session

    }catch(error){
        console.log(error)
    }
}


// CREATING A POST
export async function createPost(post: INewPost) {
    try {
      // Upload file to appwrite storage
      const uploadedFile = await uploadFile(post.file[0]);
  
      if (!uploadedFile) throw Error;
  
      // Get file url
      const fileUrl = getFilePreview(uploadedFile.$id);
      if (!fileUrl) {
        await deleteFile(uploadedFile.$id);
        throw Error;
      }
  
      // Convert tags into array
      const tags = post.tags?.replace(/ /g, "").split(",") || [];
  
      // Create post
      const newPost = await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.postCollectionId,
        ID.unique(),
        {
          creator: post.userId,
          caption: post.caption,
          imageUrl: fileUrl,
          imageId: uploadedFile.$id,
          location: post.location,
          tags: tags,
        }
      );
  
      if (!newPost) {
        await deleteFile(uploadedFile.$id);
        throw Error;
      }
  
      return newPost;
    } catch (error) {
      console.log(error);
    }
  }

  export async function deleteFile(fileId: string) {
    try {
      await storage.deleteFile(appwriteConfig.storageId, fileId);
  
      return { status: "ok" };
    } catch (error) {
      console.log(error);
    }
  }
  