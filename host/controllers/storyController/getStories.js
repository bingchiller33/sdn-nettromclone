import { storyDAO } from "../../repositories/index.js";

export default async function getStories(req, res){
  try {
    const stories = await storyDAO.getStories()
    res.status(200).json(stories)
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}