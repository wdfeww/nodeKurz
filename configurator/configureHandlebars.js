module.exports = app =>{
    //pre specificke konfiguracie
//v reacte export nodejs module.exports
    const expressHandlebars = require('express-handlebars');
    const handlebars = expressHandlebars.create({
        layoutsDir: 'views/layouts',
        partialsDir: 'views/partials',
        defaultLayout: 'main'
    });

    app.engine('handlebars', handlebars.engine);//instalujem engine handlebars
    app.set('views', 'views');
    app.set('view engine', 'handlebars');
    
};