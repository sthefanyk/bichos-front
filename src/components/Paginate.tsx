import { useState } from "react";

const Paginate = () => {
    const [selected, setSelected] = useState(1);

    const styleActiveButton = "relative inline-flex px-4 py-3 bg-darkblue-normal rounded-md justify-center items-center shadow-btn border border-black";
    const styleInactiveButton = "relative inline-flex px-4 py-3 bg-white rounded-md justify-center items-center shadow-btn border border-black";
    const styleActiveText = "text-md lg:text-md font-semibold text-white shadow-sm";
    const styleInactiveText = "text-md lg:text-md font-semibold text-darkblue-normal shadow-sm";

    return (
        <div className="flex gap-2 w-[80%] justify-end">
            <button
                type="button"
                className={selected == 1 ? styleActiveButton : styleInactiveButton}
                onClick={() => setSelected(1)}
            >
                <span className={selected == 1 ? styleActiveText : styleInactiveText}>
                    1
                </span>
            </button>
            <button
                type="button"
                className={selected == 2 ? styleActiveButton : styleInactiveButton}
                onClick={() => setSelected(2)}
            >
                <span className={selected == 2 ? styleActiveText : styleInactiveText}>
                    2
                </span>
            </button>
            <button
                type="button"
                className={selected == 3 ? styleActiveButton : styleInactiveButton}
                onClick={() => setSelected(3)}
            >
                <span className={selected == 3 ? styleActiveText : styleInactiveText}>
                    3
                </span>
            </button>
            <button
                type="button"
                className={selected == 4 ? styleActiveButton : styleInactiveButton}
                onClick={() => setSelected(4)}
            >
                <span className={selected == 4 ? styleActiveText : styleInactiveText}>
                    ...
                </span>
            </button>
            <button
                type="button"
                className={selected == 5 ? styleActiveButton : styleInactiveButton}
                onClick={() => setSelected(5)}
            >
                <span className={selected == 5 ? styleActiveText : styleInactiveText}>
                    6
                </span>
            </button>
            <button
                type="button"
                className={selected == 6 ? styleActiveButton : styleInactiveButton}
                onClick={() => setSelected(6)}
            >
                <span className={selected == 6 ? styleActiveText : styleInactiveText}>
                    {`>>`}
                </span>
            </button>
        </div>
    );
};

export default Paginate;
