import express from 'express';

let router = express.Router();

// here the route is "/" but since it was added to the base app instance at /survey, the
// route is actually "/survey". You can add deeper chains here too. 
router.get('/', (req, res) => {
    console.log(req);
    res.json({
        message: "you called survey route!"
    })
})

export default router;