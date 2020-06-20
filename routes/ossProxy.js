const http = require("http");
const express = require("express");
// const fs = require('fs')
// const path = require('path')
const router = express.Router();

router.get("/ossProxy", (req, res) => {
  const url = req.query.url;
  http.get(url,httpRes=>{
    let data= ''
    httpRes.on('data',buf=>{
        data += buf
        
    })
    httpRes.on('end',()=>{
        res.status(200).send(data.toString())
    })
  })
});

module.exports = router