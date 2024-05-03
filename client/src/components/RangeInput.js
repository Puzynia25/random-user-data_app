import React, { useEffect, useState } from "react";

const RangeInput = ({ sliderValue, handleSliderChange, handleMouseUp }) => {
    const [loading, setLoading] = useState(true);

    return (
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
                    onMouseUp={handleMouseUp}
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
    );
};
export default RangeInput;
