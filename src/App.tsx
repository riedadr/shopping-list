import Form from "./components/Form";
import List from "./components/List";
import ItemsProvider from "./items-provider";

function App() {
	return (
		<main className="w-screen h-svh bg-slate-900 text-white p-4 space-y-8">
			<h1 className="font-bold text-3xl">Einkaufsliste</h1>
			<ItemsProvider>
				<Form />
				<List />
			</ItemsProvider>
		</main>
	);
}

export default App;
