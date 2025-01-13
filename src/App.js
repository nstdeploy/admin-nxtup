import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import login from "./pages/login/login";
import AddEvents from "./pages/add-events/events";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer} from "react-toastify";
import AddForm from "./pages/add-form/form";
import Home from "./pages/home/home";

function App() {
  return (
    <div className="bg-black min-h-[100vh]">
          <BrowserRouter>
            <Routes>
              <Route path="login" Component={login}/>
              <Route path="/addevents" element={<AddEvents />}/>
              <Route path="addForm" Component={AddForm} />
              <Route path="home" Component={Home}/>
              <Route></Route>
            </Routes>
          </BrowserRouter>
          <ToastContainer/>
      </div>
  );
}

export default App;
