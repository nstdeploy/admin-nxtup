import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


function Home() {
    const accessToken = localStorage.getItem('accessToken')
    const navigate = useNavigate()


    useEffect(() => {

        if (!accessToken) {
            navigate('/login')
        }
    }, [])

    const ButtonArr = [
        { idx: "Add New-Event", send: "addevents" }, { idx: "Manage Event", send: "" }, { idx: "Archived Events", send: "archived" }]

    const LogOut = () => {
        localStorage.removeItem('accessToken')
        toast.success('Logout Successfull!')
        navigate('/login')
    }

    return (
        <div className="text-white">
            <div className="h-16 flex items-center justify-between ml-2">
                <img src="assets/nXTUP.svg" alt="Logo" className="scale-75" />
                <div className="flex items-center justify-center scale-50 -mr-14">
                    <img src="assets/nst.svg" alt="NST" />
                    <h1 className="text-3xl font-extrabold ml-5 mr-5 rotate-45">+</h1>
                    <img src="assets/ru.svg" alt="RU" />
                </div>
            </div>
            <div className="flex justify-end">
                <button className="bg-zinc-500 mr-[150px] h-[40px] w-[100px] rounded-lg mt-5" onClick={LogOut}>Log-out</button>
            </div>
            <div className="flex items-center justify-center mt-[100px]">
                {ButtonArr.map((btn) => (
                    <button className="bg-zinc-700 m-10 h-[200px] w-[250px] flex items-center justify-center rounded-2xl text-2xl" onClick={() => navigate(`/${btn.send}`)}>
                        {btn.idx}
                    </button>
                )
                )}
            </div>
        </div>
    )



}


export default Home;