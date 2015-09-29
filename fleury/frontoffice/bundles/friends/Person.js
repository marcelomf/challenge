var methods = {}, statics = {}, $i;

var Person = function(di) {
  $i = di;
  $i.schemas.person.mongoose.methods = methods;
  $i.schemas.person.mongoose.statics = statics;
  return $i.mongoose.model("Person", $i.schemas.person.mongoose, "person");
};

module.exports = exports = Person;