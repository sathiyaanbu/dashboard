// REMEMBER DEEP COPY: deepCopy = Object.assign({}, obj);

var config = require('./config.js');

////////////////////////////////////////////////////////////////////////////////
var express    = require('express');
var app        = express();

var helmet     = require('helmet');
var bodyParser = require('body-parser');
var mongo      = require('mongodb').MongoClient;
var fs         = require('fs');

////////////////////////////////////////////////////////////////////////////////
var onerva = {};
onerva.report = {};

////////////////////////////////////////////////////////////////////////////////
////total Users Count
////////////////////////////////////////////////////////////////////////////////
onerva.report.fetchTotallUserCount = function() {
    
     return function(context) {
    return context.db.collection('users').distinct('email')
              .then (function(result){
                context.totalUserCount = result.length;
              return context;

              
              });
    }
}

////////////////////////////////////////////////////////////////////////////////
onerva.report.fetchUserCount = function(yyyy,mm) {
    var before = new Date(yyyy,(mm-1)+1);
    
    
    return function(context) {
    return context.db.collection('attempts').distinct('email', { 'time': {$lt: before.getTime()}, 'success': true })
              .then(function(result) {
              //console.log(result);
              context.userCount = result.length;
              return context;
              
              });
    }
}


///////////////////////////////////////////////////////////////////////////////
// onerva.report.fetchCaregiverCount = function() {
//     //var before = new Date(yyyy,(mm-1)+1);
    
//     return function(context) {
//     return context.db.collection('entries').find({'type':"visit" })
//               .then(function(result) {
//               //console.log(result);
//               context.oldAgeHomeCount = result.count();
//               return context;
              
//               });
//     }
// }
////////////////////////////////////////////////////////////////////////////////
////
////////////////////////////////////////////////////////////////////////////////

onerva.report.fetchActive_UserCount = function() {
    
    return function(context) {
    return context.db.collection('entries').distinct('user')
              .then(function(result) {
              //console.log(result);
              context.active_UserCount = result.length;
              return context;
              
              });
    }
}

////////////////////////////////////////////////////////////////////////////////
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('public'))

////////////////////////////////////////////////////////////////////////////////
process.on('unhandledRejection', (reason, promise) => {
    console.log(reason);
    console.log(promise);
});

////////////////////////////////////////////////////////////////////////////////
app.get('/', function(req, res) {
    res.send('should not see this, but public/index.html');
});


////////////////////////////////////////////////////////////////////////////////
// READ USER COUNTS
////////////////////////////////////////////////////////////////////////////////
app.get('/api/userCount/:year/:month', function(req, res) {
    var context = {
    db: req.app.locals.db,
    };
    
    var yyyy = parseInt(req.params.year);
    var mm   = parseInt(req.params.month);
    console.log(yyyy + " " + mm);
    
    Promise.resolve(context)
        .then(onerva.report.fetchUserCount(yyyy,mm))
    .then(function(context) {
        let response = { year: yyyy, month: mm, userCount: context.userCount };
        res.json(response);
    })
    .catch(function(error) {
        res.json(onerva.util.errorToJson(error));
    });
});

/////////////////////////////////////////////////////////////////////////////
///////MESSAGES
/////////////////////////////////////////////////////////////////////////////

// app.get('/api/oldAgeHomeCount', function(req, res) {
//     var context = {
//     db: req.app.locals.db,
//     };
    
//    //var count_h = parseInt(req.params.Count_home);
    
//     Promise.resolve(context)
//         .then(onerva.report.fetchOldAgeHomeCount())
//     .then(function(context) {
//         let response = {   oldAgeHomeCount: context.oldAgeHomeCount};
//         res.json(response);
//     })
//     .catch(function(error) {
//         res.json(onerva.util.errorToJson(error));
//     });
// });


////////////////////////////////////////////////////////////////////////////////
app.get('/api/totalUserCount', function(req, res) {
    var context = {
    db: req.app.locals.db,
    };
    
    
    Promise.resolve(context)
        .then(onerva.report.fetchTotallUserCount())
    .then(function(context) {
        let response = {  totalUserCount: context.totalUserCount};
        res.json(response);
    })
    .catch(function(error) {
        res.json(onerva.util.errorToJson(error));
    });

});
//{"totalUserCount":252}
////////////////////////////////////////////////////////////////////////////////
app.get('/api/active_UserCount', function(req, res) {
    var context = {
    db: req.app.locals.db,
    };
    
    
    Promise.resolve(context)
        .then(onerva.report.fetchActive_UserCount())
    .then(function(context) {
        let response = {  active_UserCount: context.active_UserCount };
        res.json(response);
    })
    .catch(function(error) {
        res.json(onerva.util.errorToJson(error));
    });
});

//{"active_UserCount":175}
////////////////////////////////////////////////////////////////////////////////
mongo.connect('mongodb://localhost:27017/' + config.db_name)
     .catch(err => console.error(err.stack))
     .then(db => {
     app.locals.db = db;
     app.listen(config.port, () => {
         console.log(`Listening at http://localhost:${config.port}/`);
     });
     });


