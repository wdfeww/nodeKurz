const express = require('express');
const router = express.Router();

//router pre endpointy
router.get('/',(req,res)=>{
    res.render('home/index');
});


module.exports = router;