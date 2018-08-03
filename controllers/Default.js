'use strict';

var utils = require('../utils/writer.js');
var Default = require('../service/DefaultService');

module.exports.desenhosGET = function desenhosGET (req, res, next) {
  var descricao = req.swagger.params['descricao'].value;
  Default.desenhosGET(descricao)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.desenhosIdGET = function desenhosIdGET (req, res, next) {
  var id = req.swagger.params['id'].value;
  Default.desenhosIdGET(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.desenhosPOST = function desenhosPOST (req, res, next) {
  var desenho = req.swagger.params['desenho'].value;
  Default.desenhosPOST(desenho)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.exportacoesReqinfraPOST = function exportacoesReqinfraPOST (req, res, next) {
  var xml = req.swagger.params['xml'].value;
  Default.exportacoesReqinfraPOST(xml)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
