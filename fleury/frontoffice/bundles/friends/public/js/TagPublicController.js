
function TagPublicController($scope, $http, $q, share, Tag) {
  $scope.share = share;
  $scope.notFilter = true;
  $scope.dataList = new DataList();
  $scope.tag = $scope.tag || (share.getRefObject("tag") != null) ? share.getRefObject("tag") : {};
  $scope.errors = {};
  $scope.errors.tag = {};

  $scope.$watch("dataList", function(newDataList, oldDataList) {
    if(oldDataList.page.current != newDataList.page.current || 
      oldDataList.page.limit != newDataList.page.limit) {
      newDataList.page.skip = newDataList.page.current * newDataList.page.limit - newDataList.page.limit;
      $scope.queryTag();
    }
  }, true);

  $scope.createOrUpdateTag = function(windowCallBack, isRefered) {
    share.alertLoad();
    function finallySaved(dataResponse, windowCallBack, isRefered) {
      if(!isRefered) {
        $scope.queryTag("all");
        $scope.countTag(); 
        $scope.clearTag();
      } else {
        if(dataResponse.data && dataResponse.data._id)
          share.refAddObject("tag", dataResponse.data);
      }
      if(windowCallBack)
        share.window(windowCallBack); 
      else
        share.windowBack();
    }

    function save() {
      var tagJson = $scope.tag;
      if($scope.tag._id != null)
        Tag.update(tagJson, function(dataResponse){ 
          if(validate(share.alert, $scope.errors.tag, dataResponse))
            finallySaved(dataResponse, windowCallBack, isRefered);
        });
      else
        Tag.save(tagJson, function(dataResponse){ 
          if(validate(share.alert, $scope.errors.tag, dataResponse))
            finallySaved(dataResponse, windowCallBack, isRefered);
        });
    } 
    save();
  }

  $scope.destroyTagByIndex = function(index) {
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
    $scope.queryTag("all");
  }

  $scope.queryTag = function(queryMode) {
    share.alertLoad();
    if(queryMode === "reset")
      $scope.dataList.reset();

    if(queryMode === "all") {
      Tag.query(null, function(dataResponse){ 
        $scope.tags = dataResponse;
        $scope.dataList.data = dataResponse.slice(0, 10);
        $scope.dataList.status.listing = $scope.dataList.data.length;
        share.alertClean();
      });
    } else {
      Tag.query($scope.dataList.toParams(), function(dataResponse){ 
        $scope.dataList.data = dataResponse;
        $scope.dataList.status.listing = $scope.dataList.data.length;
        share.alertClean();
      });
    }

  }
  $scope.queryTag("all");

  $scope.countTag = function() {
    Tag.count($scope.dataList.toParams(), function(dataResponse){
      $scope.dataList.status = dataResponse;
      $scope.dataList.status.listing = $scope.dataList.data.length;
    });
  }
  $scope.countTag();

  $scope.queryMoreTag = function() {
    share.alertLoad();
    $scope.dataList.page.skip = $scope.dataList.data.length;
    Tag.query($scope.dataList.toParams(), function(dataResponse){
      angular.forEach(dataResponse, function(data){
        $scope.dataList.data.push(data);
        $scope.dataList.status.listing++;
      });
      share.alertClean();
    });
  }

  $scope.selectTag = function(index) {
    $scope.tag = $scope.dataList.data[index];

      var subtagsIds = new Array();
      angular.forEach($scope.tag.subtags, function(tag){
        subtagsIds.push(tag._id);
      });
      $scope.tag._subtags = angular.copy($scope.tag.subtags);
      $scope.tag.subtags = subtagsIds;

  }

  $scope.clearTag = function() {
    delete $scope.tag;
    $scope.tag = {};
    $scope.errors = {};
    $scope.errors.tag = {};

  }

}

