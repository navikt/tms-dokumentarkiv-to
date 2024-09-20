//TODO: Chips = valgte filter, Modal = bakgrunn åpnet filtervalg, Checkbox = valg i filtermeny
//Modal fylles av checkbox, returnerer Chips ved lukking eller dynamisk underveis
import { FilterIcon } from "@navikt/aksel-icons";
import styles from "./Filter.module.css";
import { Checkbox, CheckboxGroup, Modal } from "@navikt/ds-react";
import { useRef } from "react";

const Filter = () => {
  const ref = useRef<HTMLDialogElement>(null);

  const FilterCounter = () => {
    return <div className={styles.counter}>2</div>;
  };

  const handleChange = (val: string[]) => console.info(val);

  return (
    <>
      <button className={styles.btn} onClick={() => ref.current?.showModal()}>
        <FilterIcon title="a11y-title" fontSize="1.5rem" />
        Filter
        <FilterCounter />
      </button>
      <Modal className={styles.modal} ref={ref} header={{ heading: "Filter" }} closeOnBackdropClick>
        <Modal.Body>
          <CheckboxGroup legend="" onChange={handleChange}>
            <Checkbox value="vedtak">Vedtak</Checkbox>
            <Checkbox value="inngaende">Inngående</Checkbox>
            <Checkbox value="utgaende">Utgående</Checkbox>
          </CheckboxGroup>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Filter;
