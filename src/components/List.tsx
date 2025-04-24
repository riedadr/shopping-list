import { useMemo } from "react";
import { useItems } from "../items-provider";
import Item from "./Item";

const List = () => {
	const { items } = useItems();

	const sortedItems = useMemo(() => {
		return items.sort((a, b) => {
			if (a.checked === b.checked) {
				return a.title.localeCompare(b.title);
			}
			return a.checked ? 1 : -1;
		});
	}, [items]);

	return (
		<section className="grid gap-2">
			{sortedItems.map((item) => (
				<Item key={item.id} data={item} />
			))}
		</section>
	);
};

export default List;
