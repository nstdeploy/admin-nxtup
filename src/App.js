import "./App.css";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import login from "./pages/login/login";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer} from "react-toastify";



function App() {
  return (
      <div className="bg-black h-[100vh]">
          <BrowserRouter>
            <Routes>
              <Route path="login" Component={login}/>
              <Route></Route>
              <Route></Route>
            </Routes>
          </BrowserRouter>
          <ToastContainer/>
      </div>
  );
}

export default App;
