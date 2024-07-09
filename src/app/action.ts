"use server";

import type { IPaginationQuery } from "@/interfaces";
import type { IUser } from "@/interfaces/entities";
import request from "@/libs/axios";

export const getUserList = async ({ page, limit }: IPaginationQuery) => {
  const {
    data: {
      data,
      message,
      totalData,
      totalPage,
      page: recentPage,
      limit: recentLimit,
    },
    status,
  } = await request.Query<IUser[]>({
    url: "/fetchUserData",
    params: { page, limit },
  });

  if (status !== 200)
    return {
      error: message,
      data: [],
      totalData: 0,
      totalPage: 0,
      page,
      limit,
    };

  return {
    error: null,
    data,
    totalData,
    totalPage,
    page: recentPage,
    limit: recentLimit,
  };
};
