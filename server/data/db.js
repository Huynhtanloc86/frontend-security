const users = [
  {
    id: 1,
    username: 'demo',
    password: '123456',
    createdAt: new Date(),
  },
];

const posts = [
  {
    id: 1,
    title: 'Bài viết đầu tiên',
    content: 'Đây là nội dung bài viết đầu tiên',
    userId: 1,
    createdAt: new Date(),
  },
];

const comments = [
  {
    id: 1,
    content: 'Bình luận hay!',
    postId: 1,
    userId: 2,
    createdAt: new Date(),
  },
];

module.exports = {
  users,
  posts,
  comments,
};
