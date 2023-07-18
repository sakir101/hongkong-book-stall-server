import { Model } from "mongoose";

export type IUserRole = 'reader' | 'admin'

export type UserName = {
    firstName: string;
    middleName: string;
    lastName: string;
};

export type IUser = {
    name: UserName
    img: string
    role: IUserRole
    email: string
    password: string
}

export type UserModel = {
    isUserExist(
        id: string
    ): Promise<any>

    isPasswordMatched(
        givenPassword: string,
        savedPassword: string
    ): Promise<boolean>

} & Model<IUser>

export type IUsersFilters = {
    searchTerm?: string;
}
