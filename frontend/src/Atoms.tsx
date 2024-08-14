import { atom } from "jotai";

const userAtom = atom('');
const isLoggedInAtom = atom(false)

export {userAtom, isLoggedInAtom}