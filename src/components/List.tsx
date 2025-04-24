import { useItems } from "../items-provider";
import Item from "./Item";

const List = () => {
	const { items } = useItems();
	return (
		<section>
			{items.map((item) => (
				<Item key={item.id} data={item} />
			))}
		</section>
	);
};

export default List;
