import { prisma } from "../prisma";
import { revalidatePath } from "next/cache";

interface CreateThreadParams {
  text: string;
  author: string;
  communityId: string | null;
}

export const fetchPosts = async (pageNumber = 1, pageSize = 20) => {
  try {
    const skipAmount = (pageNumber - 1) * pageSize;

    const posts = await prisma.thread.findMany({
      where: { parentId: null },
      orderBy: { createdAt: "desc" },
      skip: skipAmount,
      take: pageSize,
      include: {
        author: true,
        community: true,
        children: {
          include: {
            author: {
              select: {
                id: true,
                username: true,
              },
            },
          },
        },
      },
    });

    const totalPostsCount = await prisma.thread.count({
      where: {
        parentId: null,
      },
    });

    const isNext = totalPostsCount > skipAmount + posts.length;
    return { posts, isNext };
  } catch (error: any) {
    throw error("Failed to fetch all posts!");
  }
};

export const createThread = async ({
  text,
  author,
  communityId,
}: CreateThreadParams) => {
  try {

    const communityIdObject = await prisma.community.findUnique({
        where: { id: communityId },
        select: { id: true }
    });

    const newThread = await prisma.thread.create({
        data: {
            text,
            author,
            communityId: communityIdObject
        } 
    });

  } catch (error: any) {
    throw error("Failed to create a new thread.");
  }
};
