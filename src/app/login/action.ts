"use server";

import request from "@/libs/axios";

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
