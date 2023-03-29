var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({
    rota: 'sensores'
  });
});

// concatenar caminho identificador ao sensores
router.get('/identificador/:id', function(req, res, next) {
    res.json({
      identificador: req.params.id,
    });
});

module.exports = router;