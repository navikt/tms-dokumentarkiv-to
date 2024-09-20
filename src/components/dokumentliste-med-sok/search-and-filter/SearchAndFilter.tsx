import Filter from "./filter/Filter";
import Search from "./search/search";
import styles from "./SearchAndFilter.module.css"

const SearchAndFilter = () => {
  return(
    <div className={styles.container}>
      <Search />
      <Filter />
    </div>
  )
}

export default SearchAndFilter;