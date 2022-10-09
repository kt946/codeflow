const { Schema, model } = require('mongoose');
const { dateFormat } = require('../utils/helpers');

const replySchema = new Schema(
    {
        replyBody: {
            type: String,
            required: true,
            maxlength: 300
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            immutable: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: date => dateFormat(date)
        },
        isDeleted: {
            type: Boolean,
            required: true,
            default: false
        },
        postId: {
            type: Schema.Types.ObjectId,
            ref: 'Post',
            required: true
        },
        parentReplyId: {
            type: Schema.Types.ObjectId,
            ref: 'Reply'
        },
        replies: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Reply'
            }
        ]
    },
    {
        toJSON: {
            getters: true
        }
    }
);

replySchema.virtual('replyCount').get(function () {
    return (this.replies ? this.replies.length : 0);
});

const Reply = model('Reply', replySchema);

module.exports = Reply;