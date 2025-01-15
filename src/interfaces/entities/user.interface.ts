export interface IUser {
    id: number
    email: string
    password: string
    createdAt: Date
    updatedAt: Date
}

export interface ILoggedUser extends Omit<IUser, 'password'> {}