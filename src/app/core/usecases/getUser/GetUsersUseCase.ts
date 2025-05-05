import { httpClient, IHttpClient } from "@/lib/httpClient";
import { User } from "../../types/types";

export async function getUsersUseCase(): Promise<User[]> {
  const client: IHttpClient = httpClient;

  try {
    return await client.get<User[]>("/admin/get-users");
  } catch (e) {
    return [];
  }
}
