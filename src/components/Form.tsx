import React, { useRef, useState } from "react";
import { useItems } from "../items-provider";

const Form = () => {
	const { addItem } = useItems();
	const [error, setError] = useState<string>("");
	const titleRef = useRef<HTMLInputElement>(null);
	const amountRef = useRef<HTMLInputElement>(null);

	const submit = (e: React.FormEvent) => {
		e.preventDefault();

		try {
			const title = titleRef.current?.value;
			if (!title) throw new Error("Name ungültig");

			const amount = parseInt(amountRef.current?.value ?? "");
			if (!amount) throw new Error("Menge ungültig");

			addItem({
				id: crypto.randomUUID(),
				title,
				amount,
				checked: false,
			});

			setError("");
		} catch (error) {
			setError((error as Error).message);
		}
	};

	return (
		<section>
			<h2>Neuer Artikel</h2>
			<form onSubmit={submit}>
				<input name="title" type="text" ref={titleRef} />
				<input
					name="amount"
					type="number"
					defaultValue={1}
					ref={amountRef}
				/>
				<button type="submit">hinzufügen</button>
			</form>
			<div>{error}</div>
		</section>
	);
};

export default Form;
