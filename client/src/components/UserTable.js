import React, { useContext, useEffect, useState } from "react";
import { Context } from "..";
import { generateUsersData } from "../http/userDataAPI";
import { observer } from "mobx-react-lite";
import {
    DELAY_UPDATE_USERS,
    INITIAL_COUNT_USERS,
    INITIAL_PAGE,
    OFFSET_COUNT_USERS,
} from "../utils.js/consts";

const UserTable = observer(() => {
    const { user } = useContext(Context);

    const [timerId, setTimerId] = useState(null);
    const [isNewRequest, setIsNewRequest] = useState(false);

    const fetchData = async (region, countUsers, errorCount, seed, page, callback = null) => {
        return generateUsersData(region, countUsers, errorCount, seed, page)
            .then((response) => {
                user.setUserTable(response.usersData);
                user.setCountUsers(OFFSET_COUNT_USERS);
                user.incrementCurrentPage();
            })
            .catch((e) => console.log(e))
            .finally(callback);
    };

    const delayUpdateData = async () => {
        if (timerId) {
            clearTimeout(timerId);
        }

        const timer = () => {
            return setTimeout(async () => {
                setTimerId(null);
                if (isNewRequest) {
                    fetchData(
                        user.selectedRegion,
                        INITIAL_COUNT_USERS,
                        user.errorValue,
                        user.seedValue,
                        INITIAL_PAGE,
                        () => setIsNewRequest(false)
                    );
                }
            }, DELAY_UPDATE_USERS);
        };

        setTimerId(timer());
    };

    useEffect(() => {
        if (user.isFetching) {
            generateUsersData(
                user.selectedRegion,
                user.countUsers,
                user.errorValue,
                user.seedValue,
                user.currentPage
            )
                .then((response) => {
                    user.addUsers(response.usersData);
                    user.incrementCurrentPage();
                })
                .catch((e) => console.log(e))
                .finally(() => {
                    user.setIsFetching(false);
                });
        }
    }, [user.isFetching]);

    useEffect(() => {
        if (timerId) {
            setIsNewRequest(true);
            delayUpdateData();
            return;
        }

        delayUpdateData();
        fetchData(
            user.selectedRegion,
            INITIAL_COUNT_USERS,
            user.errorValue,
            user.seedValue,
            INITIAL_PAGE
        );
    }, [user.selectedRegion, user.errorValue, user.seedValue]);

    return (
        <div className="relative overflow-x-auto mt-2  mx-auto">
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
                    {user.userTable.map((row, i) => {
                        return (
                            <tr key={row.userId} className="bg-white border-b">
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    {i + 1}
                                </th>
                                <td className="px-6 py-4">{row.userId}</td>
                                <td className="px-6 py-4">{row.name}</td>
                                <td className="px-6 py-4">{row.address}</td>
                                <td className="px-6 py-4">{row.phoneNumber}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
});
export default UserTable;
