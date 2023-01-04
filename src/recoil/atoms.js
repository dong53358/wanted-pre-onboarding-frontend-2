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
  default: [
    {
      id: 1,
      title: "todo",
      items: [
        { id: 1, title: "11" },
        { id: 1, title: "22" },
        { id: 1, title: "33" },
      ],
    },
    {
      id: 2,
      title: "doing",
      items: [
        { id: 4, title: "44" },
        { id: 5, title: "55" },
        { id: 6, title: "66" },
      ],
    },
    {
      id: 3,
      title: "done",
      items: [
        { id: 7, title: "77" },
        { id: 8, title: "88" },
        { id: 9, title: "99" },
      ],
    },
  ],
  effects: [localStorageEffect("data")],
});
