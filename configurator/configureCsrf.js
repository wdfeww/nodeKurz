module.exports = app =>{
    app.use(require('csurf')());
    
    app.use((req, res, next) => {
        res.locals.csrfToken = req.csrfToken();
        next();
       });
};