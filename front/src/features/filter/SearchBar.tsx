import { TextInput } from "@/components/atoms/TextInput";
import { useNavigation } from "@/hooks/useNavigation";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const SearchBar = () => {
    const { updateSearchParam, removeSearchParam } = useNavigation();
    const triggerSearch = (text: string) => {
        if (text === "") {
            removeSearchParam("search");
        } else updateSearchParam({ search: text });
    };
    return (
        <TextInput
            placeholder="Search"
            icon={<FontAwesomeIcon icon={faMagnifyingGlass} />}
            onSubmit={triggerSearch}
        />
    );
};
