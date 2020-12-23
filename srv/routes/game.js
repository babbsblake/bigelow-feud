import express from 'express';

let router = express.Router();

router.get('/', (req, res) => {
    console.log(req);
    res.json({
        message: "you called game route!"
    })
})

export default router;