import mongoose from "mongoose"
import { IUser } from "../users/users.interface"
import { User } from "../users/users.model"
import ApiError from "../../../errors/ApiError"
import httpStatus from "http-status"
import { ILoginUser } from "./auth.interface"

const createUser = async (user: IUser): Promise<IUser | null> => {



    let newUserAllData = null
    if (user.role === 'reader') {

        const session = await mongoose.startSession()
        try {
            session.startTransaction()

            const newUser = await User.create([user], { session });


            if (!newUser.length) {
                throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user')
            }

            newUserAllData = newUser[0];
            await session.commitTransaction();
            await session.endSession();

        } catch (error) {
            await session.abortTransaction();
            await session.endSession()
            throw error;
        }
    }
    return newUserAllData
}

const loginUser = async (payload: ILoginUser): Promise<IUser> => {
    const { email, password } = payload;

    try {
        const user = await User.findOne({ email });

        if (!user) {

            throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
        }
        else {
            const id = user?._id.toString();

            const isUserExist = await User.isUserExist(id)


            if (!isUserExist) {
                throw new ApiError(httpStatus.NOT_FOUND, "User does not exist")
            }

            // Match password

            if (
                isUserExist.password &&
                !await User.isPasswordMatched(password, isUserExist.password)
            ) {
                console.log("1")
                throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect')
            }



            return user

        }



    } catch (error) {

        throw new ApiError(httpStatus.NOT_FOUND, "Email not found");
    }



}


export const AuthService = {
    createUser,
    loginUser
}
