import type { SearchBarProps } from "../types/SearchBarProps.ts";

export default function SearchBar(props: SearchBarProps) {
  return (
    <form>
        <input 
            type="text" 
            placeholder="Search..." 
            style={{ width: '100%' }} 
            value={props.filterText} 
            onChange={(e) => props.setFilterText(e.target.value)}
            />
        <label>
            <input 
                type="checkbox" 
                checked={props.inStockOnly} 
                onChange={(e) => props.setInStockOnly(e.target.checked)}
            />
            { ' ' }
            Only show products in stock
       </label>
    </form>
  )
}