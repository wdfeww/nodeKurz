module.exports = app =>{
    const passport = require('passport');
    const User = require('../models/user');
    const LocalStrategy =
     require('passport-local').Strategy;
    const localStrategy =
     new LocalStrategy(User.authenticate());
    passport.use(localStrategy);
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());
    app.use(passport.initialize());//aby vedel pouzivat strategiu
    app.use(passport.session());//aby vedel pouzit serializaciu a deserializaciu vytvarat token 
app.use((req,res,next)=>{
    res.locals.user = req.user;
    next();
})
};