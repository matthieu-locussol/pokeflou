import { makeAutoObservable } from 'mobx';

export class MenuStore {
   public open: boolean = false;

   constructor() {
      makeAutoObservable(this);
   }

   public setOpen(open: boolean) {
      this.open = open;
   }
}
