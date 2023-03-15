var express = require('express');
var router = express.Router();
var axios = require('axios');

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

router.get('/acedeHPeixoto/:id', function(req, res, next) {
    axios.get(
        'http://nosql.hpeixoto.me/api/sensor/' + req.params.id
    )
    .then(response => {
        res.json(response.data)
    })
    .catch(err => {
        res.json(err)
    })
});

module.exports = router;