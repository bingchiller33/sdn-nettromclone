import Comments from '../../models/Comments.js'

export default async function updateCommentById(id, comment) {
  try {
    return await Comments.findOneAndUpdate({ _id: id }, template, { new: true })
  } catch (error) {
    console.log(error)
  }
}