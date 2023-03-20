import Post from "../models/postModel.js";


const getPosts = async (req, res) => {
    try {
        const posts = await Post.find({});
        res.json(posts);
    } catch (error) {
        res.status(401).json({ message: 'Problem with Getting Posts From Server', error: error });
    }
}

const createPost = async (req, res) => {

    const { image, title, description, category } = req.body;

    try {
        if (category !== '') {
            const createdPost = await Post.create({
                image,
                title,
                description: description ? description : 'no description for this post!',
                category
            })
            res.status(201).json(createdPost);
        }

    } catch (error) {
        res.status(404).json({ message: error })
    }

}

const getPostById = async (req, res) => {
    let id = req.params?.postId
    try {
        if (id) {
            const post = await Post.findById(id);
            res.json(post);
        } else {
            res.status(404).json({ message: 'Post with this id not found!' })
        }

    } catch (error) {
        res.status(401).json({ message: 'Problem with Getting Post From Server', error: error });
    }
}


export { getPosts, createPost, getPostById }