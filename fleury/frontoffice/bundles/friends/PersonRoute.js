var $i;
var PersonRoute = function(di) {
  $i = di;
  $i.graoExpress.get('/service/person/count',
    $i.controllers.passport.service.validateJson, 
  	$i.controllers.person.service.count);
  $i.graoExpress.get('/service/person/:id', 
    $i.controllers.passport.service.validateJson,
  	$i.controllers.person.service.get);
  $i.graoExpress.put('/service/person/:id', 
    $i.controllers.passport.service.validateJson,
  	$i.controllers.person.service.validate, 
    $i.controllers.person.service.update);
  $i.graoExpress.del('/service/person/:id', 
    $i.controllers.passport.service.validateJson,
  	$i.controllers.person.service.destroy);
  $i.graoExpress.get('/service/person', 
    $i.controllers.passport.service.validateJson,
  	$i.controllers.person.service.query);
  $i.graoExpress.post('/service/person/validate', 
    $i.controllers.passport.service.validateJson,
  	$i.controllers.person.service.validate, 
  	function(req, res){ 
  	  res.json($i.event.newSuccess("Successful validation!").toJson()); 
    });
  $i.graoExpress.post('/service/person', 
    $i.controllers.passport.service.validateJson,
  	$i.controllers.person.service.validate, 
  	$i.controllers.person.service.create);
  $i.graoExpress.post('/service/person/xml', 
  	$i.controllers.person.service.create_xml);
  $i.graoExpress.get('/admin/person', 
    $i.controllers.passport.service.validateTpl,
  	$i.controllers.person.admin.dashboard);
  
  var WebSocketServer = $i.ws.Server;
  var http = require('http');
  var server = http.createServer($i.graoExpress);
  server.listen(8080);
  var wss = new WebSocketServer({server: server});
  wss.on('connection', function(ws) {
    var id = setInterval(function() {
      ws.send(JSON.stringify(process.memoryUsage()), function() { }); // ignore errors
    }, 100);

    console.log('started client interval');
    wss.on('close', function() {
      console.log('stopping client interval');
      clearInterval(id);
    });
  });
}
module.exports = exports = PersonRoute;
