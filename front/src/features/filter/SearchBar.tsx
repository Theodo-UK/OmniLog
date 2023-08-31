import { TextInput } from "@/components/atoms/TextInput";
import { useNavigation } from "@/hooks/useNavigation";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const SearchBar = () => {
    const { updateSearchParam } = useNavigation();
    const triggerSearch = (text: string) => {
        updateSearchParam({ search: text });
    };
    return (
        <TextInput
            placeholder="Search"
            icon={<FontAwesomeIcon icon={faMagnifyingGlass} />}
            onSubmit={triggerSearch}
        />
    );
};
