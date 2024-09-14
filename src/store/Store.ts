import { makeAutoObservable } from 'mobx';

import { MenuStore } from './MenuStore';

export class Store {
   public menuStore: MenuStore;

   constructor() {
      makeAutoObservable(this);

      this.menuStore = new MenuStore();
   }
}
