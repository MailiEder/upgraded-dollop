const router = require("express").Router();
const pgutils = require('../utils/pgutils');


// CREATE NEW POST
router.post("/",async(req,res)=>{
    
    
    const newPost = {
        title : req.body.title,
        description : req.body.description,
        photo : req.body.photo,
        username : req.body.username
    }
    

    try {
        
        const savedPost = await pgutils.savePost(newPost);
        res.status(200).json(savedPost);

    } catch (err) {
        res.status(500).json(err);
    }
    
});

// UPDATE POST
router.put("/:id",async(req,res)=>{
    try {
        const post = await pgutils.getPost(req.params.id);
        
        if(post.username === req.body.username) {

            try {
            
                const post = {
                    id : req.params.id,
                    title : req.body.title,
                    description : req.body.description          
                }
                
                const updatedPost = await pgutils.updatePost(post);
                res.status(200).json(updatedPost);
            } catch (error) {
                res.status(500).json(err)
            }
        } else {
            res.status(401).json("Sie können nur Ihren eigenen Beitrag aktualisieren.")
        }
    } catch (err) {
        res.status(500).json(err)
    }           
    
});

// DELETE POST

router.delete("/:id",async(req,res)=>{
    try {
        const post = await pgutils.getPost(req.params.id);
        
        if(post.username === req.body.username) {

            try {
            
                await pgutils.deletePost(post.postid);
                res.status(200).json("Der Eintrag wurde gelöscht....");
            } catch (error) {
                res.status(500).json(err)
            }
        } else {
            res.status(401).json("Sie können nur Ihren eigenen Beitrag löschen.")
        }
    } catch (err) {
        res.status(500).json(err)
    }           
    
});

// GET POST

router.get("/:id", async (req, res) => {

    try {
        
        const post = await pgutils.getPost(req.params.id);

        res.status(200).json(post);

    } catch (err) {
        res.status(500).json(err)
    }

})

// GET ALL POSTS

router.get("/", async (req, res) => {
    const username = req.query.user;
    const catname = req.query.cat;

    try {
        
        let posts;

        if(username){
            console.log(username)
            posts = await pgutils.getAllByUser(username)
        } else if (catname) {
            console.log(catname)
            posts = await pgutils.getAllByCategory(catname)
        } else {
            posts = await pgutils.getAll()
        }

        res.status(200).json(posts);

    } catch (err) {
        res.status(500).json(err)
    }

})

module.exports = router