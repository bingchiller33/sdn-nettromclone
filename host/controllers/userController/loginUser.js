import userDAO from "../../repositories/userRepositories/index.js";

const login = async (req, res) => { 
    try {
        const { phoneNumber, password } = req.body;
        const user = await userDAO.login({ phoneNumber, password });
        res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
        res.status(401).json({ error: error.toString() });
    }
};

export default login
