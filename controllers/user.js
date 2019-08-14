const passport = require('../config/passport');
// const db = require('../models')
// GET /signup
exports.register = (req, res) => {
    res.render('register');
}

// GET /login
exports.login = (req, res) => {
    res.render('login');
}

// GET /user/profile
exports.userProfile = (req, res) => {
    res.render('profile', {user: req.user});
}

// GET for /user/logout
exports.userLogout = (req, res) => {
    req.logout();
    res.redirect('/login');
}

// GET for /user/addspot
exports.userAddspot = (req, res) => {
    res.render('addspot')
}


exports.userAllspots = (req, res) => {
    res.render('allSpots');
}

exports.demo = (req, res) => {
    res.render('demo', {user: req.user});
}


exports.userSpot = (req,res) => {
    // Querying database for comments of the spot
    req.context.db.comments.findAll({
        where: {spotId: req.params.spotId}
    }).then(function(comments){
            // Querying database for spot
        req.context.db.Spot.findOne({
            where: {id: req.params.spotId}
        }).then(function(results){
            // rendering spot
            console.log(comments[0].description)
            // console.log(results[0].dataValues.image);
            // let img = results[0].dataValues.image;
            res.render('spot', {spot: results, comments: comments})
        });
    });  
}

// POST /user/register
exports.signup = passport.authenticate('local-signup', {
    successRedirect: '/user/profile',
    failureRedirect: '/register' 
});

// POST /user/login
exports.userLogin = passport.authenticate('local', { 
    successRedirect: '/user/profile',
    failureRedirect: '/login' 
});

// Post User so that they are able to add Comments to the page 
exports.addcomments = (req, res) => {
    let id = parseInt(req.body.spotId);
    req.context.db.comments.create({
        spotId: id,
        description: req.body.comment
    }).then(function(){
        res.redirect('/user/spot/'+id);
    }).catch(function(err){
        console.log(err);
        res.json(err);
    });
 }