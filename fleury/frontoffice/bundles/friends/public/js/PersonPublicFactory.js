graoJS.factory('Person', ['$resource', function($resource) {
  var Person = $resource('/service/person/:id', { id: '@_id' }, {
    update: {
      method: 'PUT'
    },
    validate: {
      method: 'POST',
      url: '/service/person/validate'
    },
    count: {
      method: 'GET',
      url: '/service/person/count'
    }
  });
  return Person;
}]);