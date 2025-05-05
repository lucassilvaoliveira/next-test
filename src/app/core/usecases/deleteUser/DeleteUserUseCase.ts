import { httpClient, IHttpClient } from "@/lib/httpClient";
import { DeleteUserParams } from "./types";

export async function deleteUserUseCase(params: DeleteUserParams) {
    const client: IHttpClient = httpClient

    return await client.delete(`/admin/delete-user/${params.userId}`)
}