const express = require('express');
const router = express.Router();

router.get('/registracia',(req, res)=>{
    res.render('user/register');
});

router.post('/registracia',(req, res)=>{//na post odpovedam redirectom

    console.log(req.body);
    res.redirect('/registracia');
});
module.exports = router;