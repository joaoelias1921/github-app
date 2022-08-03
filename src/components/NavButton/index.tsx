import classNames from "classnames";
import React from "react";
import styles from "./NavButton.module.scss";
import { NavLink } from 'react-router-dom';

type Props = {
    children: string,
    state?: boolean,
    onClick?: React.MouseEventHandler<HTMLButtonElement>,
    link: string
}

const NavButton = ({ children, state, onClick, link }: Props) => {
    return (
        <NavLink 
            style={{width: "100%", color: "white", textDecoration: "none"}} 
            to={link}
        >
            <button
                className={classNames({                            
                    [styles.navBtn]: true,
                    [styles.selected]: state
                })}
                onClick={onClick}            
            >
                    {children}            
            </button>
        </NavLink>
    );
}

export default NavButton;