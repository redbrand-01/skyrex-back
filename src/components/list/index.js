export const Listuser = ({ users, active }) => {
    const usersRev = []

    const ActiveUser = (data) => {
        
    }

    for(let i = 0; i < users.length; i ++) {
        usersRev.push(users[users.length - i - 1])
    }

    return (
        <div className="-my-2 overflow-x-hidden">
            <div className="py-2 align-middle inline-block min-w-full px-1">
                <div className="border-b border-gray-200 rounded-lg" style={{boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.15)"}} >
                    <table className="min-w-full overflow-hidden rounded-lg w-full" style={{tableLayout: "fixed"}}>
                        <thead className="bg-white hidden md:table-header-group text-left">
                            <tr>
                                <th scope="col" className="px-4 lg:px-6 py-6">
                                    Exchange
                                </th>
                                <th scope="col" className="px-4 lg:px-6 py-6">
                                    Name
                                </th>
                                <th scope="col" className="px-4 lg:px-6 py-6">
                                    Page link
                                </th>
                                <th scope="col" className="px-4 lg:px-6 py-6">
                                    Google table link
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {
                                usersRev.map((v, i) => {
                                    return (
                                        <tr key={i} className="user-item flex flex-col md:table-row hover:bg-gray-50 cursor-pointer py-4">
                                            <td className="px-4 lg:px-6 py-2 md:py-4 max-w-full truncate"
                                                onClick={() => active(v)}
                                            >
                                                <span className="block md:hidden">Exchange</span>
                                                {v.exchange}
                                            </td>
                                            <td className="px-4 lg:px-6 py-2 md:py-4 max-w-full truncate"
                                                onClick={() => active(v)}
                                            >
                                                <span className="block md:hidden">Name</span>
                                                {v.name}
                                            </td>
                                            <td className="px-4 lg:px-6 py-2 md:py-4 max-w-full truncate">
                                                <span className="block md:hidden">Page link</span>
                                                <a href={ "https://skyrex.io/" + (!!v.pagelink ? v.pagelink + "/" : "") +  "history?id=" + v.uuid } className="hover:text-green-500 truncate">
                                                    { "https://skyrex.io/" + (!!v.pagelink ? v.pagelink + "/" : "" ) + "history?id=" + v.uuid }
                                                </a>
                                            </td>
                                            <td className="px-4 lg:px-6 py-2 md:py-4 max-w-full truncate">
                                                <span className="block md:hidden">Google table link</span>
                                                <a href={"https://docs.google.com/spreadsheets/u/0/d/" + v.googlelink} className="hover:text-green-500">
                                                    {"https://docs.google.com/spreadsheets/u/0/d/" + v.googlelink}
                                                </a>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
    </div>
    )
}