import type React from "react";

interface SearchBarProps {
    filterText: string;
    inStockOnly: boolean;
    setInStockOnly: React.Dispatch<React.SetStateAction<boolean>>;
    setFilterText: (text: string) => void;
}

export type { SearchBarProps }