import mongoose, { Schema } from 'mongoose';

const commentSchema = new mongoose.Schema({
    postId: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
    replies: [{
        username: {
            type: String,
            required: true,
        },
        commentId: {
            type: Schema.Types.ObjectId,
            required: true,
        },
        reply: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: new Date().getTime()
        }
    }]
}, {
    timestamps: true
})

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;


// replies: [{
//     username: {
//         type: String,
//         required: true,
//     },
//     commentId: {
//         type: Schema.Types.ObjectId,
//         required: true,
//     },
//     reply: {
//         type: String,
//         required: true
//     }
// }]

// const Comments = [
//     {
//         id: commentId,
//         post_id: 1,
//         user_id: 1,
//         comment: 'nice post',
//         createdAt: 'today',
//         updatedAt: 'today',
//         replies: [
//             {
//                 id: replyId,
//                 userId: userId,
//                 comment_id: commentId,
//                 reply: 'this is a reply to  ${commentId}'
//             }
//         ]
//     },
//     {
//         id: commentId,
//         post_id: 1,
//         user_id: 2,

//         comment: 'nice post 2',
//         createdAt: 'today 2',
//         updatedAt: 'today 2',
//     }
// ]