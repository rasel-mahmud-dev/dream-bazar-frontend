import React, { FC, HTMLAttributes, useEffect, useState } from "react";
import Thead from "./Thead";
import Tbody from "./Tbody";

import "./style.css";

export interface Column extends HTMLAttributes<HTMLElement> {
    id?: string;
    title: string;
    dataIndex?: string;
    className?: string;
    colWidth?: number;
    sorter?: (args1: any, args2: any) => any;
    render?: (value: any, data: any) => React.ReactNode;
}
[];

interface TableProps extends HTMLAttributes<HTMLTableElement> {
    dataSource: any;
    theadClass?: { th?: string; td?: string; thead?: string };
    tbodyClass?: { tr?: string; td?: string; tbody?: string };
    columns: Column[];
    scroll?: { x?: number; y?: number };
    fixed?: boolean;
    pagination?: { pageSize: number; currentPage: number };
}

const Table: FC<TableProps> = (props) => {
    const { theadClass, tbodyClass, className, dataSource, columns, fixed, scroll, pagination } = props;
    
    let fixedTable = { maxHeight: fixed ? 500 : "auto", minWidth: 0 };

    const [state, setState] = useState({
        items: [],
        paginatedItems: [],
        order: 1,
        sortedField: "",
        currentPage: 1,
        pageSize: 100,
        pages: [],
    });

    function initialDataSetup() {
        setState((prevState: any) => {
            let list = dataSource;
            let pages: any = [];
            if (pagination) {
                list = sliceForPaginate(
                    {
                        currentPage: pagination.currentPage,
                        pageSize: pagination.pageSize,
                    },
                    list
                );
                pages = getForwardPage(dataSource, pagination.pageSize, pagination.currentPage);
            }

            return {
                ...prevState,
                items: dataSource,
                paginatedItems: list,
                order: 1,
                pages: pages,
                currentPage: pagination?.currentPage,
                pageSize: pagination?.pageSize,
            };
        });
    }

    useEffect(() => {
        initialDataSetup();
    }, [dataSource]);

    useEffect(() => {
        initialDataSetup();
    }, [pagination && pagination.pageSize]);

    if (scroll && scroll.y) {
        fixedTable.maxHeight = scroll.y;
    }
    if (scroll && scroll.x) {
        fixedTable.minWidth = scroll.x;
    }

    function handleSort(compareFn: (args1: any, args2: any) => void, column: any) {
        let list: any = state.items;
        if (state.order) {
            list = list.sort((a: any, b: any) => compareFn(a[column.dataIndex], b[column.dataIndex]));
        } else {
            list = list.sort((a: any, b: any) => compareFn(b[column.dataIndex], a[column.dataIndex]));
        }

        let paginatedItems: any = [];
        if (pagination) {
            paginatedItems = sliceForPaginate(state, state.items);
        }
        setState((prevState) => ({
            ...prevState,
            items: list,
            paginatedItems,
            sortedField: column.dataIndex,
            order: prevState.order ? 0 : 1,
        }));
    }

    function sliceForPaginate(state: any, list: any) {
        return list.slice((state.currentPage - 1) * state.pageSize, state.pageSize * state.currentPage);
    }

    function handleSelectPage(pageNumber: number) {
        let list = sliceForPaginate(
            {
                currentPage: pageNumber,
                pageSize: state.pageSize,
            },
            state.items
        );

        setState((prevState: any) => {
            // let isZero = pageNumber % 10;

            let pages: number[] = prevState.pages;
            // let allPages = prevState.items.slice(0, prevState.items.length / prevState.pageSize);

            // if click last page number
            if (pages.pop() === pageNumber) {
                pages = [];
                for (let i = -1; i < 9; i++) {
                    pages.push(pageNumber + i);
                }

                // if click first backward page number
            } else if (prevState.currentPage > pageNumber && pageNumber > 0) {
                pages = getNegativePages(pageNumber);
            } else {
                // if click between edge page number
                pages = getForwardPage([], prevState.pageSize, pageNumber);
            }

            return {
                ...prevState,
                pages,
                currentPage: pageNumber,
                paginatedItems: list,
            };
        });
    }

    function getForwardPage(items: any, pageSize: number, currentPage: number) {
        let pages: number[] = [];
        // let pages = items.slice(0, items.length / pageSize);

        if (currentPage < 10) {
            for (let i = 1; i <= 10; i++) {
                pages.push(i);
            }
        } else {
            for (let i = 0; i < 10; i++) {
                pages.push(currentPage + i);
            }
        }
        return pages;
    }

    function getNegativePages(n: number) {
        let result = [];
        //  store first 10 page
        if (n === 1) {
            for (let i = 1; i <= 10; i++) {
                result.push(i);
            }
        } else {
            //  if current page number 9 than store [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
            //  if current page number 19 than store [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]

            for (let i = 10; i > -1; i--) {
                let pageReverse = n + 1 - i;
                // ignore 0 and negative
                if (pageReverse > 0) {
                    result.push(pageReverse);
                }
            }
        }

        return result;
    }

    return (
        <div>
            <div
                className={`rsl-table ${fixed ? "table-fixed" : ""}`}
                style={fixedTable.maxHeight ? { maxHeight: fixedTable.maxHeight } : {}}
            >
                <table className={className} style={fixedTable.minWidth ? { minWidth: fixedTable.minWidth } : {}}>
                    <Thead
                        onSort={handleSort}
                        theadClass={theadClass}
                        columns={columns}
                        sortedField={state.sortedField}
                        order={state.order}
                    />
                    <Tbody
                        tbodyClass={tbodyClass}
                        dataSource={pagination ? state.paginatedItems : state.items}
                        columns={columns}
                    />
                </table>
            </div>

            {pagination && (
                <div className="pagination">
                    {state.pages.map((pageNumber) => (
                        <div
                            className={`pagination-item ${
                                state.currentPage === pageNumber ? "pagination-item-active" : ""
                            }`}
                            onClick={() => handleSelectPage(pageNumber)}
                        >
                            <button>{pageNumber}</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Table;
