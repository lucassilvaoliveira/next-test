import { httpClient, IHttpClient } from "@/lib/httpClient";
import { CreateUserParams } from "./types";
import { User } from "../../types/types";

export async function createUserUseCase(params: CreateUserParams) {
    const client: IHttpClient = httpClient

    return await client.post<User>('/admin/create-user', params)
}