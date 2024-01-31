import { Client, Account, Databases, Storage, Avatars } from 'appwrite';

export const appwriteConfig = {
    projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
    url: import.meta.env.VITE_APPWRITE_URL
}

const client = new Client();

client.setProject(appwriteConfig.projectId);
client.setEndpoint(appwriteConfig.url);

console.log("appwriteConfig.projectId", appwriteConfig.projectId)
console.log("appwriteConfig.url", appwriteConfig.url)
2

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);

account.listSessions()