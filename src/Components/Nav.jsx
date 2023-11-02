import { NavLink } from "react-router-dom";
import styles from "./Nav.module.css";

export function Nav() {
  return (
    <nav className={styles.container}>
      <ul>
        <li>
          <NavLink to="/calc">Calculator</NavLink>
        </li>
        <li>
          <NavLink to="/age">Age cal</NavLink>
        </li>
        <li>
          <NavLink to="/sign">Sign in</NavLink>
        </li>
      </ul>
    </nav>
  );
}
