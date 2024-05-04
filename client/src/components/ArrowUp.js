const ArrowUp = ({ scrollToTop }) => {
    return (
        <button
            onClick={scrollToTop}
            className="fixed bottom-7 right-7  bg-gray-400 text-white p-3 rounded-full shadow-lg hover:bg-gray-500 transition">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 18.75 7.5-7.5 7.5 7.5" />
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 7.5-7.5 7.5 7.5" />
            </svg>
        </button>
    );
};

export default ArrowUp;
