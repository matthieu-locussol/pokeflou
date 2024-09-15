import { describe, expect, it } from 'vitest';
import { wait } from './wait';

describe('wait', () => {
   it('should wait for the specified time', async () => {
      const start = new Date().getTime();
      await wait(1000);
      const end = new Date().getTime();
      expect(end - start).toBeGreaterThanOrEqual(1000);
   });
});
