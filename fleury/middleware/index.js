"use strict";

var JSON_DIR = '../jsons';
var fs       = require('fs');
var path     = require('path');
var xml2js   = require('xml2js');
var Inotify  = require('inotify').Inotify;
var request  = require('request');
var inotify  = new Inotify();

var response = function(error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body)
  }
}

var reader = function(err, data) {
  if(err) {
    console.log("Error: "+err);
    return;
  }

  try {
    var json = JSON.parse(data.toString('utf8'));
    var builder = new xml2js.Builder();
    var xml = builder.buildObject(json);
    console.log(json);
    console.log(xml);
    request.post({url: 'http://localhost:8015/service/person/xml', 
                 body: xml,
                 headers: {'Content-Type': 'text/xml'}
                }, response);
  } catch(err){
    console.log("Error: "+err);
    return;
    //throw err;
  }
}

var monitor = function(event) {
  var mask = event.mask;
  var type = '';

  if(mask & Inotify.IN_ISDIR) return;

  if (mask & Inotify.IN_CLOSE_WRITE) {
    fs.readFile(path.resolve(JSON_DIR, event.name), reader);
  }
}
var dir_watch = {
    path:      JSON_DIR,
    watch_for: Inotify.IN_CLOSE_WRITE,
    callback:  monitor
};

var fd_watch = inotify.addWatch(dir_watch);
