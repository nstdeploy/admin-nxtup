import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import login from "./pages/login/login";
import addForm from "./pages/add-form/form";

function App() {
  return (
    <div className="bg-black">
      <BrowserRouter>
        <Routes>
          <Route path="login" Component={login} />
          <Route></Route>
          <Route></Route>
          <Route path="addForm" Component={addForm} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
