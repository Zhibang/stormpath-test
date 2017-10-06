var express = require('express');
var stormpath = require('express-stormpath');

var app = express();
app.use(stormpath.init(app,{
    application:{
        href:process.env.STORMPATH_APPLICATION_HREF
    },
    website:true,
    web:{
        login:{
            nextUri:'/dashboard'
        }
    }
}));
app.get('/',function(req,res){
    res.send("Hey there! Thanks for visiting the site.<a href='/login'>login</a>!");
});
app.get('/dashboard', stormpath.loginRequired, function(req, res) {
    res.send('Hi: ' + req.user.email + '. Logout <form action="/logout" method="POST"><button type="submit">Logout</button></form>');
});
app.listen(process.env.PORT||3000);