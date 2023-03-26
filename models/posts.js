const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  content: {
    type: String,
    required: [true, '貼文內容未填寫'],
  },
  image: {
    type: String,
    default: '',
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  name: {
    type: String,
    required: [true, '貼文姓名未填寫'],
  },
  likes: {
    type: Number,
    default: 0,
  },
});

const Post = mongoose.model('POST', postSchema);

module.exports = Post;