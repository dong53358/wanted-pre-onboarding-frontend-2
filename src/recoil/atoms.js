import { atom } from "recoil";

export const kanbanBoardData = atom({
  key: "data",
  default: ["1", "2", "3"],
});
