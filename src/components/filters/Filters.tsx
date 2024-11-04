import Periodefilter from "./time-based-filters/Periodefilter";
import styles from "./Filters.module.css"
import DokumentdataFilter from "./document-data-filters/DokumentdataFilter";

const SearchAndFilter = () => {
  return(
    <div className={styles.container}>
      <Periodefilter />
      <DokumentdataFilter />
    </div>
  )
}

export default SearchAndFilter;