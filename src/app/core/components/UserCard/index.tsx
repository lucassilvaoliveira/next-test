"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "../../helpers/date";
import { UserCardType } from "./types";
import { TrashIcon } from "lucide-react";
import { deleteUserUseCase } from "../../usecases/deleteUser/DeleteUserUseCase";
import { toast } from "sonner";

export default function UserCard({
  user,
  onClick,
  onRemoveUser,
  onAddUser,
}: UserCardType) {
  const initials = user.name
    ?.split(" ")
    .map((e) => e[0])
    .join("")
    .toUpperCase();

  async function deleteUser() {
    onRemoveUser(user);

    try {
      await deleteUserUseCase({ userId: user.id! });
    } catch (e) {
      toast.error(
        "Ops... algo deu errado ao excluir usuário, tente novamente mais tarde"
      );
      onAddUser(user);
    }
  }

  return (
    <Card
      onClick={onClick}
      className="cursor-pointer hover:ring-2 hover:ring-primary transition"
    >
      <CardHeader className="flex flex-row items-center gap-4">
        {initials}
        <div className="flex justify-between w-full items-center">
          <CardTitle className="text-lg">{user.name}</CardTitle>
          {/* Ícone de lixeira à direita do nome */}
          <TrashIcon
            className="h-5 w-5 text-red-500 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation(); // Previne o evento de clicar no card
              deleteUser();
            }}
          />
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Email: {user.email ?? "Not provided"}
        </p>
        <p className="text-sm text-muted-foreground">
          Criado em: {formatDate(user.createdAt!)}
        </p>
        <p className="text-sm text-muted-foreground">
          Atualizado em: {formatDate(user.updatedAt!)}
        </p>
      </CardContent>
    </Card>
  );
}
