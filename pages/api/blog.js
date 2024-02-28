import Blog from "../../models/Blog"
import dbConnect from "../../middleware/mongoose"

const handler = async (req, res) => {
    try {
        await dbConnect()
        const params = req.query.slug
        console.log(params)
        let blog = await Blog.findOne({slug: params})
        if(!blog){
            return error
        }
        res.status(200).json({ blog })
    } catch (error) {
        res.status(400).json({error: "Blog not found"})
    }
}

export default handler;
