'use strict';

const express = require('express');
const { camelizeKeys, decamelizeKeys } = require('humps');
var knex = require('../knex')
// eslint-disable-next-line new-cap
const router = express.Router();
// YOUR CODE HERE
router.get('/books/',function(req,res,sendit){
  knex('books').orderBy('title','asc')
  .select('id', 'title', 'author', 'genre', 'description', 'cover_url as coverUrl', 'created_at as createdAt', 'updated_at as updatedAt')
  .then((result)=>{res.status(200).send(result)})
  .catch((result)=>{res.sendStatus(400)})
})
// id: 2,
//     title: 'Learning React Native',
//     author: 'Bonnie Eisenman',
//     genre: 'React',
//     description: 'Get a practical introduction to React Native, the JavaScript framework for writing and deploying fully featured mobile apps that look and feel native. With this hands-on guide, you\'ll learn how to build applications that target iOS, Android, and other mobile platforms instead of browsers. You\'ll also discover how to access platform features such as the camera, user location, and local storage.',
//     cover_url: 'https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/287/learning_react_native.jpg',
//     created_at: '2016-06-26T14:26:16.000Z',
//     updated_at: '2016-06-26T14:26:16.000Z' },
router.get('/books/:id', function(req,res,sendit){
  knex('books').where({id: req.params.id}).first()
  .select('id', 'title', 'author', 'genre', 'description', 'cover_url as coverUrl', 'created_at as createdAt', 'updated_at as updatedAt')
  .then((result)=>{
    res.status(200).send(result)})
  .catch((result)=>{res.sendStatus(400)})
})

router.post('/books/', function(req,res,sendit){
  knex('books').insert({
      title: req.body.title,
      author: req.body.author,
      genre: req.body.genre,
      description: req.body.description,
      cover_url: req.body.coverUrl
    }, '*')
   .then((book)=>{
     res.status(200).send({
        id: book[0].id,
        title: book[0].title,
        author: book[0].author,
        genre: book[0].genre,
        description: book[0].description,
        coverUrl: book[0].cover_url}
      )})
   .catch((result)=>{res.sendStatus(400)})
})

router.patch('/books/:id',function(req,res,sendit){
  knex('books').where({id: req.params.id})
  .update({
      title: req.body.title,
      author: req.body.author,
      genre: req.body.genre,
      description: req.body.description,
      cover_url: req.body.coverUrl
    }).returning('*')
  .then((book)=>{
    console.log(book);
    res.status(200).send({
     id: book[0].id,
     title: book[0].title,
     author: book[0].author,
     genre: book[0].genre,
     description: book[0].description,
     coverUrl: book[0].cover_url})})
  .catch((result)=>{res.sendStatus(400)})
})

router.delete('/books/:id',function(req,res,sendit){
  knex('books').where({id: req.params.id}).del().returning('*').first()
  .then((book)=>{
    book=camelizeKeys(book)
    delete book.id
    res.status(200).send(book)})
  .catch((result)=>{
    res.sendStatus(400)
  })
})


module.exports = router;
