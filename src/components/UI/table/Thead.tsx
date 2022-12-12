import React, { FC } from "react";
import { Column } from "./Table";

interface Props {
    columns: Column[];
    theadClass?: { th?: string; tr?: string; thead?: string };
    onSort?: (compareFn: any, column: Column) => void;
    order: number;
    sortedField: string;
}

const SS = (props: { order: number; className?: string; onClick: any }) => (
    <svg
        className={`${props.className}`}
        onClick={props.onClick}
        width="8"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 320 512"
    >
        <path
            d="M279.07 224.05h-238c-21.4 0-32.1-25.9-17-41l119-119a23.9 23.9 0 0 1 33.8-.1l.1.1 119.1 119c15.07 15.05 4.4 41-17 41z"
            style={{ opacity: 0.2 }}
        />
        <path
            d="M296.07 329.05L177 448.05a23.9 23.9 0 0 1-33.8.1l-.1-.1-119-119c-15.1-15.1-4.4-41 17-41h238c21.37 0 32.04 25.95 16.97 41z"
            className="fa-primary"
            style={{ opacity: 0.2 }}
        />
    </svg>
);

const SortIcon = (props: { order: number; className?: string; onClick: any }) => (
    <svg
        className={`${props.className}`}
        onClick={props.onClick}
        width="8"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 320 512"
    >
        <path
            d="M279.07 224.05h-238c-21.4 0-32.1-25.9-17-41l119-119a23.9 23.9 0 0 1 33.8-.1l.1.1 119.1 119c15.07 15.05 4.4 41-17 41z"
            style={{ opacity: props.order ? 1 : 0.2 }}
            className="fa-primary"
        />
        <path
            d="M296.07 329.05L177 448.05a23.9 23.9 0 0 1-33.8.1l-.1-.1-119-119c-15.1-15.1-4.4-41 17-41h238c21.37 0 32.04 25.95 16.97 41z"
            className="fa-primary"
            style={{ opacity: !props.order ? 1 : 0.2 }}
        />
    </svg>
);

const Thead: FC<Props> = (props) => {
    const { columns, theadClass = { th: "", thead: "", tr: "" }, onSort, order = 0, sortedField } = props;

    return (
        <thead className={theadClass.thead}>
            <tr className={theadClass.tr}>
                {columns?.map((column: Column, i) => (
                    <th key={i}
                        className={`${column.className ? column.className : ""} ${theadClass.th}`}
                        style={{ width: column.colWidth }}
                    >
                        <div className="thead-item">
                            {column.sorter &&
                                (sortedField === column.dataIndex ? (
                                    <SortIcon
                                        className="sort-icon"
                                        onClick={() => (onSort ? onSort(column.sorter, column) : {})}
                                        order={order}
                                    />
                                ) : (
                                    <SS
                                        className="sort-icon"
                                        onClick={() => (onSort ? onSort(column.sorter, column) : {})}
                                        order={order}
                                    />
                                ))}

                            <span onClick={() => (onSort ? onSort(column.sorter, column) : {})}>{column.title}</span>
                        </div>
                    </th>
                ))}
            </tr>
        </thead>
    );
};

export default Thead;
