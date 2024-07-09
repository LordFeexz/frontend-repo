"use server";

import request from "@/libs/axios";
import { getServerSideSession } from "@/utils/session";

export const loginHandler = async (formData: FormData) => {
  const {
    status,
    data: { message, data },
  } = await request.Mutation<string>({
    url: "/user/login",
    method: "POST",
    data: {
      email: formData.get("email"),
      password: formData.get("password"),
    },
  });

  if (status !== 200) return { error: message, data: null };

  return { error: null, data };
};

export const updateUser = async (formData: FormData) => {
  const {
    status,
    data: { message },
  } = await request.Mutation({
    method: "PUT",
    url: `/user/${formData.get("id")}`,
    data: {
      name: formData.get("name"),
      username: formData.get("username"),
      email: formData.get("email"),
    },
    headers: {
      authorization: `Bearer ${
        (await getServerSideSession())?.user?.access_token ?? ""
      }`,
    },
  });

  if (status !== 200) return { error: message };

  return { error: null };
};
