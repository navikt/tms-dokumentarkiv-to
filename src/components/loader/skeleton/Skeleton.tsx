import { Skeleton } from "@navikt/ds-react";
import styles from "./Skeletone.module.css"

const SkeletonComponent = () => {
  return (
    <div className={styles.container}>
      <Skeleton variant="text" width="60%" height="5rem" />
      <Skeleton variant="text" width="100%" height="3.5rem" />
      <Skeleton variant="text" width="100%" height="3.5rem" />
      <Skeleton variant="text" width="100%" height="3.5rem" />
    </div>
  );
};

export default SkeletonComponent;