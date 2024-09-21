/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useState } from "react";

// Debounce function to delay the execution of the search request
function debounce(func: (...args: any[]) => void, wait: number) {
  let timeout: NodeJS.Timeout;
  return function executedFunction(...args: any[]) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function AutocompleteField() {
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  // Handle input change and trigger search
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setInputValue(query);
    fetchSearchResults(query); // Fetch search results as the user types
  };

  // Fetch search results with debounce to limit API requests
  // const fetchSearchResults = useCallback(
  //   ,
  //   []
  // );
  const fetchSearchResults = debounce(async (query: string) => {
    if (query.length < 3) {
      setSearchResults([]); // Clear results if query is too short
      return;
    }

    try {
      const response = await axios.get(`/api/search?query=${query}`);
      setSearchResults(response.data.results || []); // Set the search results
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  }, 500);
  // Render the search results below the input field
  return (
    <div className="autocomplete-container">
      <Input
        className="pl-8"
        placeholder="Search anything in Nori..."
        onChange={handleInputChange}
        value={inputValue}
      />

      {/* Render search results if available */}
      {searchResults.length > 0 && (
        <ul className="search-results-list">
          {searchResults.map((result, index) => (
            <li key={index} className="search-result-item">
              {result.serviceName} {/* Adjust based on your API response */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AutocompleteField;
