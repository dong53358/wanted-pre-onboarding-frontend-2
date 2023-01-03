import { atom } from "recoil";

const localStorageEffect =
  (key) =>
  ({ setSelf, onSet }) => {
    const savedValue = localStorage.getItem(key);
    // setSelf -> Callbacks to set or reset the value of the atom.
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }
    // setSelf -> Callbacks to set or reset the value of the atom.
    onSet((newValue, _, isReset) => {
      isReset
        ? localStorage.removeItem(key)
        : localStorage.setItem(key, JSON.stringify(newValue));
    });
  };

export const kanbanBoardData = atom({
  key: "data",
  default: [],
  effects: [localStorageEffect("data")],
});
