var service = {}, admin = {}, models, controllers, event, config, Tag, $i;

service.count = function(req, res) {
  var dataList = controllers.processDataList(Tag, req.query);

  Tag.count({}, function(err, totality) {
    if(err) {
      res.json(event.newError(err).toJson());
      return;
    } 

    if(dataList.filter == null) {
      res.json({totality: totality, filtered: 0});
      return;
    }

    Tag.count(dataList.filter, function(err, filtered) {
      if(err)
        res.json(event.newError(err).toJson());
      else
        res.json({totality: totality, filtered: filtered});
    });
  });
}

service.get = function(req, res) {
    Tag.findOne({_id : req.params.id}).populate('subtags').exec(function(err, tag) {
    if (err)
      res.json(event.newError(err).toJson());
    else
      res.json(tag);
  });
}

service.query = function(req, res) {
  var dataList = { page: {}, sort: 'field -_id' };
  if(req.query.filter || req.query.sort || req.query.page)
    dataList = controllers.processDataList(Tag, req.query);

  Tag.find(dataList.filter || null).
    sort(dataList.sort || null).
    skip(dataList.page.skip || null).
    limit(dataList.page.limit || null).
    populate('tag').
    populate('subtags').
    exec(function(err, tags) {
      if(err)
        res.json(event.newError(err).toJson());
      else
        res.json(tags);
  });
}

service.validate = function(req, res, next) {
  var tag = new Tag(req.body);
  tag.validate(function(err){
    if(err)
      res.json(event.newError(err).toJson());
    else
      next();
  });
}

service.create = function(req, res) {
  var tag = new Tag(req.body);
  tag.save(function(err, tag) {
    if(err)
      res.json(event.newError(err).toJson());
    else
      res.json(event.newSuccess(res.__("Tag")+" "+res.__("created")).data(tag).toJson());
  });
}

service.update = function(req, res) {
  delete req.body._id;
  Tag.findOneAndUpdate({_id : req.params.id }, req.body, { upsert : true }, function(err, tag) {
    if(err)
      res.json(event.newError(err).toJson());
    else
      res.json(event.newSuccess(res.__("Tag")+" "+res.__("updated")).data(tag).toJson());
  });
}

service.destroy = function(req, res) {  
  Tag.remove({_id : req.params.id}, function(err) {
    if(err)
      res.json(event.newError(err).toJson());
    else
      res.json(event.newSuccess(res.__("Destroyed")).toJson());
  });
}

admin.dashboard = function(req, res) {
  var locale = (config.locales.indexOf(req.cookies.locale) >= 0) ? req.cookies.locale : config.defaultLocale;
  res.render('friends/view/tag_dashboard', { isAuth: req.isAuthenticated(), locale: locale, user: req.user});
}

var TagController = function(di) {
  $i = di;
  event = new $i.event.newSuccess('Instance created');
  config = $i.config;
  models = $i.models;
  controllers = $i.controllers;
  Tag = models.tag; // object/class
  this.service = service;
  this.admin = admin;
};

module.exports = exports = TagController;