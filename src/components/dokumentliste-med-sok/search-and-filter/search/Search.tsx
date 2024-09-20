import { Search as SearchBar } from "@navikt/ds-react";

const Search = () => {

  const handleSearch = () => {
    
  }

  return (
    <form role="search" onSubmit={handleSearch}>
      <SearchBar label="Søk på siden" variant="simple"/>
    </form>
  );
};

export default Search;
