import { Search as SearchBar } from "@navikt/ds-react";
import { searchAtom, setSearchAtom } from "@store/store";

const Search = () => {

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleOnChange = (value: string) => {
    setSearchAtom(value)
  }

  return (
    <form role="search" onSubmit={handleSubmit}>
      <SearchBar label="Søk på siden" variant="simple" onChange={handleOnChange}/>
    </form>
  );
};

export default Search;
