"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "../../helpers/date";
import { UserCardType } from "./types";

export default function UserCard({ user, onClick }: UserCardType) {
  const initials = user.name
    ?.split(" ")
    .map((e) => e[0])
    .join("")
    .toUpperCase();

  return (
    <Card
      onClick={onClick}
      className="cursor-pointer hover:ring-2 hover:ring-primary transition"
    >
      <CardHeader className="flex flex-row items-center gap-4">
        {initials}
        <div>
          <CardTitle className="text-lg">{user.name}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Email: {user.email ?? "Not provided"}
        </p>
        <p className="text-sm text-muted-foreground">
          Criado em: {formatDate(user.createdAt!)}
        </p>
      </CardContent>
    </Card>
  );
}