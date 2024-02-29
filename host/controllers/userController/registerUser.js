import userDAO from "../../repositories/userRepositories/index.js";

const register = async (req, res) => {
  try {
    const { userName, email, phoneNumber, password } = req.body;
    const newUser = await userDAO.register({
      userName,
      email,
      phoneNumber,
      password,
    });
    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

export default register;
