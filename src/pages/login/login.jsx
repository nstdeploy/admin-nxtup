import { toast } from "react-toastify"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../../components/nav";

function Login() {

    const ForgotPass = () => toast.error("Kindly Contact Your Admin!")
    
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        
      });
    
    
      const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      };

    const sendLoginData = async (e) => {
        e.preventDefault();

        try {
        const response = await fetch("https://9b04-115-244-141-202.ngrok-free.app/login", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        const body = await response.json()
        
        if (response.ok) {
            navigate('/home');
            toast.success("Login Successfull!")
            localStorage.setItem("accessToken",body.token)
            console.log(body.token)
      } else {
            toast.error("There seems to be some error !")
        }
        } catch (error) {
            toast.error("An error occurred while logging you in !");
            console.log(error)
        }
    }

    return(
    <div className="text-white bg-black">
        
        <Nav/>
        <div className="flex items-center justify-center pt-16 pb-12 scale-75">
            <img src="assets/nst.svg" alt="NST"/>
            <h1 className="ml-5 mr-5 text-3xl font-extrabold rotate-45">+</h1>
            <img src="assets/ru.svg" alt="RU"/>
        </div>
        <div className="flex items-center justify-center pb-20">
            <form className="m-10 p-5 bg-zinc-900  w-[575px] flex flex-col items-center justify-center rounded-3xl " onSubmit={sendLoginData}>
                <div className="flex flex-col mt-10 mb-8">
                    <label id="email">Email: </label>
                    <div className="flex">
                        <input 
                            placeholder="Enter your email" 
                            type="text"
                            htmlFor="email"
                            className="h-10 w-[28.125rem] rounded-md text-black p-3 bg-white mt-2"
                            onChange={handleChange}
                            required
                            value={formData.email}
                            name="Email"
                        />
                        
                    </div>
                </div>
                <div className="flex flex-col mb-4">
                    <label id="password">Password: </label>
                    <input
                        placeholder="Enter your password"
                        type="password"
                        htmlFor="password"
                        className="h-10 w-[28.125rem] rounded-md text-black p-3 bg-white mt-2" 
                        onChange={handleChange}
                        required
                        value={formData.pass}
                        name="Password"
                    />
                </div>
                <div className="mb-10 ml-[60%]">
                    <span onClick={ForgotPass} className="duration-300 cursor-pointer hover:underline hover:text-gray-400">Forgot Password?</span>
                </div>
                
                    <button
                        type="submit"
                        className="mb-10 bg-zinc-600 h-[40px] w-[28.125rem] flex items-center justify-center rounded-lg cursor-pointer hover:bg-zinc-700 duration-300 hover:text-gray-300">Submit
                    </button>
                
            </form>
        </div>
    </div>
    )
}

export default Login