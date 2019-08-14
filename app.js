const express  = require('express');
const app      = express();
const database = require('./models');
const routes   = require('./routes');
const session = require('express-session');
const passport = require('./config/passport');
// parsing form data
const bodyParser = require('body-parser').urlencoded({extended: false})

const port = process.env.PORT || 3000 ;

// setting up middleware 
app.use(express.static('./public'));
app.use(session({ secret: "cat keyborad", resave: true, saveUninitialized: true }));
app.use(bodyParser);
app.use(passport.initialize());
app.use(passport.session());



//setting up template engine 
app.set("view engine", "ejs");  
app.get('/', function (req, res) {
  res.render('home.ejs', {user: req.user});
})

// adding context to our request
app.use( (req, res, next ) => {
  req.context = { db: database }
  next();
} )

// routing manager
app.use(routes);

// app is listening for request on port 3000  
database.sequelize.sync().then(function(){
  app.listen(port, function(err){
      if (err)
        console.log(err)
      console.log('Server is live on port: ' + port)
  })
});
