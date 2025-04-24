import React, { useCallback } from "react";
import { Item as ItemType, useItems } from "../items-provider";

const Item: React.FC<{ data: ItemType }> = ({ data }) => {
	const { removeItem, checkItem } = useItems();

	const onChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const checked = e.target.checked;
			checkItem(data.id, checked);
		},
		[checkItem, data]
	);

	return (
		<div
			className={`shadow bg-slate-800 rounded-md flex justify-between items-center px-4 py-2 ${
				data.checked ? "opacity-50" : "opacity-100"
			}`}
		>
			<div className="flex gap-4">
				<input type="checkbox" onChange={onChange} />
				<div className="leading-none">
					<h3 className="font-bold">{data.title}</h3>
					<p className="text-sm">
						Amount: <code>{data.amount}</code>
					</p>
				</div>
			</div>
			<button
				className="size-8 rounded cursor-pointer hover:opacity-80"
				onClick={() => removeItem(data.id)}
			>
				🗑️
			</button>
		</div>
	);
};

export default Item;
