import { toast } from "react-toastify"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {

    const ForgotPass = () => toast.error("Kindly Contact Your Admin !")
    
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        pass: ""
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
        const response = await fetch("", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            navigate('/home');
            toast.success("Login Successfull!")
            console.log(response.data)
      } else {
            toast.error("There seems to be some error !")
        }
        } catch (error) {
            toast.error("An error occurred while logging you in !");
            console.log(error)
        }
    }

    return(
    <div className="bg-black text-white">
        <div className="h-16 flex items-center justify-start ml-2">
            <img src="assets/nXTUP.svg" alt="Logo" className="scale-75"/>
        </div>

        <div className="flex items-center justify-center scale-80 pt-16 pb-12">
            <img src="assets/nst.svg" alt="NST"/>
            <h1 className="text-3xl font-extrabold ml-5 mr-5 rotate-45">+</h1>
            <img src="assets/ru.svg" alt="RU"/>
        </div>
        <div className="flex items-center justify-center pb-20">
            <form className="m-10 p-5 bg-zinc-900  w-[650px] flex flex-col items-center justify-center rounded-3xl " onSubmit={sendLoginData}>
                <div className="flex flex-col mt-12 mb-8">
                    <label id="email" className="pl-1">Email :</label>
                    <div className="flex">
                        <input 
                            placeholder="Enter your email" 
                            type="text"
                            htmlFor="email"
                            className="h-10 w-[300px] rounded-l-md text-black p-3 bg-white"
                            onChange={handleChange}
                            required
                            value={formData.email}
                            name="email"
                        />
                        <span className="flex items-center bg-white rounded-r-md pr-3 text-gray-600 font-extrabold">@newtonschool.co</span>
                    </div>
                </div>
                <div className="flex flex-col mb-4">
                    <label id="password" className="pl-1">Password: </label>
                    <input
                        placeholder="Enter your password"
                        type="password"
                        htmlFor="password"
                        className="h-10 w-[465px] rounded-md text-black p-3"
                        onChange={handleChange}
                        required
                        value={formData.pass}
                        name="pass"
                    />
                </div>
                <div className="mb-10 ml-[50%]">
                    <span onClick={ForgotPass} className="cursor-pointer">Forgot Password?</span>
                </div>
                <div className="mb-10 mt-5 bg-zinc-600 h-[40px] w-[400px] flex items-center justify-center rounded-xl cursor-pointer">
                    <button
                        type="submit"
                        className="cursor-pointer">Submit
                    </button>
                </div>
            </form>
        </div>
    </div>
    )
}

export default Login