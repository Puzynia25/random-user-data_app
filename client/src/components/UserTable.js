import React, { useState } from "react";

const UserTable = () => {
    /* prettier-ignore */
    const table = [
        {number: 1, id: 1, name: "Eva", address: "Warsaw, Teodorovicha str., 3", phone: "+48570267700"},
        {number: 2, id: 2, name: "Eva", address: "Warsaw, Teodorovicha str., 3", phone: "+48570267700"},
        {number: 3, id: 3, name: "Eva", address: "Warsaw, Teodorovicha str., 3", phone: "+48570267700"},
        {number: 4, id: 4, name: "Eva", address: "Warsaw, Teodorovicha str., 3", phone: "+48570267700"},
        {number: 5, id: 5, name: "Eva", address: "Warsaw, Teodorovicha str., 3", phone: "+48570267700"},
        {number: 6, id: 6, name: "Eva", address: "Warsaw, Teodorovicha str., 3", phone: "+48570267700"},
        {number: 7, id: 7, name: "Eva", address: "Warsaw, Teodorovicha str., 3", phone: "+48570267700"},
        {number: 8, id: 8, name: "Eva", address: "Warsaw, Teodorovicha str., 3", phone: "+48570267700"},
        {number: 9, id: 9, name: "Eva", address: "Warsaw, Teodorovicha str., 3", phone: "+48570267700"},
        {number: 10, id: 10, name: "Eva", address: "Warsaw, Teodorovicha str., 3", phone: "+48570267700"},
    ]
    /* prettier-enable */
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
                    {table.map((user) => {
                        return (
                            <tr key={user.id} className="bg-white border-b">
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    {user.number}
                                </th>
                                <td className="px-6 py-4">{user.id}</td>
                                <td className="px-6 py-4">{user.name}</td>
                                <td className="px-6 py-4">{user.address}</td>
                                <td className="px-6 py-4">{user.phone}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};
export default UserTable;
