var express = require('express');
var router = express.Router();
var csrf = require('csurf')

var passport = require('passport')
var product = require('../models/product')
var csrfProctection = csrf();
router.use(csrfProctection)
    /* GET home page. */
router.get('/', function (req, res, next) {
    product.find(function (err, docs) {
        var productChunks = [];
        var chunkSize = 3
        for (var i = 0; i < docs.length; i += chunkSize) {
            productChunks.push(docs.slice(i, i + chunkSize));
        }
        res.render('shop/index', {
            title: 'Shopping Cart',
            products: productChunks
        });
    })

});
router.get('/user/signup', function (req, res, next) {
  //  var messages = req.flash('error')
    res.render('user/signup', {
        csrfToken: req.csrfToken()
        //,
      //  messages: messages,
      //  hasErrors: messages.length > 0
    })
})
router.post('/user/signup', function (req, res, next){
    res.redirect('/')
}
)
router.get('/user/profile', function (req, res, next) {
    res.render('user/profile', {
        csrfToken: req.csrfToken()
    })
})
module.exports = router;
