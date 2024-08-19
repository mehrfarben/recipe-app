import { atom } from 'jotai'

const favoritesAtom = atom<number[]>([]);
const favoriteRecipesAtom = atom<[]>([]);

export { favoritesAtom, favoriteRecipesAtom }