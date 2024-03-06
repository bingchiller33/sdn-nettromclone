import { userDAO } from "../../repositories/index.js";
import { cloudinary } from "../../utils/cloudinary.js";

const uploadImage = async (req, res) => {
  try {
    console.log(req.user);
    const result = await cloudinary.v2.uploader.upload(req.file.path, {
      public_id: `Avatar_${req.user.userName}_${Date.now()}`,
      folder: "Users Avatar",
    });
    const imageUrl = result.secure_url;
    const updatedUser = await userDAO.updateUser(req.user.phoneNumber, {
      img: imageUrl,
    });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

export default uploadImage;
