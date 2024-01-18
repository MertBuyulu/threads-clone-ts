"use server";

import { prisma } from "../prisma";
import { revalidatePath } from "next/cache";
interface UpdateUserParams {
  userId: string;
  username: string;
  name: string;
  bio: string;
  image: string;
  path: string;
}

interface FetchUserParams {
  userId: string;
  searchString: string;
  pageNumber?: number;
  pageSize?: number;
  sortBy?: 'asc' | 'desc',
}

// 1. Fetch user
export const fetchUser = async (userId: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { communities: true },
    });

    return user;
    
  } catch (error: any) {
    throw new Error(`Failed to fetch user: ${error.message}`);
  }
};

// // 2. Update user
export const updateUser = async ({
  userId,
  username,
  name,
  bio,
  image,
  path,
}: UpdateUserParams): Promise<void> => {
  try {
    await prisma.user.upsert({
      where: { id: userId },
      update: {
        username: username.toLowerCase(),
        name,
        bio,
        image,
        onboarded: true,
      },
      create: {
        id: userId,
        username: username.toLowerCase(),
        name,
        bio,
        image,
        onboarded: true,
      },
    });

    if (path === "/profile/edit") {
      revalidatePath(path);
    }
  } catch (error: any) {
    throw new Error(`Failed to create/update user: ${error.message}`);
  }
};

// 3. Update user' posts
export const fetchUserPosts = async (userId: string) => {
  try {
    const threads = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        threads: {
          include: {
            community: { select: { id: true, name: true } },
            children: {
              include: {
                author: { select: { id: true, name: true } },
              },
            },
          },
        },
      },
    });
    return threads;
  } catch (error: any) {
    console.error("Error fetching user threads:", error);
    throw error;
  }
};

// 4. Fetch users
export const fetchUsers = async ({
  userId,
  searchString = "",
  pageNumber = 1,
  pageSize = 20,
  sortBy = "desc",
}: FetchUserParams) => {
  try {
    // Calculate the number of users to skip based on the page number and page size.
    const skipAmount = (pageNumber - 1) * pageSize;
    const whereClause = {
      NOT: { id: userId },
      OR: [
        { username: { contains: searchString, mode: "insensitive" } },
        { name: { contains: searchString, mode: "insensitive" } },
      ],
    };

    // const users = await prisma.user.findMany({
    //   where: searchString.trim() ? whereClause: { NOT: { id: userId } },
    //   take: pageSize,
    //   skip: skipAmount,
    //   orderBy: [{createdAt: 'desc'}]
      
    // })
  } catch (error: any) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

// 5. Get activity

// To better understand server actions:
// https://blog.logrocket.com/diving-into-server-actions-next-js-14/#:~:text=js%20Server%20Actions%20are%20functions,mutating%20data%20from%20the%20client.