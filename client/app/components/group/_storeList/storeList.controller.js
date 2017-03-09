class StoreListController {
  constructor(Store, $state, $document, $mdMedia, CurrentStores, $scope) {
    "ngInject";
    Object.assign(this, {
      Store,
      CurrentStores,
      $scope,
      storeList: CurrentStores.list,
      $state,
      $document,
      $mdMedia,
      showMap: false,
      searchQuery: ""
    });
  }

  $onInit() {
    this.deregister = this.$scope.$on("CurrentStoresChange", () => {
      this.storeList = angular.copy(this.CurrentStores.list);
    });
  }

  $onDestroy() {
    this.deregister();
  }

  $onChanges(changes) {
    if (changes.groupId && angular.isDefined(changes.groupId.currentValue)) {
      this.Store.listByGroupId(changes.groupId.currentValue).then((data) => this.CurrentStores.set(data));
    }
  }

  toggleMap(){
    this.showMap = !this.showMap;
  }
}

export default StoreListController;
