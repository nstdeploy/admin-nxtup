import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import login from "./pages/login/login";
import AddEvents from "./pages/add-events/events";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import AddForm from "./pages/add-form/form";
import Home from "./pages/home/home";
import Archived from "./pages/Archived/ArchivedEvents";
import ManageEvents from "./pages/manage-events/manage-events";

function App() {
  return (
    <div className="bg-black min-h-[100vh]">
          <BrowserRouter>
            <Routes>
              <Route path="/" Component={login}/>
              <Route path="/login" Component={login}/>
              <Route path="/addevents" element={<AddEvents />}/>
              <Route path="addForm" Component={AddForm} />
              <Route path="home" Component={Home}/>
              <Route path="archived" Component={Archived}/> 
              <Route path="events" Component={ManageEvents}/>             
            </Routes>
          </BrowserRouter>
          <ToastContainer  theme="dark"/>
      </div>
  );
}

export default App;
