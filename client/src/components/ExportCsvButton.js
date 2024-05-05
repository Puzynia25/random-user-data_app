import React, { useContext, useRef, useState } from "react";
import { Context } from "..";
import { CSVLink } from "react-csv";

const ExportCsvButton = () => {
    const { user } = useContext(Context);

    const [fetchData, setFetchData] = useState([]);
    const csvDownloadRef = useRef(null);

    const fetchDataToDownload = () => {
        setFetchData(user.userTable);
        setTimeout(() => csvDownloadRef.current.link.click(), 500);
    };

    return (
        <div className="text-right">
            <CSVLink
                data={fetchData}
                headers={["userId", "name", "address", "phoneNumber"]}
                filename="user-data.csv"
                target="_blank"
                ref={csvDownloadRef}
            />
            <button
                onClick={fetchDataToDownload}
                className=" relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                    Export to CSV
                </span>
            </button>
        </div>
    );
};

export default ExportCsvButton;
