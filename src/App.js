import "./App.css";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import login from "./pages/login/login";

function App() {
  return (
      <div className="bg-black">
          <BrowserRouter>
            <Routes>
              <Route path="login" Component={login}/>
              <Route></Route>
              <Route></Route>
            </Routes>
          </BrowserRouter>
      </div>
  );
}

export default App;
