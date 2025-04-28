import React, { useCallback, useRef, useState } from "react";
import { useItems } from "../items-provider";

const Form = () => {
	const { addItem } = useItems();
	const [error, setError] = useState<string>("");
	const titleRef = useRef<HTMLInputElement>(null);
	const amountRef = useRef<HTMLInputElement>(null);

	const submit = useCallback((e: React.FormEvent) => {
		e.preventDefault();

		try {
			const title = titleRef.current?.value;
			if (!title) throw new Error("Invalid name");

			const amount = parseInt(amountRef.current?.value ?? "");
			if (!amount || amount < 1) throw new Error("Invalid amount");

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
	}, [addItem]);

	return (
		<section>
			<form
				className="bg-slate-700 rounded-md p-2 flex justify-between items-center px-4 py-2"
				onSubmit={submit}
			>
				<div className="flex flex-col gap-2">
					<input
						className="border-b border-slate-500 font-bold"
						name="title"
						type="text"
						placeholder="New Article"
						ref={titleRef}
					/>
					<div className="text-sm flex gap-2">
						<p>Amount:</p>

						<input
							className="border-b border-slate-500"
							name="amount"
							type="number"
							defaultValue={1}
							ref={amountRef}
						/>
					</div>
				</div>
				<button
					className="size-8 rounded cursor-pointer hover:opacity-80"
					type="submit"
				>
					➕
				</button>
			</form>
			<div className="bg-red-500 mt-2">{error}</div>
		</section>
	);
};

export default Form;
