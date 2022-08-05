import styles from "./ProfileInfo.module.scss";
import { GithubUserContext } from "common/context/GithubUser";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "assets/images/github-icon-dark.png";

export default function ProfileInfo() {
    const { userData, setUserData } = useContext(GithubUserContext);
    const navigate = useNavigate();

    const convertUserData = () => {
        if(userData) {
            const convertedData = JSON.stringify(userData,
                (key, value) => (!value) ? 'Not registered' : value
            );
            setUserData(JSON.parse(convertedData));
        }
    }

    useEffect(() => {
        !userData && navigate("/home", {replace: true});
    }, [userData]);

    return(
        <>
            {userData &&
                <section onLoad={convertUserData} className={styles.userInfo}>
                    <div className={styles.mainInfo}>
                        <img className={styles.mainInfo__avatar} src={userData.avatar_url} alt="User Avatar" />
                        <div className={styles.mainInfo__info}>
                            <h3>Github User: <span>{userData.login}</span></h3>
                            <h3>User ID: <span>{userData.id}</span></h3>
                            <h3>Profile on Github: <a target="_blank" href={userData.html_url}>{userData.html_url}</a></h3>
                            <h3>Public Repositories: <span>{userData.public_repos}</span></h3>                            
                            <h3>Followers: <span>{userData.followers}</span></h3>
                            <h3>Following: <span>{userData.following}</span></h3>
                        </div>
                    </div>
                    <div className={styles.secondaryInfo}>
                        <div className={styles.secondaryInfo__first}>
                            <h3>Name: <span>{userData.name}</span></h3>
                            <h3>Email: <span>{userData.email}</span></h3>
                            <h3>Bio: <span>{userData.bio}</span></h3>
                            <h3>Company: <span>{userData.company}</span></h3>
                            <h3>Blog: <span>{userData.blog}</span></h3>
                            <h3>Location: <span>{userData.location}</span></h3>
                        </div>
                        <div className={styles.secondaryInfo__second}>
                            <h3>User Type: <span>{userData.type}</span></h3>
                            <h3>Public Gists: <span>{userData.public_gists}</span></h3>
                            <h3>Twitter: <span>{userData.twitter_username}</span></h3>
                            <h3>Creation date: <span>{(userData.created_at).split("T")[0]}</span></h3>
                            <h3>Last updated at: <span>{(userData.updated_at).split("T")[0]}</span></h3>
                        </div>
                        <div className={styles.secondaryInfo__about}>
                            <img src={Logo} alt="Github Logo" />
                            <p>{new Date().getFullYear()} Github, Inc.</p>
                            <p>All rights reserved</p>
                        </div>
                    </div>
                </section>
            }
        </>
    );
}