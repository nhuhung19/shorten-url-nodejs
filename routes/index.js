var express = require('express');
var router = express.Router();
// var shortUrl = require('node-url-shortener');
const shortId = require('shortid');
const {saveData, loadData} = require('../modules/data')

/* GET home page. */
router.get('/', function(req, res, next) {
  const data = loadData()
  res.render('index', { url: data });
});

router.get("/:shortUrl", function(req,res){
  const data = loadData()
  const shortUrl = req.params.shortUrl
  const findUrl = data.find(item => item.shortUrl === shortUrl)
  if(!data.some(item => item.shortUrl === shortUrl)){
    return res.sendStatus(404)
  }
  res.redirect(findUrl.currentUrl)

})

router.post("/shorten", function (req, res, next){
  const currentUrl = req.body.longUrl
  const shortUrl = shortId.generate()
  const url = {currentUrl: currentUrl, shortUrl:shortUrl}
  const data = loadData()
  data.unshift(url)
  saveData(data)
  res.redirect("/")
})

module.exports = router;
