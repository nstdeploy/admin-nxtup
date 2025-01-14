import { useNavigate} from "react-router-dom"
import { useEffect } from "react"
import LoginNav from "../../components/LoginNav"

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
                <LoginNav/>
                <div className="flex items-center justify-center mt-5">
                <div class="relative flex flex-col w-[98vw] h-full overflow-scroll text-slate-300 bg-slate-800 shadow-md rounded-lg bg-clip-border mt-6">
                    <table class="w-full text-left table-auto">
                        <thead>
                            <tr>
                                {
                                    EventName.map((name) => (
                                        <th class="p-4 border-b border-zinc-600 bg-zinc-900">
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
                                <tr class="hover:bg-slate-700 text-center">
                                    <td class="p-4 bg-zinc-800 w-[20%]">
                                        <p class="text-slate-100 font-semibold ">
                                            {event.title}
                                        </p>
                                    </td>
                                    {/* Make some changes to the date and time so they look different */}
                                    <td class="p-4 bg-zinc-700 w-[8%]">
                                        <p class="text-xs text-slate-300">
                                            {event.Start}
                                        </p>
                                    </td>
                                    <td class="p-4 bg-zinc-800 w-[8%]">
                                        <p class="text-xs text-slate-300">
                                            {event.End}
                                        </p>
                                    </td>
                                    <td class="p-4 bg-zinc-700 w-[20%]">
                                        <p class="text-sm text-slate-300">
                                            {/* The user should see few parts of the description and can be redirected to the edit page if he wants to edit the description */}
                                            {event.Description}
                                        </p>
                                    </td>
                                    <td class="p-4 bg-zinc-800 w-[20%]">
                                        <p class="text-sm text-slate-300">
                                            {event.Rules} {/* For rules we will provide a PDF or doc or remove rules all together from the dashboard or Provide a hyperlink to edi the rules form here*/}
                                        </p>
                                    </td>
                                    <td class="p-4 bg-zinc-700 w-[10%]">
                                        <p class="text-sm text-slate-300">
                                            {event.location}
                                        </p>
                                    </td>
                                    <td class="p-4 bg-zinc-800 w-[6%]">
                                        <p class="text-sm text-slate-300">
                                            {event.TeamSize}
                                        </p>
                                    </td>
                                    <td class="p-4 bg-zinc-700 w-[6%]">
                                        <p class="text-sm text-slate-300">
                                            {event.totalRegisterations} {/* Typo in the variable name */}
                                        </p>
                                    </td>
                                    <td class="p-4 bg-zinc-800 w-[6%]">
                                        <p class="text-sm text-slate-300">
                                            {event.Winner}
                                        </p>
                                    </td>
                                    <td class="p-4 bg-zinc-700 w-[6%]">
                                        <p class="text-sm text-slate-300">
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