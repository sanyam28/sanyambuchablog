import Blog from "../../models/Blog"
import dbConnect from "../../middleware/mongoose"

const handler = async (req, res) => {
    await dbConnect()
    const blogs = await Blog.find()
    res.status(200).json({blogs})
  }

export default handler;
  