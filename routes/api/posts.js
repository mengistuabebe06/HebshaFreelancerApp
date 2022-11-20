const express = require('express')
const passport = require('passport')
const { rawListeners } = require('../../model/User')
const router = express.Router()

//Load the Post MOdel 
const Post = require('../../model/Post')
//load a validator here
const validatePostInput = require('../../validation/post')

//@routes GET api/posts/
//@desc GET a post 
//@access public
router.get('/',(req,res)=>{
   Post.find()
    .sort({date: -1})
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({nopostfoud: "No posts found "}))
})

//@routes GET api/posts/:id
//@desc GET a post [get a single post using id]
//@access public
router.get('/:id',(req,res)=>{
    Post.findById(req.params.id)
     .then(post => res.json(post))
     .catch(err => res.status(404).json({nopostfoud: "No post found by this id"}))
 })

//@routes Post api/posts/
//@desc create a post 
//@access private

router.post('/', passport.authenticate('jwt', {session: false}), (req,res) =>{
    const  {errors, isValid} = validatePostInput(req.body)
    //check the validation
    if(!isValid){
       //if any errors , send 400 with the error object
       return res.status(400).json(errors) 
    }
    const newPost = new Post({
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id
    });

    newPost.save().then(post => res.json(post))
})

//@routes Post api/posts/comment/:id
//@desc add comments to the post
//@access private
router.post('/comment/:id', passport.authenticate('jwt', {session: false}),(req,res)=>{
    const {errors, isValid} = validatePostInput(req.body)

    // check validation
    if(!isValid){
        //return any errors with 400 status
        return res.status(400).json(errors)
    }
    Post.findById(req.params.id)
        .then(post=>{
            const newCommnet = {
                text: req.body.text,
                name: req.body.name,
                avatar: req.body.avatar,
                user: req.user.id
            }

            //add to commnets array
            post.comments.unshift(newCommnet)

            //save
            post.save().then(post=>{res.json(post) })
        })
        .catch(err=> res.status(404).json({postnotfound: "No post found"}))
})

//@routes Post api/posts/comment/:id/:comment_id
//@desc  remove a comments from the post
//@access private
router.post('/comment/:id/:comment_id', passport.authenticate('jwt', {session: false}),(req,res)=>{
    const {errors, isValid} = validatePostInput(req.body)

    // check validation
    if(!isValid){
        //return any errors with 400 status
        return res.status(400).json(errors)
    }
    Post.findById(req.params.id)
        .then(post=>{
            // check to see if the comment exists
            if(post.comments.filter(comment=> comment._id.toString() === req.params.comment_id).length === 0){
                return res.status(404).json({commentnotexits: "Comment doest not exit "})
            }

            //get remove idex

            const removeIndex = post.comments
                .map(item => item._id.toString())
                .indexOf(req.params.comment_id)

                //splice comment out of array
                post.comments.splice(removeIndex, 1)

                post.save().then(post=> res.json(post))
        })
        .catch(err=> res.status(404).json({postnotfound: "NO Post Found"}))
            
})

module.exports = router;