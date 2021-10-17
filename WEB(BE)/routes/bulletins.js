const router = require('express').Router();

const Bulletin = require('../models/bulletin');
const Comment = require('../models/comment');


const fetchUser = require('../middleware/fetchUser');

// 게시판 글 불러오기
// limit 넘겨주면 잘라서 보내면 될 듯
// 댓글은 
// (async/await)
router.get('/bulletins', fetchUser, async (req, res) => {
  try {
    const free_billboard = req.query.free_billboard;

    const bulletin = await Bulletin.find({free_billboard: free_billboard});

    return res.json({
      bulletins: bulletin,
      comments:
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
router.post('/bulletins/register', fetchUser, async (req, res) => {
  const user = req.user;
  try {

    await Bulletin.create({
      title: req.body.title,
      user: req.user._id,
      body: req.body.body,
      free_billboard: req.query.free_billboard
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
router.post('/bulletins/:id/update', fetchUser, async (req, res) => {
  try {
    const bulletin = await Bulletin.findOne({_id: req.params.id});
    await bulletin.update({$set: {
      title: req.body.title,
      body: req.body.body,
      free_billboard: req.query.free_billboard
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
router.post('/bulletins/:id/recommendation', fetchUser, async (req, res) => {
  try {
    const bulletin = await Bulletin.findOne({_id: req.params.id});
    await bulletin.update({$set: {
      recommendation: bulletin.recommendation + 1;
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


// 게시글 삭제
// (async/await)
router.post('/bulletins/:id/delete', fetchUser, async (req, res) => {
  try {
    //댓글 삭제
    await Comment.deleteMany({post:req.params.id});
    //게시글 삭제
    await Bulletin.deleteOne({_id:req.params.id});
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
router.post('/bulletins/:id/comments', fetchUser, async (req, res) => {
  const user = req.user;
  try {
    await Comment.create({
      post: req.params.id,
      user: req.user._id,
      body: req.body.body,
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
    await comment.update({
      recommendation: comment.recommendation + 1;
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

// 댓글 삭제
// (async/await)
router.post('/comments/:id/delete', fetchUser, async (req, res) => {
  try {
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
