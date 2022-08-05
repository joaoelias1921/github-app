import React, { ChangeEvent, useState } from "react";
import styles from "./ReposList.module.scss";
import { AiOutlineStar } from "react-icons/ai";
import classNames from "classnames";

type iUserRepos = {
    name: string,
    html_url: string,
    description: string
}

type Props = {
    repos: Array<iUserRepos>,
    isStarred: boolean
}

export default function ReposList({ repos, isStarred }: Props) {
    const [searchInput, setSearchInput] = useState("");

    const searchRepo = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchInput(event.target.value.toLowerCase());
    }

    const filteredRepos = repos && repos.filter((repo: iUserRepos) => {
        if(searchInput == "") {
            return repo;
        }else {
            return repo.name.toLowerCase().includes(searchInput);
        }        
    });

    return(
        <>
            {repos && repos.length > 0 ?
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
                                    <div className={styles.titleContainer}>
                                        <h3>{repo.name}</h3>
                                        <AiOutlineStar
                                            className={classNames({
                                                [styles.invisible]: !isStarred
                                            })}
                                            size={30} 
                                            color={"#ffd900"}
                                        />
                                    </div>
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
                <h2>Oops, it looks like you don't have any {isStarred && "starred"} repositories!</h2>
            </section>
            }
        </>
    );
}