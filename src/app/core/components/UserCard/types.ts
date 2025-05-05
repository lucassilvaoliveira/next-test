import { User } from "../../types/types"

export type UserCardType = {
    user: User,
    onClick: () => void,
    onRemoveUser: (user: User) => void,
    onAddUser: (user: User) => void
}