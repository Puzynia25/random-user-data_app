import { useEffect, useState } from "react";
import RegionInput from "./components/RegionInput";
import UserTable from "./components/UserTable";
import { generateRandomSeed, generateUsersData } from "./http/userDataAPI";
import RangeInput from "./components/RangeInput";
import ArrowUp from "./components/ArrowUp";
import Spinner from "./components/Spinner";

function App() {
    const initialPage = 0;
    const initialCountUsers = 20;

    const [errorCount, setErrorCount] = useState(0);
    const [sliderValue, setSliderValue] = useState(0);
    const [seedValue, setSeedValue] = useState(0);
    const [validateErrorCount, setValidateErrorCount] = useState(false);
    const [selectedRegion, setSelectedRegion] = useState("EN");
    const [table, setTable] = useState([]);
    const [currentPage, setCurrentPage] = useState(initialPage);
    const [countUsers, setCountUsers] = useState(initialCountUsers);
    const [isFetching, setIsFetching] = useState(false);
    const [showScrollButton, setShowScrollButton] = useState(false);
    const [timerId, setTimerId] = useState(null);
    const [isNewRequest, setIsNewRequest] = useState(false);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleSelectedRegion = (region) => {
        setSelectedRegion(region);
    };

    const handleInputChange = (e) => {
        let value = e.target.value;

        if (value === "") {
            setErrorCount("");
            return;
        }

        value = value.replace(",", ".");

        const numberValue = parseFloat(value);

        if (!isNaN(numberValue)) {
            setErrorCount(numberValue);
            if (value > 10) {
                setSliderValue(10);
            } else {
                setSliderValue(numberValue);
            }
        }

        numberValue > 1000 ? setValidateErrorCount(true) : setValidateErrorCount(false);
    };

    const handleSliderChange = (e) => {
        setValidateErrorCount(false);
        const value = parseFloat(e.target.value);
        setSliderValue(value);
        setErrorCount(value);
    };

    const handleSeedChange = async () => {
        try {
            const response = await generateRandomSeed();
            setSeedValue(response);
        } catch (e) {
            console.log(e);
        }
    };

    const handleInputSeed = (e) => {
        const value = parseFloat(e.target.value);
        setSeedValue(value);
    };

    // let timerId;
    const fetchData = async () => {
        if (timerId) {
            clearTimeout(timerId);
        }

        console.log(timerId);

        const timer = () => {
            return setTimeout(async () => {
                setTimerId(null);
                if (isNewRequest) {
                    generateUsersData(selectedRegion, countUsers, errorCount, seedValue, 0)
                        .then((response) => {
                            setTable(response.usersData);
                            setCountUsers(10);
                            setCurrentPage(1);
                        })
                        .catch((e) => console.log(e))
                        .finally(() => setIsNewRequest(false));
                }
            }, 1000);
        };

        setTimerId(timer());
    };

    useEffect(() => {
        if (isFetching) {
            generateUsersData(selectedRegion, countUsers, errorCount, seedValue, currentPage)
                .then((response) => {
                    setTable((prevTable) => [...prevTable, ...response.usersData]);
                    setCurrentPage((prev) => prev + 1);
                })
                .catch((e) => console.log(e))
                .finally(() => setIsFetching(false));
        }
    }, [isFetching]);

    useEffect(() => {
        if (timerId) {
            setIsNewRequest(true);
            fetchData();
            return;
        }

        fetchData();

        generateUsersData(selectedRegion, initialCountUsers, errorCount, seedValue, initialPage)
            .then((response) => {
                setTable(response.usersData);
                setCountUsers(10);
                setCurrentPage(1);
            })
            .catch((e) => console.log(e));
    }, [selectedRegion, errorCount, seedValue]);

    const handleScroll = (e) => {
        if (
            !isFetching &&
            e.target.documentElement.scrollHeight -
                (e.target.documentElement.scrollTop + window.innerHeight) <
                100
        ) {
            setIsFetching(true);
        }

        if (window.scrollY > 200) {
            setShowScrollButton(true);
        } else {
            setShowScrollButton(false);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const spinner = isFetching ? <Spinner /> : null;
    return (
        <div className="container mx-auto mt-10 w-full">
            <div>
                <div className="flex content-between gap-20 justify-center w-full">
                    <RegionInput handleSelectedRegion={handleSelectedRegion} />

                    <div>
                        <label
                            htmlFor="text-input"
                            className="block mb-2 text-sm font-medium text-gray-900">
                            Enter the number of errors:
                        </label>
                        <div className="relative">
                            <input
                                type="number"
                                className={
                                    validateErrorCount
                                        ? "bg-red-300 border border-red-300 text-gray-900 text-sm rounded-lg focus:bg-red-100 focus:ring-red-500 focus:border-red-100 block w-full p-2.5"
                                        : "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                }
                                placeholder="< 1000"
                                min="0"
                                value={errorCount}
                                onChange={handleInputChange}
                            />
                            <i className="absolute right-2 top-0 text-gray-400 text-xs text-left">
                                per record
                            </i>
                        </div>
                    </div>
                    <div>
                        <label
                            htmlFor="number-input"
                            className=" block mb-2 text-sm font-medium text-gray-900">
                            Seed:
                        </label>
                        <div className="flex gap-3 w-full">
                            <div className="relative">
                                <input
                                    type="number"
                                    className="w-48 mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                                    placeholder="1000"
                                    min="0"
                                    value={seedValue}
                                    onChange={handleInputSeed}
                                />
                                <i className="absolute right-2 top-0 text-gray-400 text-xs text-left">
                                    per record
                                </i>
                            </div>
                            <button
                                type="button"
                                className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
                                onClick={handleSeedChange}>
                                Random
                            </button>
                        </div>
                    </div>
                </div>
                <RangeInput sliderValue={sliderValue} handleSliderChange={handleSliderChange} />
            </div>

            <UserTable table={table} />
            {showScrollButton && <ArrowUp scrollToTop={scrollToTop} />}
            {spinner}
        </div>
    );
}

export default App;
