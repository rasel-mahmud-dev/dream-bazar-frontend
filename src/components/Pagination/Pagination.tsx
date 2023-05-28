import React, {FC, useEffect, useState} from "react";
import {BiChevronLeft, BiChevronRight} from "react-icons/bi";
import "./style.scss";

interface Props {
    perPage: number,
    totalItem: number,
    pageNumber: number,
    onChange: (pageNumber: number) => void
    className?: string
}

const Pagination: FC<Props> = ({perPage, totalItem, pageNumber, onChange, className = ""}) => {
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        setCurrentPage(pageNumber);
    }, [pageNumber]);

    let totalPaginateItem = Math.ceil(totalItem / perPage);

    function handleChangePageNumber(page, direction) {
        let updatePageNumber = currentPage;

        if (direction === 1) {
            if (currentPage === totalPaginateItem) {
                updatePageNumber = 1;
            } else {
                updatePageNumber++;
            }
        } else if (direction === -1) {
            if (currentPage === 1) {
                updatePageNumber = totalPaginateItem;
            } else {
                updatePageNumber--;
            }
        } else {
            updatePageNumber = page;
        }
        setCurrentPage(updatePageNumber);
        onChange && onChange(updatePageNumber);
    }

    return (
        totalPaginateItem > 1 && (
            <div className={`flex justify-center gap-2 flex-wrap ${className}`}>
                <div className="dashboard-card paginate-item" onClick={() => handleChangePageNumber(currentPage - 1, -1)}>
                    <BiChevronLeft className="text-lg"/>
                </div>
                {new Array(totalPaginateItem).fill(0).map((_, index) => (
                    <div
                        key={index}
                        onClick={() => handleChangePageNumber(index + 1, 0)}
                        className={`dashboard-card paginate-item ${currentPage === index + 1 ? "paginate-active" : ""}`}
                    >
                        {index + 1}
                    </div>
                ))}
                <div className="dashboard-card paginate-item">
                    <BiChevronRight onClick={() => handleChangePageNumber(currentPage + 1, 1)} className="text-lg"/>
                </div>
            </div>
        )
    );
};

export default Pagination;
