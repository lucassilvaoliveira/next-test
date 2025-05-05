"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CreateUserDialogType, CreateUserFormType } from "./types";
import { createUserUseCase } from "../../usecases/createUser/CreateUserUseCase";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { AxiosError } from "axios";
import { encrypt } from "../../helpers/crypto";

export function CreateUserModal({
  open,
  onOpenChange,
  handleAddUser,
}: CreateUserDialogType) {

  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, reset } = useForm<CreateUserFormType>({ mode: "onChange" });

  const conflictStatusCode = 409


  async function onSubmit(data: CreateUserFormType) {
    try {
      setLoading(true);
      const newUser = await createUserUseCase({...data, password: encrypt(data.password)});

      handleAddUser(newUser)

      reset();
      onOpenChange(false);
    } catch (e) {
      if (e instanceof AxiosError && e.response?.status == conflictStatusCode) {
        toast.error("Usuário já existe! Tente outro email.");
      } else {
        toast.error(
          "Ops... Algo deu errado ao criar usuário, tente novamente mais tarde..."
        );
      }
     
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Criar novo usuário</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="name">Nome</Label>
            <Input id="name" {...register("name", { required: true })} />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              {...register("email", {
                required: true,
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Insira um email válido",
                },
              })}
            />
          </div>
          <div>
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              {...register("password", { required: true })}
            />
          </div>
          <DialogFooter>
            <Button type="submit">
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
              ) : (
                <>Criar</>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
