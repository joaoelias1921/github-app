import { GithubUserContext } from "common/context/GithubUser";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ProfileRepos.module.scss";

type iUserRepos = {
    name: string,
    html_url: string,
    description: string
}

export default function ProfileRepos() {
    const { userData, userRepos } = useContext(GithubUserContext);
    const navigate = useNavigate();

    useEffect(() => {
        !userData && navigate("/home", {replace: true});
    }, [userData]);

    return(
        <>
            {userRepos && userRepos.length > 0 ?
                <section className={styles.userRepos}>
                    <h1>My repositories</h1>
                    <div className={styles.allRepos}>
                        {userRepos.map((repo: iUserRepos, index: React.Key) => (
                            <div key={index} className={styles.allRepos__repo}>
                                <h3>{repo.name}</h3>
                                <a href={repo.html_url}>{repo.html_url}</a>
                                <p>{repo.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            : 
            <section className={styles.noRepo}>
                <h1>:(</h1>
                <h2>Oops, it looks like you don't have any repositories!</h2>
            </section>
            }
        </>
    );
}