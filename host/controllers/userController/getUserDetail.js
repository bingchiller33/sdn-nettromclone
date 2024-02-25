import userDAO from "../../repositories/userRepositories/index.js";

const getUserById = async (req, res) => {
    try {
        res.status(201).json(await userDAO.getUserById({ id: req.params.id }));
    } catch (error) {
        res.status(500).json({
            message: error.toString(),
        });
    }
};

export default getUserById
