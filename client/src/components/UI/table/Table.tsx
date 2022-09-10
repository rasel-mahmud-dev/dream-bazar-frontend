import React, { FC, HTMLAttributes} from 'react';
import Thead from "UI/table/Thead";
import Tbody from "UI/table/Tbody";

import "./style.css"

export interface Column extends HTMLAttributes<HTMLElement>{
	id?: string,
	title: string
	dataIndex?: string,
	className?: string,
	render?: (key: string)=> React.ReactNode;
}[]


interface TableProps extends HTMLAttributes<HTMLTableElement> {
	dataSource: any
	theadClass?: { th?: string, td?: string, thead?: string }
	tbodyClass?: { tr?: string, td?: string, tbody?: string }
	columns: Column[],
}

const Table:FC<TableProps> = (props)=> {
	const {theadClass, tbodyClass, className, dataSource, columns} = props
    return (
        <table className={className}>
            <Thead theadClass={theadClass} columns={columns} />
	        <Tbody tbodyClass={tbodyClass} dataSource={dataSource} columns={columns} />
        </table>
    );
}


export default Table;