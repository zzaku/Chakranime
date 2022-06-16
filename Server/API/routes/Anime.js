const express = require('express');
const Post = require('../models/Post');
const router = express.Router();
const pageScraper = require('../../Scrapper/pageController');
const browserObject = require('../../Scrapper/browser');
const isThereNewAnime = require('../../Scrapper/addNewAnime')
const browserInstance = browserObject.startBrowser();

let cacheTime;
let datas
//GET BACK ALL 9 ANIMES
router.get('/allanimes', async (req, res) => {
    try{
        const { page = 1, limit = 9 } = req.query;
        const posts = await Post.find()
        .limit(limit * 1)
        .skip((page - 1) * limit);
        res.json(posts)
    }catch(err){
        res.json({message: err})
    }
});

//GET BACK ALL ANIMES
router.get('/allanimes/check', async (req, res) => {
    try{
        const posts = await Post.find()
        res.json(posts)
    }catch(err){
        res.json({message: err})
    }
});

//CHECK AND SCRAP NEW ANIMES
router.get('/allanimes/scrap', async (req, res) => {
    try{
        const newData = await isThereNewAnime()
        const testify = await pageScraper.pageScraper(browserInstance, newData);
        const posts = await Post.find({
            newEp: {$exists: true}
    })
        if(posts.length > 0){
            const cleaner = await getAllNameOfNewEp(posts)
        }

    }catch(err){
            res.json({message: err})
    }
});

//SWAP ALL PREVIOUS ANIME EP WITH NEW EP
const getAllNameOfNewEp = async (episodes) => {
    for(episode of episodes){
        const delOldVersionAnime = await Post.remove({
            name: episode.name, langue: episode.langue, saison: episode.saison, newEp: {$exists: false}
        })
        const fixNewVersion = await Post.updateMany(
            {name: episode.name, langue: episode.langue, saison: episode.saison, newEp: {$exists: true}},
            { $unset: { newEp: "" } }
        )
        const addFieldToNewVersion = await Post.update(
            {name: episode.name, langue: episode.langue, saison: episode.saison, newEp: {$exists: false}},
            { $set: { "nouveau": true } }
        )
    }
}

//GET BACK LAST 10 ANIME
router.get('/anime/recentlyadded', async (req, res) => {
    try{
        const { page = 1, limit = 9 } = req.query;
        const post = await Post.find({}).sort({$natural:-1}).limit(limit * 1)
        .skip((page - 1) * limit);
        res.json(post)
    }catch(err){
        res.json({message: err})
    }
});

//GET BACK SPECIFIC ANIME
router.get('/anime/:postId', async (req, res) => {
    try{
        const post = await Post.findById(req.params.postId)
        res.json(post)
    }catch(err){
        res.json({message: err})
    }
});

//GET ANIMES SERIE
router.get('/animes/type/serie', async (req, res) => {
    try{
        const { page = 1, limit = 9 } = req.query;
        const filmornot = req.query.filmornot;
        //await pageScraper.pageScraper(browserInstance);
        const posts = await Post.find({
            $nin: [
                {
                "saison": "Film"
                }
            ]
        })
        .limit(limit * 1)
        .skip((page - 1) * limit);
        res.json(posts)
    }catch(err){
        res.json({message: err})
    }
});

//GET ANIMES FILM
router.get('/animes/type/film', async (req, res) => {
    try{
        const { page = 1, limit = 9 } = req.query;
        const filmornot = req.query.filmornot;
        const posts = await Post.find({
                "saison": "Film"
            })
        .limit(limit * 1)
        .skip((page - 1) * limit);
        res.json(posts)
    }catch(err){
        res.json({message: err})
    }
});

//GET BACK ANIME BY GENRE
router.get('/animes/genres', async (req, res) => {
    try{
        const genre1 = req.query.genre1;
        const genre2 = req.query.genre2;
        const genre3 = req.query.genre3;
        const genre4 = req.query.genre4;
        const genre5 = req.query.genre5;
        const genre6 = req.query.genre6;
        const genre7 = req.query.genre7;
        const genre8 = req.query.genre8;
        const genre9 = req.query.genre9;
        const genre10 = req.query.genre10;
        const genre11 = req.query.genre11;
        const genre12 = req.query.genre12;
        const { page = 1, limit = 9 } = req.query;
        //await pageScraper.pageScraper(browserInstance);
        const posts = await Post.find({
            $and: [
                {
                "genre": genre1,
                },
                {
                "genre": genre2,
                },
                {
                "genre": genre3,
                },
                {
                "genre": genre4,
                },
                {
                "genre": genre5,
                },
                {
                "genre": genre6,
                },
                {
                "genre": genre7,
                },
                {
                "genre": genre8,
                },
                {
                "genre": genre9,
                },
                {
                "genre": genre10,
                },
                {
                "genre": genre11,
                },
                {
                "genre": genre12,
                },
            ],
        })
        .limit(limit * 1)
        .skip((page - 1) * limit);
        res.json(posts)
    }catch(err){
        res.json({message: err})
    }
});


//SUBMIT AN ANIME
router.post('/allanimes', async (req, res) => {
    const data = {
        name: req.body.name,
        date: req.body.date,
        desc: req.body.desc,
        duree: req.body.duree,
        genre: req.body.genre,
        image: req.body.image,
        banniere: req.body.banniere,
        langue: req.body.langue,
        links: req.body.links,
        format_VOD: req.body.format_VOD,
        episode: req.body.episode,
        lien: req.body.lien,
        nextLinks: req.body.nextLinks,
        saison: req.body.saison,
        nombre_episode: req.body.nombre_episode,
        nombre_episode_final: req.body.nombre_episode_final,
        newEp: req.body.newEp,
        need_suite: req.body.need_suite,
        lastPart: req.body.lastPart
    }
    const post = new Post(data)

    try{
        const savedPost = await post.save();
        res.json(savedPost);
    }catch(err) {
        res.json({message : err});
    }

});


//DELETE ALL ANIME
router.delete('/allanimes', async (req, res) => {
    try{
        const removeAll = await Post.remove()
        res.json(removeAll)
    }catch(err){
        res.json({message: err})
    }
});


//DELETE SPECIFIC ANIME
router.delete('/anime/:postId', async (req, res) => {
    try{
        const removeOne = await Post.remove({_id: req.params.postId})
        res.json(removeOne)
    }catch(err){
        res.json({message: err})
    }
});




module.exports = router