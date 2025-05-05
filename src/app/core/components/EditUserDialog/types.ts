
export type EditUserDialogType = {
  open: boolean;
  setOpen: (value: boolean) => void;
  onSubmit: (data: UpdateUserFormType) => void;
  defaultValues: UpdateUserFormType;
}

export type UpdateUserFormType = {
    userId: string
    name: string
    email: string
    password: string
}