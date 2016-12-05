(function() {
  'use strict';

  angular.module('NarrowItDownApp',[])
  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService', MenuSearchService)
  .constant('ApiBasePath', "http://davids-restaurant.herokuapp.com");
  // .directive('foundItems',FoundItems);
  //
  // founction FoundItems(){
  //   var ddo = {
  //     scope: {
  //     items: '<'
  //   },
  //   controller: NarrowItDownController,
  //   controllerAs: 'ctrl',
  //
  //   };
  //
  //   return ddo;
  //
  // };

  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService) {
    var ctrl = this;

    ctrl.searchItems = function(searchTerm) {
      var promise = MenuSearchService.getMatchedMenuItems(searchTerm);
      promise.then(function (response) {
        console.log("found");
        ctrl.found = response;
      })
      .catch(function (error) {
        console.log(error);
      })
    };


  }
  //end Controller NarrowItDownController

  MenuSearchService.$inject = ['$http', 'ApiBasePath'];
  function MenuSearchService($http, ApiBasePath) {
    var service = this;

    service.getMatchedMenuItems = function (searchTerm) {
      //console.log("searchTerm"+searchTerm);
      return $http({method: "GET",url: (ApiBasePath + "/menu_items.json")}
      ).then(function (result) {

        var foundItems = new Array();
        for ( var i = 0 ; i <  result.data.menu_items.length ; i++){
          result.data.menu_items[i].description
          if ( result.data.menu_items[i].description.indexOf(searchTerm) !== -1) {
          //  console.log("found" + searchTerm );
            foundItems.push(result.data.menu_items[i])
          }
        }
        // process result and only keep items that match
        //console.log("foundItemsArray: ");
        //console.log(foundItems);
        // return processed items
        return foundItems;
      });
    };
    // end

  }
  //end service MenuSearchService

})();
