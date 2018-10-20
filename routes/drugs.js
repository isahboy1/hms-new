var express = require('express');
var router = express.Router();

router.post('/submitDrug', function(req, res, next) {
  var sql =
    'insert into drugs(dosage,drug,duration,period,frequency,drug_status,date,id,seen_by) values ?';
  var values = req.body;

  res.locals.connection.query(sql, [values], function(error, results, fields) {
    if (error) throw error;
    res.send(JSON.stringify(results));
  });
});

router.post('/addDrugWithQuantity', function(req, res, next) {
  var user = req.body;
  res.locals.connection.query(
    'insert into drugs(date,drug,price,dosage,id,seen_by,drug_status,quantity) values("' +
      req.body.date +
      '","' +
      req.body.drug +
      '","' +
      req.body.price +
      '","' +
      req.body.dosage +
      '","' +
      req.body.id +
      '", "' +
      req.body.seen_by +
      '", "' +
      req.body.drug_status +
      '","' +
      req.body.quantity +
      '")',
    function(error, results, fields) {
      if (error) throw error;
      res.send(JSON.stringify(results));
    }
  );
});

router.get('/pendingDrugsList', function(req, res, next) {
  res.locals.connection.query(
    'select * from drugs where drug_status="pending" ',
    function(error, results, fields) {
      if (error) throw error;
      res.send(JSON.stringify(results));
    }
  );
});

router.get('/getPrescriptionById', function(req, res, next) {
  res.locals.connection.query(
    'select * from drugs where id="' +
      req.query.id +
      '" and drug_status="pending" ',
    function(error, results, fields) {
      if (error) throw error;
      res.send(JSON.stringify(results));
    }
  );
});

router.get('/allDrugs', function(req, res, next) {
  res.locals.connection.query('select * from drugs', function(
    error,
    results,
    fields
  ) {
    if (error) throw error;
    res.send(JSON.stringify(results));
  });
});

module.exports = router;
