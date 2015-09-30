"use strict";

var JSON_DIR = '../jsons';
var fs       = require('fs');
var path     = require('path');
var xml2js   = require('xml2js');
var Inotify  = require('inotify').Inotify;
var inotify  = new Inotify();

var reader = function(err, data) {
  if(err) {
    console.log("Error: "+err);
    return;
  }

  try {
    var json = JSON.parse(data.toString('utf8'));
    console.log(json)
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
