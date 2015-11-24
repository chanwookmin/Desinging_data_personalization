var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var request = require('request');

// our db model
var Idea = require("../models/idea.js");

// S3 File dependencies
var AWS = require('aws-sdk');
var awsBucketName = process.env.AWS_BUCKET_NAME;
var s3Path = process.env.AWS_S3_PATH; 
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY
});
var s3 = new AWS.S3();

// file processing dependencies
var fs = require('fs');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

// ////test pinterest/////////////////////////////////
// //import
// var pinterestAPI = require('pinterest-api');
// //Create a new object and set the accountname
// var pinterest = pinterestAPI('chanwookmin');
// var boardName = 'light';
// pinterest.getPinsFromBoard(boardName, true, function(pins){
//   console.log(pins);
// });
// ///////////////////////////////////////////////////

/**
 * GET '/'
 * Default home route. Just relays a success message back.
 * @param  {Object} req
 * @return {Object} json
 */


router.get('/', function(req, res) {
  
  var jsonData = {
  	'name': 'idea-tracker',
  	'api-status':'OK'
  }

  // respond with json data
  res.render('main.html')
});

router.get('/add-idea', function(req,res){
  res.render('add.html');
})

router.get('/stats', function(req,res){
  res.render('stats.html');
})

router.get('/ref', function(req,res){
  res.render('ref.html');
})

///////pinterest///////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
router.get('/api/search/pins/:keyword/:index', function(req,res){

  var keyword = req.params.keyword; // whatever you include as :keyword will be the search query
  var pinterestAccessToken = process.env.PINTERST_ACCESS_TOKEN;
  var index = req.params.index;

  var requestedUrl = 'http://api.pinterest.com/v3/search/pins/?join=via_pinner,board,pinner&page_size=50&query='+keyword+'&access_token='+pinterestAccessToken;
  // now, let's make the request

  // var imageObj = {
  //   title: req.body.title,
  //   contents: req.body.contents,
  //   tag: req.body.tag.split(','),
  //   slug: req.body.title.toLowerCase().replace(/[^\w ]+/g,'').replace(/ +/g,'-')
  // }

  request(requestedUrl, function (error, response, body) {
    if(error){
      console.log(error);
      return res.json(error);
    }else{
    // var test = [];
    // for (var i=0; i<res.json(body).data.length; i++){
    //   test.push = res.json(body).data[i].image_medium_url;
    // }
    var returnData = {
      result: body,
      index: index
    }

    return res.json(returnData);
    }
    // return test;
  })  
})
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////

router.get('/edit/:id', function(req, res){
  var requestedId = req.params.id;
  Idea.findById(requestedId,function(err,data){
    if(err){
      var error = {
        status:"ERROR",
        message: err
      }
      return res.json(err)
    }
    console.log(data);

    var viewData = {
      pageTitle: "Edit" + data.title,
      idea: data
    }
    res.render('edit.html',viewData);
  })
})

router.get('/edit/:id', function(req, res){
  var requestedId = req.params.id;
  Idea.findbyId(requestedId, function(err, data){
    if(err){
      var error = {
        status: "ERROR",
        message: err
      }
      return res.json(err)
    }
    var viewData = {
      status:"OK",
      idea: data
    }
    return res.render('edit.html', viewData);
  })
})

router.post('/api/create', function(req, res){
  console.log(req.body);
  var ideaObj = {
    title: req.body.title,
    contents: req.body.contents,
    tag: req.body.tag.split(','),
    slug: req.body.title.toLowerCase().replace(/[^\w ]+/g,'').replace(/ +/g,'-')
  }

  // /////I don't what is the "hasGlasses"/////////////////
  // if(req.body.hasGlasses == 'yes') ideaObj['hasGlasses'] = true;
  // else ideaObj['hasGlasses'] = false;
  // /////I don't what is the "hasGlasses"/////////////////

  var idea = Idea(ideaObj);
  idea.save(function(err,data){
    if(err){
      var error = {
        status: "ERROR",
        message: err
      }
      return res.json(err)
    }
    var jsonData = {
      status: "OK",
      idea: data
    }
    //return res.json(jsonData);
    return res.redirect('/');
  })
})

router.post('/api/edit/:id', function(req,res){
  console.log(req.body);
  var requestedId = req.params.id;

  var ideaObj = {
    title: req.body.title,
    contents: req.body.contents,
    tag: req.body.tag.split(','),
    slug: req.body.title.toLowerCase().replace(/[^\w ]+/g,'').replace(/ +/g,'-')
  }
  console.log(ideaObj);
  Idea.findByIdAndUpdate(requestedId, ideaObj, function(err,data){
    if(err){
      var error={
        status: "ERROR",
        message: err
      }
      return res.json(error)
    }
    var jsonData = {
      status: "OK",
      idea: data
    }
    return res.redirect('/');
  })
})

router.get('/api/get', function(req, res){
  Idea.find(function(err,data){
    if(err){
      var error = {
        status: "ERROR",
        message: err
      }
      return res.json(err)
    }
    var jsonData = {
      status:"OK",
      ideas: data
    }
    return res.json(jsonData);
  })
})


module.exports = router;



// /**
//  * POST '/api/create'
//  * Receives a POST request of the new user and location, saves to db, responds back
//  * @param  {Object} req. An object containing the different attributes of the Person
//  * @return {Object} JSON
//  */

// router.post('/api/create', function(req, res){

//     console.log(req.body);

//     // pull out the information from the req.body
//     var title = req.body.title;
//     var contents = req.body.contents;

//     // hold all this data in an object
//     // this object should be structured the same way as your db model
//     var ideaObj = {
//       title: title,
//       contents: contents,
//     };

//     // create a new animal model instance, passing in the object
//     var idea = new Idea(ideaObj);

//     // now, save that animal instance to the database
//     // mongoose method, see http://mongoosejs.com/docs/api.html#model_Model-save    
//     idea.save(function(err,data){
//       // if err saving, respond back with error
//       if (err){
//         var error = {status:'ERROR', message: 'Error saving idea'};
//         return res.json(error);
//       }

//       console.log('saved a new idea!');
//       console.log(data);

//       // now return the json data of the new animal
//       var jsonData = {
//         status: 'OK',
//         idea: data
//       }

//       return res.json(jsonData);

//     })  
// });

// // /**
// //  * GET '/api/get/:id'
// //  * Receives a GET request specifying the animal to get
// //  * @param  {String} req.param('id'). The animalId
// //  * @return {Object} JSON
// //  */

// router.get('/api/get/:id', function(req, res){

//   var requestedId = req.param('id');

//   // mongoose method, see http://mongoosejs.com/docs/api.html#model_Model.findById
//   idea.findById(requestedId, function(err,data){

//     // if err or no user found, respond with error 
//     if(err || data == null){
//       var error = {status:'ERROR', message: 'Could not find that animal'};
//        return res.json(error);
//     }

//     // otherwise respond with JSON data of the animal
//     var jsonData = {
//       status: 'OK',
//       animal: data
//     }

//     return res.json(jsonData);
  
//   })
// })

// // /**
// //  * GET '/api/get'
// //  * Receives a GET request to get all animal details
// //  * @return {Object} JSON
// //  */

// router.get('/api/get', function(req, res){

//   // mongoose method to find all, see http://mongoosejs.com/docs/api.html#model_Model.find
//   Animal.find(function(err, data){
//     // if err or no animals found, respond with error 
//     if(err || data == null){
//       var error = {status:'ERROR', message: 'Could not find animals'};
//       return res.json(error);
//     }

//     // otherwise, respond with the data 

//     var jsonData = {
//       status: 'OK',
//       animals: data
//     } 

//     res.json(jsonData);

//   })

// })

// // /**
// //  * POST '/api/update/:id'
// //  * Receives a POST request with data of the animal to update, updates db, responds back
// //  * @param  {String} req.param('id'). The animalId to update
// //  * @param  {Object} req. An object containing the different attributes of the Animal
// //  * @return {Object} JSON
// //  */

// router.post('/api/update/:id', function(req, res){

//    var requestedId = req.param('id');

//    var dataToUpdate = {}; // a blank object of data to update

//     // pull out the information from the req.body and add it to the object to update
//     var name, age, weight, color, url; 

//     // we only want to update any field if it actually is contained within the req.body
//     // otherwise, leave it alone.
//     if(req.body.name) {
//       name = req.body.name;
//       // add to object that holds updated data
//       dataToUpdate['name'] = name;
//     }
//     if(req.body.age) {
//       age = req.body.age;
//       // add to object that holds updated data
//       dataToUpdate['age'] = age;
//     }
//     if(req.body.weight) {
//       weight = req.body.weight;
//       // add to object that holds updated data
//       dataToUpdate['description'] = {};
//       dataToUpdate['description']['weight'] = weight;
//     }
//     if(req.body.color) {
//       color = req.body.color;
//       // add to object that holds updated data
//       if(!dataToUpdate['description']) dataToUpdate['description'] = {};
//       dataToUpdate['description']['color'] = color;
//     }
//     if(req.body.url) {
//       url = req.body.url;
//       // add to object that holds updated data
//       dataToUpdate['url'] = url;
//     }

//     var tags = []; // blank array to hold tags
//     if(req.body.tags){
//       tags = req.body.tags.split(","); // split string into array
//       // add to object that holds updated data
//       dataToUpdate['tags'] = tags;
//     }


//     console.log('the data to update is ' + JSON.stringify(dataToUpdate));

//     // now, update that animal
//     // mongoose method findByIdAndUpdate, see http://mongoosejs.com/docs/api.html#model_Model.findByIdAndUpdate  
//     Animal.findByIdAndUpdate(requestedId, dataToUpdate, function(err,data){
//       // if err saving, respond back with error
//       if (err){
//         var error = {status:'ERROR', message: 'Error updating animal'};
//         return res.json(error);
//       }

//       console.log('updated the animal!');
//       console.log(data);

//       // now return the json data of the new person
//       var jsonData = {
//         status: 'OK',
//         animal: data
//       }

//       return res.json(jsonData);

//     })

// })

// /**
//  * GET '/api/delete/:id'
//  * Receives a GET request specifying the animal to delete
//  * @param  {String} req.param('id'). The animalId
//  * @return {Object} JSON
//  */

// router.get('/api/delete/:id', function(req, res){

//   var requestedId = req.param('id');

//   // Mongoose method to remove, http://mongoosejs.com/docs/api.html#model_Model.findByIdAndRemove
//   Animal.findByIdAndRemove(requestedId,function(err, data){
//     if(err || data == null){
//       var error = {status:'ERROR', message: 'Could not find that animal to delete'};
//       return res.json(error);
//     }

//     // otherwise, respond back with success
//     var jsonData = {
//       status: 'OK',
//       message: 'Successfully deleted id ' + requestedId
//     }

//     res.json(jsonData);

//   })

// })

module.exports = router;