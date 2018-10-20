var express = require('express');
var router = express.Router();

router.post('/getLab', function(req, res, next) {
  var user = req.body;
  res.locals.connection.query(
    'insert into lab(date,id,labName,seen_by,status,test_status,sample) values("' +
      req.body.date +
      '","' +
      req.body.id +
      '","' +
      req.body.labName +
      '","' +
      req.body.seen_by +
      '","' +
      req.body.status +
      '","' +
      req.body.test +
      '","' +
      req.body.sample +
      '")',
    function(error, results, fields) {
      if (error) throw error;
      res.send(JSON.stringify(results));
    }
  );
});

router.post('/submitLab', function(req, res, next) {
  var sql = 'insert into lab(test,sample,date,id,seen_by,test_status) values ?';
  var values = req.body;

  res.locals.connection.query(sql, [values], function(error, results, fields) {
    if (error) throw error;
    res.send(JSON.stringify(results));
  });
});

router.get('/pendingRequests', function(req, res, next) {
  res.locals.connection.query(
    'select * from lab where test_status="pending" ',
    function(error, results, fields) {
      if (error) throw error;
      res.send(JSON.stringify(results));
    }
  );
});

router.get('/fetchResult', function(req, res, next) {
  res.locals.connection.query(
    'select * from lab where test_status="pending and id=' +req.query.id+ '" ',
    function(error, results, fields) {
      if (error) throw error;
      res.send(JSON.stringify(results));
    }
  );
});


router.post('/submitResult', function(req, res, next) {
  var user = req.body;
  res.locals.connection.query(
    'INSERT INTO `lab`(`date`, `id`, `test`, `test_status`, `seen_by`, `sample`, `result`, `appearance`, `microscopy`, `culture`, `antibiotic`) VALUES("' +
      req.body.date +
      '","' +
      req.body.id +
      '","' +
      req.body.labName +
      '","' +
      req.body.seen_by +
      '","' +
      req.body.status +
      '","' +
      req.body.test +
      '","' +
      req.body.sample +
      '")',
    function(error, results, fields) {
      if (error) throw error;
      res.send(JSON.stringify(results));
    }
  );
});
router.get('/getReqById', function(req, res, next) {
  res.locals.connection.query(
    'select * from lab where id="' + req.query.id + '" and test_status="pending" ',
    function(error, results, fields) {
      if (error) throw error;
      res.send(JSON.stringify(results));
    }
  );
});

module.exports = router;
