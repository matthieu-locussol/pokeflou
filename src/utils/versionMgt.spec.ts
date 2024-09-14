import { describe, expect, it, vi } from 'vitest';

import { getVersion } from './versionMgt';

const VERSION_REGEX = /^(\d+\.)?(\d+\.)?(\d+)(-\w+)?$/;
const VERSION_REGEX_WITH_PREFIX = /^(Build v)(\d+\.)?(\d+\.)?(\d+)(-\w+)?$/;

describe('versionMgt', () => {
   describe('getVersion', () => {
      it('should only return the version when commit sha is not provided', () => {
         expect(getVersion('')).toMatch(VERSION_REGEX);
      });

      it('should return the version with the commit sha when provided', () => {
         vi.stubEnv('NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA', 'b6e630');
         expect(getVersion('')).toMatch(VERSION_REGEX);
      });

      it('should return the version with the prefix provided', () => {
         vi.stubEnv('NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA', 'b6e630');
         expect(getVersion('Build v')).toMatch(VERSION_REGEX_WITH_PREFIX);
      });
   });
});
