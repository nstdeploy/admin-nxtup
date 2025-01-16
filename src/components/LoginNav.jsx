import { useNavigate } from "react-router-dom"

function LoginNav() {
    const navigate = useNavigate()

    const handleClick = () => {
        navigate('/home')
    }

    return (
        <div className="flex items-center justify-between h-16 ml-2">
            <img src="../assets/nXTUP.svg" alt="Logo" className="scale-75 cursor-pointer" onClick={handleClick} />
            <div className="flex items-center justify-center scale-50 -mr-14">
                <img src="../assets/nst.svg" alt="NST" />
                <h1 className="ml-5 mr-5 text-3xl font-extrabold rotate-45">+</h1>
                <img src="../assets/ru.svg" alt="RU" />
            </div>
        </div>
    )
}

export default LoginNav;