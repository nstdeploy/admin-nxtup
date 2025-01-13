import "./App.css";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import login from "./pages/login/login";
import AddEvents from "./pages/add-events/events"

function App() {
  return (
      <div className="bg-black">
          <BrowserRouter>
            <Routes>
              <Route path="login" Component={login}/>
              <Route path="/addevents" element={<AddEvents/>}></Route>
              <Route ></Route>
            </Routes>
          </BrowserRouter>
      </div>
  );
}

export default App;
