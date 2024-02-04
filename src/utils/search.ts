import { useState, useEffect } from "react";

interface UseFilterProps<T> {
    items: T[];
    initialItems?: T[];
    searchQuery?: string;
}

interface UseFilterResult<T> {
    filteredItems: T[];
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

const useFilter = <T>({ items, initialItems }: UseFilterProps<T>): UseFilterResult<T> => {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [filteredItems, setFilteredItems] = useState<T[]>(initialItems || items);

    useEffect(() => {
        const filterItems = () => {
            const filtered = items.filter((item) => JSON.stringify(item).toLowerCase().includes(searchQuery.toLowerCase()));
            setFilteredItems(filtered);
        };

        filterItems();
    }, [items, searchQuery]);

    return { filteredItems, setSearchQuery };
};

export default useFilter;
