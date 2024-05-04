import { useContext, useState } from "react";
import RangeInput from "./RangeInput";
import RegionInput from "./RegionInput";
import { generateRandomSeed } from "../http/userDataAPI";
import { observer } from "mobx-react-lite";
import { Context } from "..";

const SelectMenu = observer(() => {
    const { user } = useContext(Context);

    const [sliderValue, setSliderValue] = useState(0);
    const [validateErrorCount, setValidateErrorCount] = useState(false);

    const handleInputChange = (e) => {
        let value = e.target.value;

        if (value === "") {
            user.setErrorValue("");
            return;
        }

        value = value.replace(",", ".");

        const numberValue = parseFloat(value);

        if (!isNaN(numberValue)) {
            user.setErrorValue(numberValue);
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
        user.setErrorValue(value);
    };

    const handleSeedChange = async () => {
        try {
            const response = await generateRandomSeed();
            user.setSeedValue(response);
        } catch (e) {
            console.log(e);
        }
    };

    const handleInputSeed = (e) => {
        if (typeof e.target.value === "NaN") {
            user.setSeedValue("");
        }
        const value = parseFloat(e.target.value);
        user.setSeedValue(value);
    };
    return (
        <div>
            <div className="flex content-between gap-20 justify-center w-full">
                <RegionInput />

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
                            value={user.errorValue}
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
                                value={user.seedValue}
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
    );
});

export default SelectMenu;
