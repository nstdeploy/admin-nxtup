import { useNavigate} from "react-router-dom"
import { useEffect } from "react"

function Archived() {
    const accessToken = localStorage.getItem('accessToken')
    const navigate = useNavigate()


    useEffect(() => {

        if (!accessToken) {
            navigate('/login')
        }
    }, [])

    const eventData = [
        {
            "title": "NST Hackathon",
            "Start": "01/01/2025 & 12:00 PM",
            "End": "03/01/2025 & 1:00 PM",
            "location": "A-Block",
            "TeamSize": 3,
            "totalRegisterations": 101,
            "Form": "",
            "Winner":"Shreyansh",
            "Description":"NSTNSTNSTNST",
            "Rules":"No rules mast cheat kro"
        }
    ]

    const EventName = [
        "Event Title",
        "Start",
        "End",
        "Description",
        "Rules",
        "Location",
        "TeamSize",
        "Registrations",
        "Winner",
        "Form"
    ]

    return (
        <>
            <div className="text-white">
                <div className="h-16 flex items-center justify-between ml-2">
                    <img src="assets/nXTUP.svg" alt="Logo" className="scale-75" />
                    <div className="flex items-center justify-center scale-50 -mr-14">
                        <img src="assets/nst.svg" alt="NST" />
                        <h1 className="text-3xl font-extrabold ml-5 mr-5 rotate-45">+</h1>
                        <img src="assets/ru.svg" alt="RU" />
                    </div>
                </div>
                <div className="flex items-center justify-center mt-5">
                <div class="relative flex flex-col  w-[98vw] h-full overflow-scroll text-slate-300 bg-slate-800 shadow-md rounded-lg bg-clip-border">
                    <table class="w-full text-left table-auto">
                        <thead>
                            <tr>
                                {
                                    EventName.map((name) => (
                                        <th class="p-4 border-b border-slate-600 bg-slate-700">
                                            <p class="text-sm font-normal leading-none text-slate-300 text-center">
                                                {name}
                                            </p>
                                        </th>
                                    )
                                    )}
                            </tr>
                        </thead>
                        <tbody>{
                            eventData.map((event) => (
                                <tr class="hover:bg-slate-700 ">
                                    <td class="p-4 border-b border-slate-700 bg-slate-900 w-[20%]">
                                        <p class="text-sm text-slate-100 font-semibold ">
                                            {event.title}
                                        </p>
                                    </td>
                                    <td class="p-4 border-b border-slate-700 bg-slate-800 w-[8%]">
                                        <p class="text-sm text-slate-300  text-center">
                                            {event.Start}
                                        </p>
                                    </td>
                                    <td class="p-4 border-b border-slate-700 bg-slate-900 w-[8%]">
                                        <p class="text-sm text-slate-300  text-center">
                                            {event.End}
                                        </p>
                                    </td>
                                    <td class="p-4 border-b border-slate-700 bg-slate-800 w-[20%]">
                                        <p class="text-sm text-slate-300  text-center">
                                            {event.Description}
                                        </p>
                                    </td>
                                    <td class="p-4 border-b border-slate-700 bg-slate-900 w-[20%]">
                                        <p class="text-sm text-slate-300  text-center">
                                            {event.Rules}
                                        </p>
                                    </td>
                                    <td class="p-4 border-b border-slate-700 bg-slate-800 w-[10%]">
                                        <p class="text-sm text-slate-300  text-center">
                                            {event.location}
                                        </p>
                                    </td>
                                    <td class="p-4 border-b border-slate-700 bg-slate-900 w-[6%]">
                                        <p class="text-sm text-slate-300  text-center">
                                            {event.TeamSize}
                                        </p>
                                    </td>
                                    <td class="p-4 border-b border-slate-700 bg-slate-800 w-[6%]">
                                        <p class="text-sm text-slate-300  text-center">
                                            {event.totalRegisterations}
                                        </p>
                                    </td>
                                    <td class="p-4 border-b border-slate-700 bg-slate-900 w-[6%]">
                                        <p class="text-sm text-slate-300  text-center">
                                            {event.Winner}
                                        </p>
                                    </td>
                                    <td class="p-4 border-b border-slate-700 bg-slate-800 w-[6%]">
                                        <p class="text-sm text-slate-300  text-center">
                                            {event.Form}
                                        </p>
                                    </td>
                                </tr>
                            )
                            )}
                        </tbody>
                    </table>
                </div>
                </div>
            </div>
        </>
    )
}

export default Archived