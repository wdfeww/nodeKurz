const express = require('express');
const router = express.Router();

const User = require('../models/user');
const passport = require('passport');

router.get('/registracia',(req, res)=>{
    res.render('user/register');
});

router.post('/registracia',(req, res, next)=>{//na post odpovedam redirectom

    if(req.body.username && req.body.password){
        User.register({
            username: req.body.username
    },req.body.password, (err, user)=>{
        if(err){
            return next(err);
        }
        //req.login pre prihlasenie uzivatela alebo redirect aby som ho vratil na login stranku aa prihlasi sa
        req.login(user, err =>{
            if(err){
                return next(err);
            }
            res.redirect('./kategorie');
        });
    });
    }else{
        res.redirect('/registracia');
    }

});


router.get('/prihlasenie',(req, res)=>{
    res.render('user/login');
});

router.post('/prihlasenie',(req, res, next)=>{
    passport.authenticate('local', (err,user)=>{
        if(err){
            return next(err);
        }if(!user){
            res.redirect('/prihlasenie');
        }else{
            req.login(user, err =>{
                if(err){
                    return next(err);
                }
                res.redirect('./kategorie');
            });
        }
    })(req,res,next);
});

module.exports = router;