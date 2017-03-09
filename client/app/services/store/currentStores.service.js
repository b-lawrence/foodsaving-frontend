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
      $listeners: []
    });
  }

  set(list) {
    angular.copy(list, this.list);
    this.$notify();
    return this.list;
  }

  setSelected(store) {
    angular.copy(store, this.selected);
    this.$notify();
    return this.selected;
  }

  pushItem(item) {
    this.list.push(item);
    this.$notify();
    return item;
  }

  replaceItem(item) {
    let i = this.list.findIndex((e) => e.id === item.id);
    this.list[i] = item;
    this.$notify();
    return item;
  }

  clear() {
    angular.copy([], this.list);
    this.$notify();
  }

  // listen to data changes

  listen(fn) {
    return this.$listeners.push(fn);
  }

  unlisten(i) {
    this.$listeners[i - 1] = null;
  }

  $notify() {
    angular.forEach(this.$listeners, (fn) => {
      if (fn) fn();
    });
  }

}
