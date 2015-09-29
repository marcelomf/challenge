graoJS.factory('Tag', ['$resource', function($resource) {
  var Tag = $resource('/service/tag/:id', { id: '@_id' }, {
    update: {
      method: 'PUT'
    },
    validate: {
      method: 'POST',
      url: '/service/tag/validate'
    },
    count: {
      method: 'GET',
      url: '/service/tag/count'
    }
  });
  return Tag;
}]);