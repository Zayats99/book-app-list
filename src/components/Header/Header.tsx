import { FC } from "react";
import { NavLink } from "react-router-dom";

import { Container, Nav, Navbar } from "react-bootstrap";
import classes from "./Header.module.css";

export const Header: FC = () => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <div className={classes.brand}>Book-App-List</div>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse
          id="responsive-navbar-nav"
          className="justify-content-end"
        >
          <Nav>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? [classes.active, classes.link].join(" ")
                  : classes.link
              }
              to="/"
            >
              Dashboard
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? [classes.active, classes.link].join(" ")
                  : classes.link
              }
              to="/add-book"
            >
              Add Book
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
