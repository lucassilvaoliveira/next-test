"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { OrderUsersByTimeType, OrderUsersByType, SortControlsType } from "./types";
import { CreateUserModal } from "../CreateUserDialog";

export default function SortControls({
  orderBy,
  setOrderBy,
  orderByTime,
  setOrderByTime,
  handleAddUser
}: SortControlsType) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="w-full max-w-6xl flex justify-between items-end gap-3">
      <div className="flex gap-3">
        <div className="flex flex-col">
          <p>Ordenar por</p>
          <Select value={orderBy} onValueChange={(e) => setOrderBy(e as OrderUsersByType)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Ordenar por" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Nome</SelectItem>
              <SelectItem value="createdAt">Data de criação</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col">
          <p>
            {orderBy === "name"
              ? "Ordenar alfabeticamente"
              : "Ordenar por ordem cronológica"}
          </p>
          <Select
            value={orderByTime}
            onValueChange={(e) => setOrderByTime(e as OrderUsersByTimeType)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Ordenar" />
            </SelectTrigger>
            <SelectContent>
              {orderBy === "name" ? (
                <>
                  <SelectItem value="asc">A-Z</SelectItem>
                  <SelectItem value="desc">Z-A</SelectItem>
                </>
              ) : (
                <>
                  <SelectItem value="asc">Mais antigos</SelectItem>
                  <SelectItem value="desc">Mais recentes</SelectItem>
                </>
              )}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button onClick={() => setOpenModal(true)}>Novo usuário</Button>

      <CreateUserModal open={openModal} onOpenChange={setOpenModal} handleAddUser={handleAddUser} />
    </div>
  );
}