import React, { useState } from "react";

interface PaginationProps {
    currentPage: number,
    totalPages: number
    onPageChange: (newPage: number) => void;
}

const Pagination = ({ totalPages, currentPage, onPageChange }: PaginationProps) => {
    const [firstPage, setFirstPage] = useState(1);

    const styleActiveButton =
        "relative inline-flex px-4 py-3 bg-darkblue-normal rounded-md justify-center items-center shadow-btn border border-black";
    const styleInactiveButton =
        "relative inline-flex px-4 py-3 bg-white rounded-md justify-center items-center shadow-btn border border-black";
    const styleActiveText =
        "text-md lg:text-md font-semibold text-white shadow-sm";
    const styleInactiveText =
        "text-md lg:text-md font-semibold text-darkblue-normal shadow-sm";

    const handlePageChange = (newPage: number) => {
        if (newPage < 1 || newPage > totalPages) {
            return;
        }

        onPageChange(newPage);
    };

    const renderPageButtons = () => {
        const buttons = [];

        if (totalPages <= 4) {
            for (let i = firstPage; i <= Math.min(firstPage + 3, totalPages); i++) {
                buttons.push(
                    <button
                        key={i}
                        onClick={() => handlePageChange(i)}
                        className={i === +currentPage ? styleActiveButton : styleInactiveButton}
                    >
                        <span className={i === +currentPage ? styleActiveText : styleInactiveText}>
                            {i}
                        </span>
                    </button>
                );
            }
            return buttons;
        }

        // Render the "next 3 pages" button
        if (firstPage - 3 >= 1) {
            buttons.push(
                <button
                    key="back"
                    onClick={() => {setFirstPage(firstPage - 3); handlePageChange(firstPage - 1);}}
                    className={styleInactiveButton}
                >
                    <span className={styleInactiveText}>
                        {`<<`}
                    </span>
                </button>
            );
        }

        // Render the first 3 buttons
        for (let i = firstPage; i <= Math.min(firstPage + 2, totalPages); i++) {
            buttons.push(
                <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    className={i === +currentPage ? styleActiveButton : styleInactiveButton}
                >
                    <span className={i === +currentPage ? styleActiveText : styleInactiveText}>
                        {i}
                    </span>
                </button>
            );
        }

        // Render the "..." button
        if (firstPage + 3 < totalPages) {
            buttons.push(
                <button key="ellipsis" disabled className={styleInactiveButton}>
                    <span className={styleInactiveText}>
                        ...
                    </span>
                </button>
            );
        }

        // Render the last button
        if (firstPage + 4 <= totalPages) {
            buttons.push(
                <button
                    key={totalPages}
                    className={totalPages === +currentPage ? styleActiveButton : styleInactiveButton}
                    onClick={() => handlePageChange(totalPages)}
                >
                    <span className={totalPages === +currentPage ? styleActiveText : styleInactiveText}>
                        {totalPages}
                    </span>
                </button>
            );
        }

        // Render the "next 3 pages" button
        if (firstPage + 3 < totalPages) {
            buttons.push(
                <button
                    key="next"
                    onClick={
                        () => {setFirstPage(firstPage + 3); handlePageChange(firstPage + 3);}
                    }
                    className={styleInactiveButton}
                >
                    <span className={styleInactiveText}>
                        {`>>`}
                    </span>
                </button>
            );
        }

        return buttons;
    };

    return (
        <div className="flex gap-2 w-full justify-end">
            {renderPageButtons()}
        </div>
    );
};

export default Pagination;
