"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { ListUserProps, User } from "../../types/types";
import { useEffect, useState } from "react";
import { decrypt, encrypt } from "../../helpers/crypto";
import { updateUserUseCase } from "../../usecases/updateUser/UpdateUserUseCase";
import { toast } from "sonner";

import { OrderUsersByTimeType, OrderUsersByType } from "../OrderControls/types";
import EditUserDialog from "../EditUserDialog";
import UserCard from "../UserCard";
import SortControls from "../OrderControls";

const ITEMS_PER_PAGE = 12;

export default function ListUsers({ users }: ListUserProps) {
  const [userList, setUserList] = useState(users);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [open, setOpen] = useState(false);
  const [orderBy, setOrderBy] = useState<OrderUsersByType>("createdAt");
  const [orderByTime, setOrderByTime] = useState<OrderUsersByTimeType>("desc");

  useEffect(() => {
    setUserList((prev) => sortUserList(prev, orderBy, orderByTime));
  }, [orderBy, orderByTime]);

  const totalPages = Math.ceil(userList.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedUsers = userList.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  function sortUserList(
    list: User[],
    sortBy: OrderUsersByType,
    direction: OrderUsersByTimeType
  ): User[] {
    return [...list].sort((a, b) => {
      const valueA = a[sortBy];
      const valueB = b[sortBy];

      if (valueA === undefined || valueB === undefined) return 0;

      if (sortBy === "name") {
        const nameA = valueA.toLowerCase();
        const nameB = valueB.toLowerCase();

        return direction === "asc"
          ? nameA.localeCompare(nameB)
          : nameB.localeCompare(nameA);
      }

      if (sortBy === "createdAt") {
        const dateA = new Date(valueA).getTime();
        const dateB = new Date(valueB).getTime();
        return direction === "asc" ? dateA - dateB : dateB - dateA;
      }

      return 0;
    });
  }

  function handleAddUser(user: User) {
    setUserList(prev => [user, ...prev]);
  }

  function handleRemoveUser(user: User) {
    setUserList(prev => prev.filter(e => e.id != user.id))
  }

  function handlePageChange(page: number) {
    setCurrentPage(page);
  }

  function handleCardClick(user: User) {
    setSelectedUser(user);
    setOpen(true);
  }

  async function onSubmit(data: any) {
    const updatedUser = {
      ...selectedUser,
      name: data.name,
      email: data.email,
      password: data.password,
    };

    const previousUsers = [...userList];

    setUserList((prev) =>
      prev.map((e) =>
        e.id === updatedUser.id
          ? {
              ...e,
              name: updatedUser.name,
              email: updatedUser.email,
              password: encrypt(updatedUser.password),
            }
          : e
      )
    );

    setOpen(false);

    try {
      await updateUserUseCase({
        userId: data.userId,
        data: {
          name: data.name,
          email: data.email,
          password: encrypt(data.password),
        },
      });
    } catch (e) {
      setUserList(previousUsers);
      toast("Ops...", {
        description:
          "Algo aconteceu ao atualizar o usuário... tente novamente mais tarde",
      });
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 gap-6">
      <SortControls
        orderBy={orderBy}
        setOrderBy={setOrderBy}
        orderByTime={orderByTime}
        setOrderByTime={setOrderByTime}
        handleAddUser={handleAddUser}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full">
        {!paginatedUsers.length ? (
          <Card className="col-span-full">
            <CardContent className="p-6 text-center text-muted-foreground">
              No users found
            </CardContent>
          </Card>
        ) : (
          paginatedUsers.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              onClick={() => handleCardClick(user)}
              onRemoveUser={(user) => handleRemoveUser(user)}
              onAddUser={handleAddUser}
            />
          ))
        )}
      </div>

      {totalPages > 1 && (
        <Pagination className="mt-8">
          <PaginationContent>
            {Array.from({ length: totalPages }, (_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  isActive={currentPage === i + 1}
                  onClick={() => handlePageChange(i + 1)}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
          </PaginationContent>
        </Pagination>
      )}

      {selectedUser && (
        <EditUserDialog
          open={open}
          setOpen={setOpen}
          onSubmit={onSubmit}
          defaultValues={{
            userId: selectedUser.id!,
            name: selectedUser.name ?? "",
            email: selectedUser.email ?? "",
            password: selectedUser.password
              ? decrypt(selectedUser.password)
              : "",
          }}
        />
      )}
    </div>
  );
}
