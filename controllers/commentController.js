import Comment from "../models/commentModel.js";

const getComments = async (req, res) => {
    const id = req.params.postId
    try {
        if (id) {
            let comments = await Comment.find({ postId: id }).sort({ createdAt: 'desc' });


            let replies = comments?.map((comment) => {
                return comment?.replies?.length >= 0 ? comment?.replies?.reverse() : []
            })

            //comment.replies || []
            let newcomments = [...comments, replies]
                .slice(0, replies?.length);

            console.log('new comments----------', newcomments);

            res.json(newcomments);
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

            const reply = {
                commentId: id,
                username: req.body?.username,
                reply: req.body?.reply,
            }

            let comment = await Comment.findByIdAndUpdate({ _id: id }, { $push: { replies: reply } }, { new: true })

            res.json(comment);

        } else {
            res.status(404).json({ message: 'Comment with this id not found!' })
        }

    } catch (error) {
        res.status(401).json({ message: 'Problem with Getting Comment From Server', error: error });
    }
}

const deleteReply = async (req, res) => {
    let id = req.params?.commentId;
    let replyId = req.params?.replyId;
    try {
        if (id && replyId) {
            let comment = await Comment.findByIdAndUpdate({ _id: id }, { $pull: { replies: { _id: replyId } } }, { new: true },)
            res.json(comment);
        } else {
            res.status(404).json({ message: 'Post with this id not found!' })
        }

    } catch (error) {
        res.status(401).json({ message: 'Problem with Getting Comment From Server', error: error });
    }
}


export { createComment, getComments, addReply, deleteReply }






























// const addReply = async (req, res) => {
//     let id = req.params?.commentId;
//     try {
//         if (id) {
//             // const commentId = await Comment.findById(id);


//             // if (!comment) {
//             //     return res.status(404).json({ msg: 'Comment not found' });
//             // }

//             // const reply = {
//             //     commentId: comment?._id,
//             //     username: req.body?.username,
//             //     reply: req.body?.reply,
//             // }

//             const reply = {
//                 commentId: id,
//                 username: req.body?.username,
//                 reply: req.body?.reply,
//             }



//             // test
//             let comment = await Comment.findByIdAndUpdate({ _id: id }, { $push: { replies: reply } }, { new: true })


//             // test end

//             //comment?.replies.unshift(reply);

//             //await comment.save();

//             res.json(comment);


//         } else {
//             res.status(404).json({ message: 'Post with this id not found!' })
//         }

//     } catch (error) {
//         res.status(401).json({ message: 'Problem with Getting Comment From Server', error: error });
//     }
// }