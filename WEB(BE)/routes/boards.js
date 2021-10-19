const router = require('express').Router();

const Board = require('../models/board');
const Comment = require('../models/comment');

const fetchUser = require('../middleware/fetchUser');

// 게시판 글 목록 불러오기
// (async/await)
router.get('/boards', fetchUser, async (req, res) => {
  try {
    const board = req.query.board;
    const orderBy = req.query.orderBy;
    const order = req.query.order;

    const post = await Board.find({ board: board })
      .sort({
        [orderBy]: order, 'createdAt': 'desc'//,
      })
      .populate('user')
      .populate({
        path: 'comment',
        populate: [{ path: 'recommend_user' }, { path: 'user' }],
      });

    return res.json({
      posts: post,
    });
  } catch (e) {
    console.error(`[${req.method}] ${req.path} - 에러!`, e);
    return res.status(500).json({
      error: e,
      errorString: e.toString(),
    });
  }
});

// 게시판 글 및 댓글 불러오기
// (async/await)
router.get('/boards/:id', fetchUser, async (req, res) => {
  const user = req.user;
  const orderBy = req.query.orderBy;
  const order = req.query.order;
  try {
    const post = await Board.findOne({ _id: req.params.id })
      .sort({ [orderBy]: order })
      .populate('user')
      .populate({
        path: 'comment',
        populate: [{ path: 'recommend_user' }, { path: 'user' }],
      });

    return res.json({
      posts: post,
      recommend_flag: post.recommend_user.find(_id => _id === user._id) === undefined,
    });
  } catch (e) {
    console.error(`[${req.method}] ${req.path} - 에러!`, e);
    return res.status(500).json({
      error: e,
      errorString: e.toString(),
    });
  }
});

// 게시글 추가
// (async/await)
router.post('/boards/register', fetchUser, async (req, res) => {
  try {
    await Board.create({
      title: req.body.title,
      user: req.user._id,
      body: req.body.body,
      board: req.query.board,
    });

    return res.json({});
  } catch (e) {
    console.error(`[${req.method}] ${req.path} - 에러!`, e);
    return res.status(500).json({
      error: e,
      errorString: e.toString(),
    });
  }
});

// 게시글 수정
// (async/await)
router.post('/boards/:id/update', fetchUser, async (req, res) => {
  try {
    const post = await Board.findOne({ _id: req.params.id });
    await post.update({
      $set: {
        title: req.body.title,
        body: req.body.body,
        board: req.query.board,
      },
    });
    return res.json({});
  } catch (e) {
    console.error(`[${req.method}] ${req.path} - 에러!`, e);
    return res.status(500).json({
      error: e,
      errorString: e.toString(),
    });
  }
});

// 게시글 추천
// (async/await)
router.post('/boards/:id/recommendation', fetchUser, async (req, res) => {
  try {
    const post = await Board.findOne({ _id: req.params.id });
    const recommend_user = await Board.findOne({ _id: req.params.id, recommend_user: req.user._id });

    //추천인 목록에 있는 걍우
    if (recommend_user != null) {
      await post.updateOne({ $set: { recommendation: post.recommendation - 1 } });
      await post.updateOne({ $pull: { recommend_user: req.user._id } });
    } else {
      await post.updateOne({ $set: { recommendation: post.recommendation + 1 } });
      await post.updateOne({ $push: { recommend_user: req.user._id } });
    }
    return res.json({});
  } catch (e) {
    console.error(`[${req.method}] ${req.path} - 에러!`, e);
    return res.status(500).json({
      error: e,
      errorString: e.toString(),
    });
  }
});

// 게시글 삭제
// (async/await)
router.post('/boards/:id/delete', fetchUser, async (req, res) => {
  try {
    //댓글 삭제
    await Comment.deleteMany({ post: req.params.id });
    //게시글 삭제
    await Board.deleteOne({ _id: req.params.id });
    return res.json({});
  } catch (e) {
    console.error(`[${req.method}] ${req.path} - 에러!`, e);
    return res.status(500).json({
      error: e,
      errorString: e.toString(),
    });
  }
});

// 댓글 추가
// (async/await)
router.post('/boards/:id/comments', fetchUser, async (req, res) => {
  try {
    //댓글 추가
    await Comment.create({
      post: req.params.id,
      user: req.user._id,
      body: req.body.body,
    });

    const createdComment = await Comment.findOne({ post: req.params.id, user: req.user._id });

    //게시글에 댓글 추가
    const post = await Board.findOne({ _id: req.params.id });
    await post.update({ $push: { comment: createdComment._id } });

    return res.json({});
  } catch (e) {
    console.error(`[${req.method}] ${req.path} - 에러!`, e);
    return res.status(500).json({
      error: e,
      errorString: e.toString(),
    });
  }
});

// 댓글 수정
// (async/await)
router.post('/comments/:id/update', fetchUser, async (req, res) => {
  try {
    const comment = await Comment.findOne({ _id: req.params.id });
    await comment.update({
      body: req.body.body,
    });

    return res.json({});
  } catch (e) {
    console.error(`[${req.method}] ${req.path} - 에러!`, e);
    return res.status(500).json({
      error: e,
      errorString: e.toString(),
    });
  }
});

// 댓글 추천
// (async/await)
router.post('/comments/:id/recommendation', fetchUser, async (req, res) => {
  try {
    const comment = await Comment.findOne({ _id: req.params.id });
    const recommend_user = await Comment.findOne({ _id: req.params.id, recommend_user: req.user._id });

    //작성자이거나 이미 추천한 유저인 경우 에러 출력
    if (recommend_user != null) {
      await comment.updateOne({ $set: { recommendation: comment.recommendation - 1 } });
      await comment.updateOne({ $pull: { recommend_user: req.user._id } });
    } else {
      await comment.updateOne({ $set: { recommendation: comment.recommendation + 1 } });
      await comment.updateOne({ $push: { recommend_user: req.user._id } });
    }
    return res.json({});
  } catch (e) {
    console.error(`[${req.method}] ${req.path} - 에러!`, e);
    return res.status(500).json({
      error: e,
      errorString: e.toString(),
    });
  }
});

// 댓글 삭제
// (async/await)
router.post('/comments/:id/delete', fetchUser, async (req, res) => {
  try {
    //게시글에서 댓글 삭제
    const post = await Board.findOne({ comment: req.params.id });
    await post.updateOne({ $pull: { comment: req.params.id } });

    //댓글 삭제
    await Comment.deleteOne({ _id: req.params.id });

    return res.json({});
  } catch (e) {
    console.error(`[${req.method}] ${req.path} - 에러!`, e);
    return res.status(500).json({
      error: e,
      errorString: e.toString(),
    });
  }
});

module.exports = router;
