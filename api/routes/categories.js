const router = require("express").Router();
const pgutils = require('../utils/pgutils');

// CREATE CATEGORY
router.post("/",async(req,res)=>{
    
    const newCat = {
        name : req.body.name
    }
    
    try {
        
        const savedCat = await pgutils.saveCategory(newCat);
        res.status(200).json(savedCat);

    } catch (err) {
        res.status(500).json(err);
    }
    
});

// GET ALL CATEGORIES
router.get("/",async(req,res)=>{
    
    try {
        
        const cats = await pgutils.getAllCategories();
        res.status(200).json(cats);

    } catch (err) {
        res.status(500).json(err);
    }
    
});

module.exports = router