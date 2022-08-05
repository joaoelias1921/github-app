import classNames from "classnames";
import { GithubUserContext } from "common/context/GithubUser";
import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ProfileRepos.module.scss";

type iUserRepos = {
    name: string,
    html_url: string,
    description: string
}

export default function ProfileRepos() {
    const { userData, userRepos } = useContext(GithubUserContext);
    const [searchInput, setSearchInput] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        !userData && navigate("/home", {replace: true});
    }, [userData]);

    const searchRepo = (event: ChangeEvent<HTMLInputElement>) => {
        let lowerCase = event.target.value.toLowerCase();
        setSearchInput(lowerCase);
    }

    const filteredRepos = userRepos.filter((repo: iUserRepos) => {
        if(searchInput == "") {
            return repo;
        }else {
            return repo.name.toLowerCase().includes(searchInput);
        }        
    });

    return(
        <>
            {userRepos && userRepos.length > 0 ?
                <section className={styles.userRepos}>
                    <h1>My repositories</h1>
                    <input
                        className={styles.searchInput}
                        type="text"
                        onChange={searchRepo}
                        placeholder="Search by name..."
                    />
                    <div className={styles.allRepos}>
                        {filteredRepos.length > 0 ?
                            filteredRepos.map((repo: iUserRepos, index: React.Key) => (
                                <div key={index} className={styles.allRepos__repo}>
                                    <h3>{repo.name}</h3>
                                    <a href={repo.html_url}>{repo.html_url}</a>
                                    <p>{repo.description}</p>
                                </div>
                            ))
                        : 
                            <div className={styles.allRepos__noMatches}>
                                <p>No matches for your search, try again!</p>
                            </div>
                        }
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