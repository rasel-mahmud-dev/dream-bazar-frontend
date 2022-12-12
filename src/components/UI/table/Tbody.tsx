import React, { FC } from "react";
import { Column } from "./Table";

interface Props {
	columns: Column[];
	dataSource: any[];
	tbodyClass?: { tr?: string; td?: string; tbody?: string };
}

const Tbody: FC<Props> = (props) => {
	const { dataSource, tbodyClass = {}, columns } = props;

	return (
		<tbody className={tbodyClass?.tbody}>
			{dataSource.map((data: any, i: number) => (
				<tr className={tbodyClass?.tr} key={i}>
					{columns?.map((col: Column) => (
						<td
							className={`table-cell ${
								tbodyClass.td ? tbodyClass.td : ""
							}`}
							style={{ width: col.colWidth }}
						>
							{col.render
								? col.render(data[col.dataIndex as any], data)
								: data[col.dataIndex as any]}
						</td>
					))}
				</tr>
			))}
		</tbody>
	);
};

export default Tbody;
