var express = require('express');
const modelDistributor = require('../models/distributors');
var router = express.Router();
router.post('/add', async(req,res) =>{
    try {
        const model = new modelDistributor(req.body)
        const result = await model.save() //thêm vào database
        if (result) {
            res.json({
                "status":200,
                "message":"Thêm thành công",
                "data": result
            })
        }else{
            res.json({
                "status":400,
                "message":"Thêm thất bại",
                "data": []
            })
        }
        // res.send(result)
    } catch (error) {
        console.log('Error:'+error);
    }
})

router.get('/list', async(req,res)=>{
    const result = await modelDistributor.find({})
    try {
        res.send(result)
    } catch (error) {
        console.log(error);
    }
})
router.get('/getbyid/:id', async (req, res) => {
  try {
    const result = await modelDistributor.findById(req.params.id);
    if (result) {
      res.send(result);
    } else {
        res.json({
            "status":404,
            "message":"Không tìm thấy ID",
            "data": []
        })
    }
  } catch (error) {
    if (error.name === 'CastError') {
      res.status(400).send('Invalid ID format');
    } else {
      console.log(error);
      res.status(500).send('Internal Server Error');
    }
  }
});
router.patch('/edit/:id', async(req,res)=>{
    try {
        const result = await modelDistributor.findByIdAndUpdate(req.params.id, req.body)
        if (result) {
            await result.save()
            res.send(result);
        } else {
            res.json({
                "status":404,
                "message":"Không tìm thấy ID",
                "data": []
            })
        }
      } catch (error) {
        if (error.name === 'CastError') {
          res.status(400).send('Invalid ID format');
        } else {
          console.log(error);
          res.status(500).send('Internal Server Error');
        }
      }
})
router.delete('/delete/:id', async(req,res)=>{
    try {
        const result = await modelDistributor.findByIdAndDelete(req.params.id)
        if (result) {
            res.json({
                "status":200,
                "message":"xóa thành công",
                "data": result
            })
        }else{
            res.json({
                "status":400,
                "message":"xóa thất bại",
                "data": []
            })
        }
    } catch (error) {
        console.log(error);
    }
})
module.exports = router;