module.exports = exports = {
  injection : {
  	controller: [
      { name: "person", object: "PersonController.js" },
      { name: "tag", object: "TagController.js" },
    ],
    model: [
      { name: "person", object: "Person.js" },
      { name: "tag", object: "Tag.js" },
    ],
    route: [
      { name: "person", object: "PersonRoute.js" },
      { name: "tag", object: "TagRoute.js" },
    ],
    validator: [
      { name: "person", object: "PersonValidator.js" },
      { name: "tag", object: "TagValidator.js" },
    ],
    schema: [
      { name: "person", object: "PersonSchema.js" },
      { name: "tag", object: "TagSchema.js" },
    ],
  },
  publicRoutes : [
    { fsdir: "/bundles/friends/public/css", webdir: "/css/person" },
    { fsdir: "/bundles/friends/public/js", webdir: "/js/person" },
    { fsdir: "/bundles/friends/public/image", webdir: "/image/person" },
    { fsdir: "/bundles/friends/public/font", webdir: "/font/person" },
    { fsdir: "/bundles/friends/public/file", webdir: "/file/person" },

    { fsdir: "/bundles/friends/public/css", webdir: "/css/tag" },
    { fsdir: "/bundles/friends/public/js", webdir: "/js/tag" },
    { fsdir: "/bundles/friends/public/image", webdir: "/image/tag" },
    { fsdir: "/bundles/friends/public/font", webdir: "/font/tag" },
    { fsdir: "/bundles/friends/public/file", webdir: "/file/tag" },

  ]
}