export type UpdateUserParams = {
  userId: string
  data: {
    name?: string
    email?: string
    password?: string
  }
};
