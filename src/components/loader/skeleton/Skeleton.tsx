import { Heading, Skeleton } from "@navikt/ds-react";
import styles from "./Skeletone.module.css"

const SkeletonComponent = () => {
  return (
    <div className={styles.container}>
      <Skeleton variant="text" width="70%" height="5rem" />
      <Skeleton variant="text" width="100%" height="4.25rem" />
      <Skeleton variant="text" width="100%" height="4.25rem" />
      <Skeleton variant="text" width="100%" height="4.25rem" />
    </div>
  );
};

export default SkeletonComponent;