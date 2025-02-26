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
    const [debouncedQuery, setDebouncedQuery] = useState<string>(searchQuery);
    const [filteredItems, setFilteredItems] = useState<T[]>(initialItems || items);

    // Debounce effect
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedQuery(searchQuery);
        }, 800);

        return () => clearTimeout(handler);
    }, [searchQuery]);


    useEffect(() => {
        const filterItems = () => {
            const filtered = items.filter((item) =>
                JSON.stringify(item).toLowerCase().includes(debouncedQuery.toLowerCase()));
            setFilteredItems(filtered);
        };

        filterItems();
    }, [items, debouncedQuery]);

    return { filteredItems, setSearchQuery };
};

export default useFilter;
