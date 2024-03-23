var express = require('express')
var router = express.Router();
const upload = require('../config/upload')

router.get('/test', function(req, res, next) {
    res.send('respond with a resource upload test');
});

//add data

router.post('/mulUpload', upload.array('images',5) , async(req,res) =>{
    try {
    const {files} = req
    const urlImages = files.map((file) => `${req.protocol}://${req.get("host")}/uploads/${file.filename}`)
    console.log(urlImages);
      
    } catch (error) {
        console.log('Error:'+error);
    }
})

module.exports = router;