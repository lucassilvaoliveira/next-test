import { httpClient, IHttpClient } from "@/lib/httpClient";
import { UpdateUserParams } from "./types";
import { User } from "../../types/types";

export async function updateUserUseCase(params: UpdateUserParams) {
    const client : IHttpClient = httpClient

    return await client.put<User>('/admin/update-user', params)
}