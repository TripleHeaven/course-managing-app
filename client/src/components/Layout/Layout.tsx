import { Navigation } from '../Navigation';
import styles from './Layout.module.scss';

type LayoutProps = {
  children?: React.ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className={styles.container}>
      <Navigation />
      <div className={styles.innerContainer}>{children}</div>
    </div>
  );
};
