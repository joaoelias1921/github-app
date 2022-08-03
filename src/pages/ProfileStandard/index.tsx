import { GithubUserContext } from "common/context/GithubUser";
import { useContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import styles from "./ProfileStandard.module.scss";
import NavButton from "components/NavButton";

export default function ProfileStandard() {
    const { userData } = useContext(GithubUserContext);
	const navigate = useNavigate();
    const [userSelected, setUserSelected] = useState(true);
    const [reposSelected, setReposSelected] = useState(false);
    const [starredSelected, setStarredSelected] = useState(false);

    useEffect(() => {
        !userData && navigate("/home", {replace: true});
    }, [userData]);

    const clearSelections = () => {
        setUserSelected(false);
        setReposSelected(false);
        setStarredSelected(false);
    }

    return(     
        <section className={styles.mainContainer}>
            <section className={styles.navContainer}>
                <div className={styles.navContainer__userInfo}>
                    <img className={styles.avatar} src={userData && userData.avatar_url} alt="User Avatar" />
                    <p>Welcome, {userData && userData.login}</p>
                </div>
                <div className={styles.navContainer__btnContainer}>
                    <NavButton 
                        onClick={() => {clearSelections(), setUserSelected(!userSelected)}}
                        state={userSelected}
                    >
                        My profile
                    </NavButton>
                    <NavButton 
                        onClick={() => {clearSelections(), setReposSelected(!reposSelected)}}
                        state={reposSelected}
                    >
                        Repositories
                    </NavButton>
                    <NavButton 
                        onClick={() => {clearSelections(), setStarredSelected(!starredSelected)}}
                        state={starredSelected}
                    >
                        Starred repositories
                    </NavButton>
                </div>
            </section>
            <section className={styles.dataContainer}>
                <Outlet />
            </section>
        </section>
    );
}