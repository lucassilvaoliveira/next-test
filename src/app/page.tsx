export const revalidate = 20;

import ListUsers from "./core/components/ListUsers";
import { getUsersUseCase } from "./core/usecases/getUser/GetUsersUseCase";

export default async function Home() {
  const users = await getUsersUseCase();

  return (
    <div className="flex flex-col items-center p-6">
      <ListUsers users={users} />
    </div>
  );
}