import Table from "./components/Table";
import { Toaster } from "react-hot-toast";
import "./App.css";

function App() {
  return (
    <div className="container mx-auto px-4">
      <h1 className=" text-2xl my-5">Reward Wheel</h1>
      <Toaster position="top-center" reverseOrder={false} />
      <Table />
    </div>
  );
}

export default App;
