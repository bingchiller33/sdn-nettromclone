import User from "../../models/Users.js";

const getUserById = async ({ id }) => {
    try {
        return await User.findById({ _id: id }).exec();
    } catch (error) {
        throw new Error(error.toString());
    }
}

export default getUserById
