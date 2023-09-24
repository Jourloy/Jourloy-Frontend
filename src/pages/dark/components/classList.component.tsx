import {TextInput} from "@mantine/core";
import {IconSearch} from "@tabler/icons-react";
import {useEffect, useState} from "react";
import {TDarkClass} from "../../../types";
import {store} from "../../../store/store";
import Class from "./class.component";
import DarkAPI from "../api";

export default function ClassList() {
	const [search, setSearch] = useState(``);

	const [classes, setClasses] = useState<TDarkClass[]>(store.getState().darkReducer.classes);
	store.subscribe(() => {
		const _classes = store.getState().darkReducer.classes;
		if (_classes !== classes) setClasses(_classes);
	});

	const classesArray = classes.filter(c => {
		if (c.enName && search) {
			return c.enName.toLowerCase().includes(search.toLowerCase());
		} else if (c.ruName && search) {
			return c.ruName.toLowerCase().includes(search.toLowerCase());
		}
		return true;
	});

	const classesComponents = () => {
		return classesArray.map(c => <Class key={c.id} class={c} />);
	};

	useEffect(() => {
		const backend = new DarkAPI();

		const source = backend.getSource();
		backend.getAllClassesInStore(source.token);

		return () => {
			source.cancel();
		};
	}, []);

	return (
		<>
			<TextInput
				icon={<IconSearch stroke={1.3} />}
				placeholder={`Английское название`}
				value={search}
				onChange={e => setSearch(e.target.value)}
			/>

			{classesComponents()}
		</>
	);
}
