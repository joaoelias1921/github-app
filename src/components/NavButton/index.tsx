import classNames from "classnames";
import React from "react";
import styles from "./NavButton.module.scss";

type Props = {
    children: string,
    state: boolean,
    onClick: React.MouseEventHandler<HTMLButtonElement>
}

const NavButton = ({ children, state, onClick }: Props) => {
    return (
        <button
            className={classNames({                            
                [styles.navBtn]: true,
                [styles.selected]: state
            })}
            onClick={onClick}
        >
            {children}
        </button>
    );
}

export default NavButton;