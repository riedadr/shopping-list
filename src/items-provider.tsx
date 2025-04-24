import React, {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState,
} from "react";

export type Item = {
	id: string;
	title: string;
	amount: number;
	checked: boolean;
};

type ItemsContext = {
	items: Item[];
	addItem: (item: Item) => void;
	removeItem: (itemId: string) => void;
	checkItem: (itemId: string, checked: boolean) => void;
};

const Context = createContext<ItemsContext | undefined>(undefined);

const ItemsProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [items, setItems] = useState<ItemsContext["items"]>([]);

	const syncLocalStorage = useCallback((items: Item[]) => {
		localStorage.setItem("shopping-list", JSON.stringify(items));
	}, []);

	const addItem = useCallback(
		(item: Item) => {
			setItems((prev) => {
				const newItems = [...prev, item];
				syncLocalStorage(newItems);
				return newItems;
			});
		},
		[syncLocalStorage]
	);

	const removeItem = useCallback(
		(itemId: string) => {
			setItems((prev) => {
				const newItems = prev.filter((item) => item.id !== itemId);
				syncLocalStorage(newItems);
				return newItems;
			});
		},
		[syncLocalStorage]
	);

	const checkItem = useCallback(
		(itemId: string, checked: boolean) => {
			setItems((prev) => {
				const newItems = prev.map((item) => {
					if (item.id === itemId) {
						const updatedItem = { ...item, checked };
						return updatedItem;
					} else return item;
				});
				syncLocalStorage(newItems);
				return newItems;
			});
		},
		[syncLocalStorage]
	);

	useEffect(() => {
		const localList = localStorage.getItem("shopping-list");
		if (localList) setItems(JSON.parse(localList));
	}, []);

	return (
		<Context.Provider value={{ items, addItem, removeItem, checkItem }}>
			{children}
		</Context.Provider>
	);
};

export const useItems = () => {
	const context = useContext(Context);
	if (context === undefined)
		throw new Error("useItems must be used inside ItemsProvider");

	return context;
};

export default ItemsProvider;
