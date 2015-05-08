var express     = require('express'),
    stormpath   = require('express-stormpath');

var app = express();

var httpAuth = require('./middlewares/basic-auth');

app.all('/*', httpAuth('a', 'a'), function(req, res, next) {
  res.locals.user = req.user;
  res.locals.url = req.url;
  next();
});

var appOptions = {
  application: process.env.STORMPATH_APP_HREF,
  apiKeyId: process.env.STORMPATH_API_KEY_ID,
  apiKeySecret: process.env.STORMPATH_API_KEY_SECRET
};

app.use(stormpath.init(app, appOptions));

app.get('/',stormpath.loginRequired,function(req,res){
  res.send('This is the home page.  You are: ' + res.locals.user.email);
});

app.listen(process.env.PORT || 3000);
console.log('Listening on port ' + (process.env.PORT || 3000) + '.');