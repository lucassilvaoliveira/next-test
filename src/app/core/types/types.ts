export type ListUserProps = {
    users: User[]
}

export type User = {
  id?: string
  name?: string
  email?: string
  password?: string
  createdAt?: string
  updatedAt?: string
};
