import { TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useState } from "react";

export default function AttributeList() {

	const [search, setSearch] = useState(``);

	return(
		<>
			<TextInput
				icon={<IconSearch stroke={1.3} />}
				placeholder={`Английское название`}
				value={search}
				onChange={e => setSearch(e.target.value)}
			/>
		</>
	)
}