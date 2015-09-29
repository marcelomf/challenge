var $i;
var TagRoute = function(di) {
  $i = di;
  $i.graoExpress.get('/service/tag/count',
    $i.controllers.passport.service.validateJson, 
  	$i.controllers.tag.service.count);
  $i.graoExpress.get('/service/tag/:id', 
    $i.controllers.passport.service.validateJson,
  	$i.controllers.tag.service.get);
  $i.graoExpress.put('/service/tag/:id', 
    $i.controllers.passport.service.validateJson,
  	$i.controllers.tag.service.validate, 
    $i.controllers.tag.service.update);
  $i.graoExpress.del('/service/tag/:id', 
    $i.controllers.passport.service.validateJson,
  	$i.controllers.tag.service.destroy);
  $i.graoExpress.get('/service/tag', 
    $i.controllers.passport.service.validateJson,
  	$i.controllers.tag.service.query);
  $i.graoExpress.post('/service/tag/validate', 
    $i.controllers.passport.service.validateJson,
  	$i.controllers.tag.service.validate, 
  	function(req, res){ 
  	  res.json($i.event.newSuccess("Successful validation!").toJson()); 
    });
  $i.graoExpress.post('/service/tag', 
    $i.controllers.passport.service.validateJson,
  	$i.controllers.tag.service.validate, 
  	$i.controllers.tag.service.create);
  $i.graoExpress.get('/admin/tag', 
    $i.controllers.passport.service.validateTpl,
  	$i.controllers.tag.admin.dashboard);
};

module.exports = exports = TagRoute;