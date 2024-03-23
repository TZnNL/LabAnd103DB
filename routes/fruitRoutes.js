var express = require('express');
var router = express.Router();
const FruitUser = require('../models/fruit');

router.get('/test', function(req, res, next) {
    res.send('respond with a resource fruit test');
});

router.post('/add', async (req, res) => {
    try {
        const model = new FruitUser(req.body);
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
        const result = await FruitUser.find().populate('id_distributor');
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

router.get('/getListByPrice', async (req, res) => {
    try {
        const {start, end} = req.query;
        const query = { price: { $gte: start, $lte: end } };
        console.log(query);
        const result = await FruitUser.find(query, 'name price quatity id_distributor')
        .populate('id_distributor')
        .sort()
        .skip(0)
        .limit(2);
        if (result.length > 0) {
            res.send(result);
        } else {
            res.status(404).json({
                status: 404,
                message: 'No fruit found within the given price range.',
                data: []
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 500,
            message: 'Internal server error.',
            error: error.message
        });
    }
});

router.patch('/edit/:id', async(req,res)=>{
    try {
        const result = await FruitUser.findByIdAndUpdate(req.params.id, req.body)
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
        const result = await FruitUser.findByIdAndDelete(req.params.id)
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
