"use server";

import type { CustomSession } from "@/interfaces";
import { authOptions } from "@/libs/auth";
import { getServerSession } from "next-auth";

export async function getServerSideSession() {
  return (await getServerSession(authOptions)) as CustomSession | null;
}
