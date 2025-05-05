import { User } from "../../types/types";

export type CreateUserFormType = {
  name: string;
  email: string;
  password: string;
};

export type CreateUserDialogType = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  handleAddUser: (user: User) => void;
};  