var express = require('express');
var http = require('http');
var app = express();
var domain = require('domain');
var excel = require('excel4node');
var workbook = new excel.Workbook();

function recursiveGetProperty(obj, lookup, callback) {
    for (property in obj) {
        if (property == lookup) {
            callback(obj[property]);
        } else if (obj[property] instanceof Object) {
            recursiveGetProperty(obj[property], lookup, callback);
        }
    }
}

function getParent(obj){
    
}

// Add Worksheets to the workbook
var worksheet = workbook.addWorksheet('Infraestrutura');

function createExcelFile(response,root){

    // Create a reusable style
//    var style = workbook.createStyle({
//      font: {
 //       color: '#FF0800',
//        size: 12
 //     },
 //     numberFormat: '$#,##0.00; ($#,##0.00); -'
 //   });

// Header
    worksheet.cell(1,1).string('Servidor');
    worksheet.cell(1,2).string('Sistema Operacional');
    worksheet.cell(1,3).string('Flavor');
        
    var lineCount = 2;
    
    for(var obj in root["0"])
    {   
        if (obj.indexOf("mx") == -1) {

            recursiveGetProperty(root["0"][obj], 'so', function(x) {
                worksheet.cell(lineCount,1).string(obj);
                worksheet.cell(lineCount,2).string(x);
            });
            recursiveGetProperty(root["0"][obj], 'perfil_hw', function(z) {
                worksheet.cell(lineCount,3).string(z);
                lineCount++;
            });
            
        }
    }

    // Set value of cell A1 to 100 as a number type styled with paramaters of style
//    worksheet.cell(1,1).number(100).style(style);

    // Set value of cell B1 to 300 as a number type styled with paramaters of style
//    worksheet.cell(1,2).number(200).style(style);

    // Set value of cell C1 to a formula styled with paramaters of style
//    worksheet.cell(1,3).formula('A1 + B1').style(style);

    // Set value of cell A2 to 'string' styled with paramaters of style
//    worksheet.cell(2,1).string('string').style(style);

    // Set value of cell A3 to true as a boolean type styled with paramaters of style but with an adjustment to the font size.
//    worksheet.cell(3,1).bool(true).style(style).style({font: {size: 14}});

    //workbook.write('reqInfra.xlsx', response);
    workbook.write('reqInfra.xlsx');
}

app.post('/api/v1.0/generate', function(req, res) {

    var user_id = req.body.file;
    var token = req.body.id;
    var geo = req.body.geo;
    var root = req.body.mxGraphModel.root;


    var results = {};
    results["found"] = [];

    for(var obj in root["0"])
    {   
        if (obj.indexOf("mx") == -1) {
            var ref = new Array();
            results["found"].push(obj.toString() + " : " + root["0"][obj].length + ", parent: " + getParent(root["0"][obj]));
            
            recursiveGetProperty(root["0"][obj], 'so', function(x) {
                console.log(obj + " : " + x);    
            });
            
        }
            
    }

    createExcelFile(res,root);

    res.send(JSON.stringify(results));
       
});