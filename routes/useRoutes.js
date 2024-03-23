var express = require('express');
var router = express.Router();
const modelUser = require('../models/user');

router.get('/test', function(req, res, next) {
    res.send('respond with a resource use test');
});

router.post('/add', async (req, res) => {
    try {
        const model = new modelUser(req.body);
        const result = await model.save();
        if (result) {
            res.status(200).json({
                "status": 200,
                "message": 'insert success',
                'data': result
            });
        } else {
            res.status(400).json({
                "status": 400,
                "message": 'insert failed',
                'data': []
            });
        }
    } catch (error) {
        console.log(error, 'user post failed');
        res.status(500).json({
            "status": 500,
            "message": 'Internal server error',
            'data': []
        });
    }
});

router.get('/list', async (req, res) => {
    try {
        const result = await modelUser.find({});
        res.send(result);
    } catch (error) {
        console.log(error, 'failed when get list user');
        res.status(500).json({
            "status": 500,
            "message": 'Internal server error',
            'data': []
        });
    }
});

router.get('/getbyid/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const result = await modelUser.findById(id);
        if (result) {
            res.send(result);
        } else {
            res.status(400).json({
                'status': 400,
                'message': 'not found user by id: ' + id,
                'data': []
            });
        }
    } catch (error) {
        if (error.name === 'CastError') {
            res.status(404).send('User not found');
        } else {
            console.log(error);
            res.status(500).send('Internal server error');
        }
    }
});
router.patch('/edit/:id', async(req,res)=>{
    try {
        const result = await modelUser.findByIdAndUpdate(req.params.id, req.body)
        if (result) {
            const rs = await result.save()
            res.send(rs)
        } else {
            res.json({
                "data": [],
                'message': 'requesst update by id failed',
                'status': 400
            })
        }
    } catch (error) {
        console.log(error , 'failed update by id');
    }
})

router.delete('/delete/:id', async (req,res) =>{
    try {
        const result = await modelUser.findByIdAndDelete(req.params.id)
        if (result) {
            res.json({
                'status': 200,
                'message': 'deleted user',
                'data': result
            })
        } else {
            res.json({
                'status': 400,
                'message': 'not found user',
                'data': []
            })
        }
    } catch (error) {
        console.log(error);
    }
})
module.exports = router;
