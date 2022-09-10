import React, {FC} from 'react';
import {Column} from "UI/table/Table";


interface Props {
	columns: Column[];
	dataSource: any[],
	tbodyClass?: {tr?: string, td?: string, tbody?: string}
};

const Tbody: FC<Props> = (props) => {
	
	const {  dataSource, tbodyClass, columns } = props;
	
	return (
		<tbody className={tbodyClass?.tbody}>
			{  dataSource.map((data: any, i: number)=>(
				<tr className={tbodyClass?.tr}>
					{ columns?.map((col: Column)=>(
						<td className={tbodyClass?.td}>
							
							{ col.render ? col.render(data) : data[col.dataIndex] }
							
						</td>
					))}
				</tr>
			))}
        </tbody>
	);
};

export default Tbody;