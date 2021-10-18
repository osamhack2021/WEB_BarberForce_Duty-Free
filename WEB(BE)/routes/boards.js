const router = require('express').Router();

const Board = require('../models/board');
const Comment = require('../models/comment');


const fetchUser = require('../middleware/fetchUser');

// 게시판 글 불러오기
// limit 넘겨주면 잘라서 보내면 될 듯
// 댓글은
// (async/await)
router.get('/boards', fetchUser, async (req, res) => {
  try {
    const board = req.query.board;

    const post = await Board.find({board: board});

    return res.json({
      posts: post
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
  const user = req.user;
  try {

    await Board.create({
      title: req.body.title,
      user: req.user._id,
      body: req.body.body,
      board: req.query.board
    })

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
    const post = await Board.findOne({_id: req.params.id});
    await board.update({$set: {
      title: req.body.title,
      body: req.body.body,
      board: req.query.board
    }})
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
    const post = await Board.findOne({_id: req.params.id});
    const recommend_user = await board.findOne({recommend_user: req.params.id});

    //작성자이거나 이미 추천한 유저인 경우 에러 출력
    if(req.params.id==post.user){
      return res.json({
        error: "INVALID RECOMMENDED USER"
      })
    }
    else if(recommend_user != null){
      return res.json({
        error: "INVALID RECOMMENDED USER"
      })
    }
    else{
      await post.update(
        {$set: {recommendation: post.recommendation + 1,}},
        {$push: {recommend_user: req.params.id}}
      )
      return res.json({});
    }
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
    await Comment.deleteMany({post:req.params.id});
    //게시글 삭제
    await Board.deleteOne({_id:req.params.id});
    }})
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
  const user = req.user;
  try {
    //댓글 추가
    await Comment.create({
      post: req.params.id,
      user: user._id,
      body: req.body.body,
    })

    const createdComment = await Comment.findOne({post:req.params.id,user:user._id});

    //게시글에 댓글 추가
    const post = await Board.findOne({_id:req.params.id});
    await post.update(
      {$push: {comment: createdComment._id}};
    )

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
    const comment = await Comment.findOne({_id: req.params.id})
    await comment.update({
      body: req.body.body
    })

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
    const comment = await Comment.findOne({_id: req.params.id})
    const recommend_user = await comment.findOne({recommend_user: req.params.id});

    //작성자이거나 이미 추천한 유저인 경우 에러 출력
    if(req.params.id==comment.user){
      return res.json({
        error: "INVALID RECOMMENDED USER"
      })
    }
    else if(recommend_user != null){
      return res.json({
        error: "INVALID RECOMMENDED USER"
      })
    }
    else{
      await comment.update(
        {$set: {recommendation: comment.recommendation + 1,}},
        {$push: {recommend_user: req.params.id}}
      )
      return res.json({});
    }
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
    const post = await Bulletin.findOne({comment: req.params.id});
    await post.deleteOne({$pull: {comment: req.params.id}});

    //댓글 삭제
    await Comment.deleteOne({_id: req.params.id})

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
