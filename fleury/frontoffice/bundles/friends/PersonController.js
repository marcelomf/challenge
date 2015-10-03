var service = {}, admin = {}, models, controllers, event, config, Person, $i;

service.count = function(req, res) {
  var dataList = controllers.processDataList(Person, req.query);

  Person.count({}, function(err, totality) {
    if(err) {
      res.json(event.newError(err).toJson());
      return;
    } 

    if(dataList.filter == null) {
      res.json({totality: totality, filtered: 0});
      return;
    }

    Person.count(dataList.filter, function(err, filtered) {
      if(err)
        res.json(event.newError(err).toJson());
      else
        res.json({totality: totality, filtered: filtered});
    });
  });
}

service.get = function(req, res) {
    Person.findOne({_id : req.params.id}).populate('tags').exec(function(err, person) {
    if (err)
      res.json(event.newError(err).toJson());
    else
      res.json(person);
  });
}

service.query = function(req, res) {
  var dataList = { page: {}, sort: 'field -_id' };
  if(req.query.filter || req.query.sort || req.query.page)
    dataList = controllers.processDataList(Person, req.query);

  Person.find(dataList.filter || null).
    sort(dataList.sort || null).
    skip(dataList.page.skip || null).
    limit(dataList.page.limit || null).
    populate('person').
    populate('tags').
    exec(function(err, persons) {
      if(err)
        res.json(event.newError(err).toJson());
      else
        res.json(persons);
  });
}

service.validate = function(req, res, next) {
  var person = new Person(req.body);
  person.validate(function(err){
    if(err)
      res.json(event.newError(err).toJson());
    else
      next();
  });
}

service.create = function(req, res) {
  var person = new Person(req.body);
  person.save(function(err, person) {
    if(err)
      res.json(event.newError(err).toJson());
    else
      res.json(event.newSuccess(res.__("Person")+" "+res.__("created")).data(person).toJson());
  });
}

service.create_xml = function(req, res) {

  req.rawBody = '';
  req.setEncoding('utf8');
  req.on('data', function(chunk) { 
   req.rawBody += chunk;
  });

  req.on('end', function() {
    parse = $i.xml2js.parseString;
    parse(req.rawBody, function(err, p){
      var person = new Person(p.root);
      person.save(function(err, person) {
        if(err)
          res.json(event.newError(err).toJson());
        else
          res.json(event.newSuccess(res.__("Person")+" "+res.__("created")).data(person).toJson());
      });
    });
  });
  //return res.json(event.newError("teste...").toJson());
}


service.create = function(req, res) {
  console.log(req.body);
  //return res.json(event.newError("teste...").toJson());

  var person = new Person(req.body);
  person.save(function(err, person) {
    if(err)
      res.json(event.newError(err).toJson());
    else
      res.json(event.newSuccess(res.__("Person")+" "+res.__("created")).data(person).toJson());
  });
}


service.update = function(req, res) {
  delete req.body._id;
  Person.findOneAndUpdate({_id : req.params.id }, req.body, { upsert : true }, function(err, person) {
    if(err)
      res.json(event.newError(err).toJson());
    else
      res.json(event.newSuccess(res.__("Person")+" "+res.__("updated")).data(person).toJson());
  });
}

service.destroy = function(req, res) {  
  Person.remove({_id : req.params.id}, function(err) {
    if(err)
      res.json(event.newError(err).toJson());
    else
      res.json(event.newSuccess(res.__("Destroyed")).toJson());
  });
}

admin.dashboard = function(req, res) {
  var locale = (config.locales.indexOf(req.cookies.locale) >= 0) ? req.cookies.locale : config.defaultLocale;
  res.render('friends/view/person_dashboard', { isAuth: req.isAuthenticated(), locale: locale, user: req.user});
}

var PersonController = function(di) {
  $i = di;
  event = new $i.event.newSuccess('Instance created');
  config = $i.config;
  models = $i.models;
  controllers = $i.controllers;
  Person = models.person; // object/class
  this.service = service;
  this.admin = admin;
};

module.exports = exports = PersonController;
