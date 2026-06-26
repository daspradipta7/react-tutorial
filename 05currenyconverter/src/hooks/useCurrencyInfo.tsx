import { useEffect, useState } from "react";

// Use Record<string, number> to define the structure of currency data
export type CurrencyData = Record<string, number>;

function useCurrencyInfo(currency: string): CurrencyData {
    const [data, setData] = useState<CurrencyData>({});

    useEffect(() => {
        const fetchCurrencyDetails = async () => {
            const result = await fetchCurrencyInfo(currency);
            if (result) {
                setData(result);
            } else {
                setData({}); // Reset to empty object on error or null
            }
        };

        fetchCurrencyDetails();
    }, [currency]);
    
    return data;
}

async function fetchCurrencyInfo(currency: string): Promise<CurrencyData | null> {
    try {
        const response = await fetch(
            `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`
        );
        
        if (!response.ok) throw new Error("Network response was not ok");
        
        const result = await response.json();
        
        // The API returns the currency object nested under the currency key
        return result[currency] || null;
    } catch (error) {
        console.error("Error fetching currency info:", error);
        return null;
    }
}

export default useCurrencyInfo;