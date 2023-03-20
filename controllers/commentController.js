import Comment from "../models/commentModel.js";

const getComments = async (req, res) => {
    const id = req.params.postId
    try {
        if (id) {
            const comments = await Comment.find({ postId: id });
            res.json(comments);
        } else {
            res.status(404).json({ message: 'There is Not Post id there to get all comments', error: error });
        }

    } catch (error) {
        res.status(401).json({ message: 'Problem with Getting Comments From Server', error: error });
    }
}

const createComment = async (req, res) => {
    let id = req.params?.postId
    try {
        if (id) {
            const commentCreated = await Comment.create({
                postId: id,
                username: req.body?.username,
                comment: req.body?.comment
            })

            res.status(201).send(commentCreated)

        } else {
            res.status(404).json({ message: 'Post with this id not found!' })
        }

    } catch (error) {
        res.status(401).json({ message: 'Problem with Getting Comment From Server', error: error });
    }
}


const addReply = async (req, res) => {
    let id = req.params?.commentId;
    try {
        if (id) {
            const comment = await Comment.findById(id);

            if (!comment) {
                return res.status(404).json({ msg: 'Comment not found' });
            }

            const reply = {
                commentId: comment?._id,
                username: req.body?.username,
                reply: req.body?.reply,
            }

            comment?.replies.unshift(reply);

            await comment.save();

            res.json(comment);

        } else {
            res.status(404).json({ message: 'Post with this id not found!' })
        }

    } catch (error) {
        res.status(401).json({ message: 'Problem with Getting Comment From Server', error: error });
    }
}

export { createComment, getComments, addReply }