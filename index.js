const http = require('http');
const express = require('express');
const mongoose = require('mongoose');
const Category = require('./models/category');

mongoose.Promise = global.Promise;
const connection_string = `mongodb://eshopuser:eshoppassword@ds031988.mlab.com:31988/eshop`;
const port = 8010;

const app = express();

// const catalog =[
    
// {
//     id:'telefony',
//     name:'Phones',
//     items:[
//         {id:'iphone', name:'Iphone X', price:999},
//         {id:'s9', name:'Samsung S9', price:199}
//     ]
// },

// {  
//     id:'tablety',
//     name:'Tablets',
//     items:[
//         {id:'ipad', name:'Ipad Pro', price:993},
//         {id:'s10', name:'Samsung S10', price:599}
//     ]
// }
// ];


mongoose.connect(connection_string);

   mongoose.connection.on('connected', () => {
    console.log('Mongo connected');
   });
   mongoose.connection.on('disconnected', () => {
    console.log('Mongo disconnected');
   });


const expressHandlebars = require('express-handlebars');
const handlebars = expressHandlebars.create({
    layoutsDir: 'views/layouts',
    partialsDir: 'views/partials',
    defaultLayout: 'main'
});


app.engine('handlebars', handlebars.engine);//instalujem engine handlebars
app.set('views', 'views');
app.set('view engine', 'handlebars');

app.use(( req, res, next)=>{
    console.log('path', req.url);
    next();
});

// app.use(express.static('public'));//ked dam localhost/nejaky html tak mi ho otvori

app.get('/',(req,res)=>{
    res.render('home/index');
    // console.log("Hello World from INDEX");
    // res.type('txt');
    // res.status(200);
    // res.send('Hello Index');

});
app.get('/kategorie',(req,res,next)=>{
    Category.find((err, catalog)=>{
        if(err){
          return next(err);
        }
        res.render('catalog/categories', {catalog})
    });
    
});

app.get('/kategoria/:categoryId',(req,res,next)=>{
    Category.findOne({id:req.params.categoryId},(err, category)=>{
        if(err){
            return next(err);
          }
          res.render('catalog/category', {category})
    } )
});

app.get('/product/:categoryId/:productId',(req,res,next)=>{
    Category.findOne({id:req.params.categoryId},(err, category)=>{
        if(err){
            return next(err);
          }
          const product = category.items.find(c => c.id === req.params.productId);
          res.render('catalog/product',{category, product})
    } )
});

app.listen(port);
console.log(`Running at http://localhost:${port}`)