var methods = {}, statics = {}, $i;

var Tag = function(di) {
  $i = di;
  $i.schemas.tag.mongoose.methods = methods;
  $i.schemas.tag.mongoose.statics = statics;
  return $i.mongoose.model("Tag", $i.schemas.tag.mongoose, "tag");
};

module.exports = exports = Tag;