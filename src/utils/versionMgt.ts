import packageInfos from '../../package.json';

export const getVersion = (versionPrefix: string = 'v'): string => {
   const commitSha = process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA;
   const commitShaShort = commitSha !== undefined ? commitSha.slice(0, 7) : null;

   const versionSuffix = commitShaShort !== null ? `-${commitShaShort}` : '';
   const version = `${versionPrefix}${packageInfos.version}${versionSuffix}`;

   return version;
};
