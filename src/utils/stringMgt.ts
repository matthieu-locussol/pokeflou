export const decodePokemonName = (hash: string) => {
   return decodeURIComponent(atob(atob(atob(hash))));
};

export const toUpperCaseFirst = (str: string): string => {
   return str.charAt(0).toUpperCase() + str.slice(1);
};
