import { toast } from "react-toastify"

function login() {

    const ForgotPass = () => toast.error("Kindly Contact Your Admin !")

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
            <form className="m-10 p-5 bg-zinc-900  w-[650px] flex flex-col items-center justify-center rounded-3xl ">
                <div className="flex flex-col mt-12 mb-8">
                    <label id="email" className="pl-1">Email :</label>
                    <div className="flex">
                        <input 
                            placeholder="Enter your email" 
                            type="text"
                            htmlFor="email"
                            className="h-10 w-[300px] rounded-l-md text-black p-3 bg-white"
                        />
                        <span className="flex items-center bg-white rounded-r-md pr-3 text-gray-600 font-extrabold">@newtonschool.com</span>
                    </div>
                </div>
                <div className="flex flex-col mb-4">
                    <label id="password" className="pl-1">Password: </label>
                    <input
                        placeholder="Enter you password"
                        type="password"
                        htmlFor="password"
                        className="h-10 w-[477px] rounded-md text-black p-3"
                    />
                </div>
                <div className="mb-16 ml-[50%]">
                    <span onClick={ForgotPass} className="cursor-pointer">Forgot Password?</span>
                </div>
            </form>
        </div>
    </div>
    )
}

export default login