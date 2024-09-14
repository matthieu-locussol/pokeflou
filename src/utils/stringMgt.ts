export const decodePokemonName = (hash: string) => {
   return decodeURIComponent(atob(atob(atob(hash))));
};
