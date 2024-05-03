import React, { useEffect, useState } from "react";

const UserTable = ({ table }) => {
    const [userTable, setUserTable] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setUserTable(table);
        if (table) {
            setLoading(false);
        }
    }, [table]);
    return (
        <div className="relative overflow-x-auto mt-16  mx-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3 rounded-s-lg max-w-6">
                            Number
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Id
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Address
                        </th>
                        <th scope="col" className="px-6 py-3 rounded-e-lg">
                            Phone number
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {userTable?.map((user, i) => {
                        return (
                            <tr key={user.userId} className="bg-white border-b">
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    {i + 1}
                                </th>
                                <td className="px-6 py-4">{user.userId}</td>
                                <td className="px-6 py-4">{user.name}</td>
                                <td className="px-6 py-4">{user.address}</td>
                                <td className="px-6 py-4">{user.phoneNumber}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};
export default UserTable;
