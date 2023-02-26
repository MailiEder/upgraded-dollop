const router = require("express").Router();
const pgutils = require('../utils/pgutils');
const bcrypt = require("bcrypt");

// UPDATE
router.put("/:id",async(req,res)=>{


    console.log(req.body.userid);
    console.log(req.params.id);
    console.log(req.body.email);

    if(req.body.userid == req.params.id) {

    //    console.log(req.body.userid);
    //    console.log(req.params.id);


        if(req.body.password){
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }


        try{
            const updateUser = {
                userid : req.body.userid,
                username : req.body.username,
                email : req.body.email,
                password : req.body.password,
                profilepic : req.body.profilepic
            }

            const updatedUser =  await pgutils.updateUserbyId(updateUser)
            res.status(200).json(updatedUser);

        }catch(err){
        res.status(500).json(err);
        }

    } else {
        res.status(401).json("Sie können nur Ihr eigenes Konto ändern!")
    }
    
});

// DELETE
router.delete("/:id",async(req,res)=>{

    if(req.body.userid == req.params.id) {

        try {
            
            const user = await pgutils.getUserbyId(req.params.id)

            try{
                
                await pgutils.deletePosts(user.username)
                await pgutils.deleteUser(req.params.id)
                res.status(200).json("Benutzer wurde gelöscht....");
    
            }catch(err){
            res.status(500).json(err);
            }

        } catch (err) {
            res.status(404).json("Benutzer nicht gefunden!")
        }

    } else {
        res.status(401).json("Sie können nur Ihr eigenes Konto ändern!")
    }
    
});

// GET USER

router.get("/:id", async (req, res) => {

    try {
        
        const user = await pgutils.getUserbyId(req.params.id)

        const { password, ...others } = user;

        res.status(200).json(others);


    } catch (err) {
        res.status(500).json(err)
    }

})


module.exports = router