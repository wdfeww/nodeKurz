const express = require('express');
const router = express.Router();
const Category = require('../models/category');

router.get('/kategorie',(req,res,next)=>{
    Category.find((err, catalog)=>{
        if(err){
          return next(err);
        }
        res.render('catalog/categories', {catalog})
    });
    
});

router.get('/kategoria/:categoryId',(req,res,next)=>{
    Category.findOne({id:req.params.categoryId},(err, category)=>{
        if(err){
            return next(err);
          }
          res.render('catalog/category', {category})
    } )
  
});

router.get('/product/:categoryId/:productId',(req,res,next)=>{
    Category.findOne({id:req.params.categoryId},(err, category)=>{
        if(err){
            return next(err);
          }
          const product = category.items.find(c => c.id === req.params.productId);
          res.render('catalog/product',{category, product})
    } )
    
});

router.post('/do-kosika',(req,res,next)=>{
    const categoryId = req.body.categoryId;
    const productId = req.body.productId;
    const cart = req.session.cart || []; //default prazdny array
    if(!cart.includes(productId)){
        cart.push(productId);
    }
    req.session.cart = cart;
    //pri poste nerenderujem redirectujem
    req.session.save(err =>{
        res.redirect(`/product/${categoryId}/${productId}`)
    })
});


module.exports = router;