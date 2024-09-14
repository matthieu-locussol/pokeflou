import { describe, expect, it } from 'vitest';

import { MenuStore } from './MenuStore';

describe('MenuStore', () => {
   it('should be initialized', () => {
      const store = new MenuStore();

      expect(store).toBeDefined();
      expect(store.open).toBe(false);
   });

   it('should set open', () => {
      const store = new MenuStore();

      store.setOpen(true);
      expect(store.open).toBe(true);

      store.setOpen(false);
      expect(store.open).toBe(false);
   });
});
