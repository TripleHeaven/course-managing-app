import clsx from 'clsx';
import { Navigation } from '../Navigation';
import styles from './Layout.module.scss';

type LayoutProps = {
  children?: React.ReactNode;
  className?: string;
};

export const Layout = ({ children, className }: LayoutProps) => {
  return (
    <div className={clsx(styles.container, className)}>
      <Navigation />
      <div className={styles.innerContainer}>{children}</div>
    </div>
  );
};
