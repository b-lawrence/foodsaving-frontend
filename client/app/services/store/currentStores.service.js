/**
  Stores an object of stores (e.g. in the current group)

  Uses `angular.copy()` so you can bind the list to your
  controller and it will keep updated. e.g.:

    `this.storeList = CurrentStores.list`

*/
export default class CurrentStores {

  constructor() {
    Object.assign(this, {
      list: [],
      selected: {},
      version: { val: 0 }
    });
  }

  set(list) {
    angular.copy(list, this.list);
    this.$fire();
    return this.list;
  }

  setSelected(store) {
    angular.copy(store, this.selected);
    this.$fire();
    return this.selected;
  }

  pushItem(item) {
    this.list.push(item);
    this.$fire();
    return item;
  }

  replaceItem(item) {
    let i = this.list.findIndex((e) => e.id === item.id);
    this.list[i] = item;
    this.$fire();
    return item;
  }

  clear() {
    angular.copy([], this.list);
    this.$fire();
  }

  // notify users of change
  $fire() {
    this.version.val++;
  }

}
