import styles from "./Loader.module.css";

export default function Loader() {
  return (
    <div className="container-centered-layout">
      <span className={styles.loader}>Loading</span>
    </div>
  );
}
