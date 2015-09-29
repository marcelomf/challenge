
function PersonPublicController($scope, $http, $q, share, Person, Tag) {
  $scope.share = share;
  $scope.notFilter = true;
  $scope.dataList = new DataList();
  $scope.person = $scope.person || (share.getRefObject("person") != null) ? share.getRefObject("person") : {};
  $scope.errors = {};
  $scope.errors.person = {};

  $scope.person.emails = $scope.person.emails || new Array();
  $scope.errors.person.emails = {};
  $scope.person.phones = $scope.person.phones || new Array();
  $scope.errors.person.phones = {};
  $scope.person.address = $scope.person.address || new Array();
  $scope.errors.person.address = {};
  $scope.person.urls = $scope.person.urls || new Array();
  $scope.errors.person.urls = {};
  $scope.person.individual = $scope.person.individual || {};
  $scope.errors.person.individual = {};
  $scope.person.individual.relationships = $scope.person.individual.relationships || new Array();
  $scope.errors.person.individual.relationships = {};
  $scope.person.legal_entity = $scope.person.legal_entity || {};
  $scope.errors.person.legal_entity = {};
  $scope.person.legal_entity.relationships = $scope.person.legal_entity.relationships || new Array();
  $scope.errors.person.legal_entity.relationships = {};

  $scope.$watch("dataList", function(newDataList, oldDataList) {
    if(oldDataList.page.current != newDataList.page.current || 
      oldDataList.page.limit != newDataList.page.limit) {
      newDataList.page.skip = newDataList.page.current * newDataList.page.limit - newDataList.page.limit;
      $scope.queryPerson();
    }
  }, true);

  $scope.createOrUpdatePerson = function(windowCallBack, isRefered) {
    share.alertLoad();
    function finallySaved(dataResponse, windowCallBack, isRefered) {
      if(!isRefered) {
        $scope.queryPerson("all");
        $scope.countPerson(); 
        $scope.clearPerson();
      } else {
        if(dataResponse.data && dataResponse.data._id)
          share.refAddObject("person", dataResponse.data);
      }
      if(windowCallBack)
        share.window(windowCallBack); 
      else
        share.windowBack();
    }

    function save() {
      var personJson = $scope.person;
      if($scope.person._id != null)
        Person.update(personJson, function(dataResponse){ 
          if(validate(share.alert, $scope.errors.person, dataResponse))
            finallySaved(dataResponse, windowCallBack, isRefered);
        });
      else
        Person.save(personJson, function(dataResponse){ 
          if(validate(share.alert, $scope.errors.person, dataResponse))
            finallySaved(dataResponse, windowCallBack, isRefered);
        });
    } 
    save();
  }

  $scope.destroyPersonByIndex = function(index) {
    share.alertLoad();
    $scope.dataList.data[index].$delete(function(dataResponse){
      share.alert.show = true;
      share.alert.style = dataResponse.event.style;
      share.alert.message = dataResponse.event.message;
      if(dataResponse.event.status == true) {
        $scope.dataList.status.totality = $scope.dataList.status.totality-1;
        $scope.dataList.status.listing = $scope.dataList.data.length;
      }
    });
    $scope.dataList.data.splice(index, 1);
    $scope.queryPerson("all");
  }

  $scope.queryPerson = function(queryMode) {
    share.alertLoad();
    if(queryMode === "reset")
      $scope.dataList.reset();

    if(queryMode === "all") {
      Person.query(null, function(dataResponse){ 
        $scope.persons = dataResponse;
        $scope.dataList.data = dataResponse.slice(0, 10);
        $scope.dataList.status.listing = $scope.dataList.data.length;
        share.alertClean();
      });
    } else {
      Person.query($scope.dataList.toParams(), function(dataResponse){ 
        $scope.dataList.data = dataResponse;
        $scope.dataList.status.listing = $scope.dataList.data.length;
        share.alertClean();
      });
    }

  }
  $scope.queryPerson("all");

  $scope.countPerson = function() {
    Person.count($scope.dataList.toParams(), function(dataResponse){
      $scope.dataList.status = dataResponse;
      $scope.dataList.status.listing = $scope.dataList.data.length;
    });
  }
  $scope.countPerson();

  $scope.queryMorePerson = function() {
    share.alertLoad();
    $scope.dataList.page.skip = $scope.dataList.data.length;
    Person.query($scope.dataList.toParams(), function(dataResponse){
      angular.forEach(dataResponse, function(data){
        $scope.dataList.data.push(data);
        $scope.dataList.status.listing++;
      });
      share.alertClean();
    });
  }

  $scope.selectPerson = function(index) {
    $scope.person = $scope.dataList.data[index];

      var tagsIds = new Array();
      angular.forEach($scope.person.tags, function(tag){
        tagsIds.push(tag._id);
      });
      $scope.person._tags = angular.copy($scope.person.tags);
      $scope.person.tags = tagsIds;

  }

  $scope.clearPerson = function() {
    delete $scope.person;
    $scope.person = {};
    $scope.errors = {};
    $scope.errors.person = {};

  $scope.person.emails = $scope.person.emails || new Array();
  $scope.errors.person.emails = {};
  $scope.person.phones = $scope.person.phones || new Array();
  $scope.errors.person.phones = {};
  $scope.person.address = $scope.person.address || new Array();
  $scope.errors.person.address = {};
  $scope.person.urls = $scope.person.urls || new Array();
  $scope.errors.person.urls = {};
  $scope.person.individual = $scope.person.individual || {};
  $scope.errors.person.individual = {};
  $scope.person.individual.relationships = $scope.person.individual.relationships || new Array();
  $scope.errors.person.individual.relationships = {};
  $scope.person.legal_entity = $scope.person.legal_entity || {};
  $scope.errors.person.legal_entity = {};
  $scope.person.legal_entity.relationships = $scope.person.legal_entity.relationships || new Array();
  $scope.errors.person.legal_entity.relationships = {};

    $scope.clearEmails();
    $scope.clearPhones();
    $scope.clearAddress();
    $scope.clearUrls();
    $scope.clearIndividualRelationships();
    $scope.clearLegal_entityRelationships();
  }
  $scope.queryTag = function(){
    $scope.tags = Tag.query();
  };
  $scope.queryTag();

  $scope.newEmails = $scope.newEmails || (share.getRefObject('newEmails') != null) ? share.getRefObject('newEmails') : {};
  $scope.newEmailsMode = 'create';
  $scope.createOrUpdateEmails = function(){
    if(!($scope.person.emails instanceof Array))
      $scope.person.emails = new Array();
    if($scope.newEmailsMode == 'create')
      $scope.person.emails.push($scope.newEmails);
    $scope.clearEmails();
  }

  $scope.clearEmails = function() {
    delete $scope.newEmails;
    $scope.newEmails = {};
    $scope.newEmailsMode = 'create';
  }

  $scope.selectEmails = function(index) {
    if($scope.person.emails == null || !$scope.person.emails[index])
      return share.alertDanger('Emails not found!');
    $scope.newEmails = $scope.person.emails[index];
    $scope.newEmailsMode = 'update';
  }

  $scope.destroyEmailsByIndex = function(index) {
    if($scope.person.emails == null || !$scope.person.emails[index])
      return share.alertDanger('Emails not found!');
    $scope.person.emails.splice(index, 1);
  }

  $scope.newPhones = $scope.newPhones || (share.getRefObject('newPhones') != null) ? share.getRefObject('newPhones') : {};
  $scope.newPhonesMode = 'create';
  $scope.createOrUpdatePhones = function(){
    if(!($scope.person.phones instanceof Array))
      $scope.person.phones = new Array();
    if($scope.newPhonesMode == 'create')
      $scope.person.phones.push($scope.newPhones);
    $scope.clearPhones();
  }

  $scope.clearPhones = function() {
    delete $scope.newPhones;
    $scope.newPhones = {};
    $scope.newPhonesMode = 'create';
  }

  $scope.selectPhones = function(index) {
    if($scope.person.phones == null || !$scope.person.phones[index])
      return share.alertDanger('Phones not found!');
    $scope.newPhones = $scope.person.phones[index];
    $scope.newPhonesMode = 'update';
  }

  $scope.destroyPhonesByIndex = function(index) {
    if($scope.person.phones == null || !$scope.person.phones[index])
      return share.alertDanger('Phones not found!');
    $scope.person.phones.splice(index, 1);
  }

  $scope.newAddress = $scope.newAddress || (share.getRefObject('newAddress') != null) ? share.getRefObject('newAddress') : {};
  $scope.newAddressMode = 'create';
  $scope.createOrUpdateAddress = function(){
    if(!($scope.person.address instanceof Array))
      $scope.person.address = new Array();
    if($scope.newAddressMode == 'create')
      $scope.person.address.push($scope.newAddress);
    $scope.clearAddress();
  }

  $scope.clearAddress = function() {
    delete $scope.newAddress;
    $scope.newAddress = {};
    $scope.newAddressMode = 'create';
  }

  $scope.selectAddress = function(index) {
    if($scope.person.address == null || !$scope.person.address[index])
      return share.alertDanger('Address not found!');
    $scope.newAddress = $scope.person.address[index];
    $scope.newAddressMode = 'update';
  }

  $scope.destroyAddressByIndex = function(index) {
    if($scope.person.address == null || !$scope.person.address[index])
      return share.alertDanger('Address not found!');
    $scope.person.address.splice(index, 1);
  }

  $scope.newUrls = $scope.newUrls || (share.getRefObject('newUrls') != null) ? share.getRefObject('newUrls') : {};
  $scope.newUrlsMode = 'create';
  $scope.createOrUpdateUrls = function(){
    if(!($scope.person.urls instanceof Array))
      $scope.person.urls = new Array();
    if($scope.newUrlsMode == 'create')
      $scope.person.urls.push($scope.newUrls);
    $scope.clearUrls();
  }

  $scope.clearUrls = function() {
    delete $scope.newUrls;
    $scope.newUrls = {};
    $scope.newUrlsMode = 'create';
  }

  $scope.selectUrls = function(index) {
    if($scope.person.urls == null || !$scope.person.urls[index])
      return share.alertDanger('Urls not found!');
    $scope.newUrls = $scope.person.urls[index];
    $scope.newUrlsMode = 'update';
  }

  $scope.destroyUrlsByIndex = function(index) {
    if($scope.person.urls == null || !$scope.person.urls[index])
      return share.alertDanger('Urls not found!');
    $scope.person.urls.splice(index, 1);
  }

  $scope.newIndividualRelationships = $scope.newIndividualRelationships || (share.getRefObject('newIndividualRelationships') != null) ? share.getRefObject('newIndividualRelationships') : {};
  $scope.newIndividualRelationshipsMode = 'create';
  $scope.createOrUpdateIndividualRelationships = function(){
    if(!($scope.person.individual.relationships instanceof Array))
      $scope.person.individual.relationships = new Array();
    if($scope.newIndividualRelationshipsMode == 'create')
      $scope.person.individual.relationships.push($scope.newIndividualRelationships);
    $scope.clearIndividualRelationships();
  }

  $scope.clearIndividualRelationships = function() {
    delete $scope.newIndividualRelationships;
    $scope.newIndividualRelationships = {};
    $scope.newIndividualRelationshipsMode = 'create';
  }

  $scope.selectIndividualRelationships = function(index) {
    if($scope.person.individual.relationships == null || !$scope.person.individual.relationships[index])
      return share.alertDanger('IndividualRelationships not found!');
    $scope.newIndividualRelationships = $scope.person.individual.relationships[index];
    $scope.newIndividualRelationshipsMode = 'update';
  }

  $scope.destroyIndividualRelationshipsByIndex = function(index) {
    if($scope.person.individual.relationships == null || !$scope.person.individual.relationships[index])
      return share.alertDanger('IndividualRelationships not found!');
    $scope.person.individual.relationships.splice(index, 1);
  }

  $scope.newLegal_entityRelationships = $scope.newLegal_entityRelationships || (share.getRefObject('newLegal_entityRelationships') != null) ? share.getRefObject('newLegal_entityRelationships') : {};
  $scope.newLegal_entityRelationshipsMode = 'create';
  $scope.createOrUpdateLegal_entityRelationships = function(){
    if(!($scope.person.legal_entity.relationships instanceof Array))
      $scope.person.legal_entity.relationships = new Array();
    if($scope.newLegal_entityRelationshipsMode == 'create')
      $scope.person.legal_entity.relationships.push($scope.newLegal_entityRelationships);
    $scope.clearLegal_entityRelationships();
  }

  $scope.clearLegal_entityRelationships = function() {
    delete $scope.newLegal_entityRelationships;
    $scope.newLegal_entityRelationships = {};
    $scope.newLegal_entityRelationshipsMode = 'create';
  }

  $scope.selectLegal_entityRelationships = function(index) {
    if($scope.person.legal_entity.relationships == null || !$scope.person.legal_entity.relationships[index])
      return share.alertDanger('Legal_entityRelationships not found!');
    $scope.newLegal_entityRelationships = $scope.person.legal_entity.relationships[index];
    $scope.newLegal_entityRelationshipsMode = 'update';
  }

  $scope.destroyLegal_entityRelationshipsByIndex = function(index) {
    if($scope.person.legal_entity.relationships == null || !$scope.person.legal_entity.relationships[index])
      return share.alertDanger('Legal_entityRelationships not found!');
    $scope.person.legal_entity.relationships.splice(index, 1);
  }

}

