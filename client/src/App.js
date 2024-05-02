import { useEffect, useState } from "react";
import SelectRegion from "./components/SelectRegion";
import UserTable from "./components/UserTable";

function App() {
    const [numberValue, setNumberValue] = useState(1000);
    const [sliderValue, setSliderValue] = useState(0);

    useEffect(() => {
        if (numberValue > 10) {
            setSliderValue(10);
        } else {
            setSliderValue(numberValue);
        }
    }, []);

    const handleInputChange = (e) => {
        const value = parseFloat(e.target.value);
        setNumberValue(value);

        if (value > 10) {
            setSliderValue(10);
        } else {
            setSliderValue(value);
        }
    };

    const handleSliderChange = (e) => {
        const value = parseFloat(e.target.value);
        setSliderValue(value);
        setNumberValue(value);
    };

    return (
        <div className="container mx-auto mt-10 w-full">
            <div className="mt-5 h-full w-full ">
                <div>
                    <SelectRegion />
                </div>
                <div className="mt-5 text-center w-full">
                    <form className="">
                        <label
                            htmlFor="number-input"
                            className="block mb-2 text-sm font-medium text-gray-900 ">
                            Select a number:
                        </label>
                        <input
                            type="number"
                            id="number-input"
                            aria-describedby="helper-text-explanation"
                            className="mx-auto  max-w-36 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="1000"
                            min="0"
                            max="1000"
                            value={numberValue}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </form>
                </div>
                <div className="w-2/3 my-5 text-center mx-auto">
                    <div className="relative mb-6">
                        <label className="block mb-2 text-sm font-medium text-gray-900 ">
                            or use the range below:
                        </label>
                        <input
                            type="range"
                            min="0"
                            max="10"
                            step="0.25"
                            value={sliderValue}
                            onChange={(e) => handleSliderChange(e)}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />

                        <span className="ml-2 text-sm text-gray-500 -translate-x-1/2 rtl:translate-x-1/2 absolute start-0 -bottom-6">
                            0
                        </span>
                        <span className="text-sm text-gray-500 -translate-x-1/2 rtl:translate-x-1/2 absolute start-[10%] -bottom-6">
                            1
                        </span>
                        <span className="text-sm text-gray-500 -translate-x-1/2 rtl:translate-x-1/2 absolute start-[20%] -bottom-6">
                            2
                        </span>
                        <span className="text-sm text-gray-500 -translate-x-1/2 rtl:translate-x-1/2 absolute start-[30%] -bottom-6">
                            3
                        </span>
                        <span className="text-sm text-gray-500 -translate-x-1/2 rtl:translate-x-1/2 absolute start-[40%] -bottom-6">
                            4
                        </span>
                        <span className="text-sm text-gray-500 -translate-x-1/2 rtl:translate-x-1/2 absolute start-[50%] -bottom-6">
                            5
                        </span>
                        <span className="text-sm text-gray-500 -translate-x-1/2 rtl:translate-x-1/2 absolute start-[60%] -bottom-6">
                            6
                        </span>
                        <span className="text-sm text-gray-500 -translate-x-1/2 rtl:translate-x-1/2 absolute start-[70%] -bottom-6">
                            7
                        </span>
                        <span className="text-sm text-gray-500 -translate-x-1/2 rtl:translate-x-1/2 absolute start-[80%] -bottom-6">
                            8
                        </span>
                        <span className="text-sm text-gray-500 -translate-x-1/2 rtl:translate-x-1/2 absolute start-[90%] -bottom-6">
                            9
                        </span>
                        <span className="text-sm text-gray-500 -translate-x-1/2 rtl:translate-x-1/2 absolute end-0 -bottom-6">
                            10
                        </span>
                    </div>
                </div>
            </div>
            <UserTable />
        </div>
    );
}

export default App;
