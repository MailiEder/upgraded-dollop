const router = require("express").Router();
const pgutils = require('../utils/pgutils');
const bcrypt = require("bcrypt");

// REGISTER
router.post("/register",async(req,res)=>{
    try{

        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password,salt)

        const newUser = {
            username : req.body.username,
            email : req.body.email,
            password : hashedPass
        }

       const user =  await pgutils.saveUser(newUser)
       res.status(200).json(user);
       console.log(user)

    }catch(err){
    res.status(500).json(err);
    }
});

// LOGIN
router.post("/login", async(req, res)=>{
    try {

        var loginpassword = req.body.password;

        const user =  await pgutils.getUserbyUsername(req.body.username);
        !user && res.status(400).json("Falsche Anmeldeinformationen!");

        const validated = await bcrypt.compare(loginpassword, user.password);
        !validated && res.status(400).json("Falsche Anmeldeinformationen!");

        const { password, ...others } = user;

        res.status(200).json(others);

    } catch (err) {
        
      //  res.status(500).json(err);
      // führt zu Fehler
      // Cannot set headers after they are sent to the client
    }
});

module.exports = router