import { useRecoilState } from "recoil";
import { kanbanBoardData } from "./recoil/atoms";

function App() {
  const [data, setData] = useRecoilState(kanbanBoardData);
  return (
    <>
      <div>hello, world</div>
      {data.map((data, index) => (
        <span key={index}>{data}</span>
      ))}
    </>
  );
}

export default App;
