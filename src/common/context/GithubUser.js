import { createContext, useState } from 'react';

export const GithubUserContext = createContext();
GithubUserContext.displayName = "Github User";

export const GithubUserProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);
    const [userRepos, setUserRepos] = useState(null);
    const [userStarreds, setUserStarreds] = useState(null);
    return (
        <GithubUserContext.Provider value={ {
            userData, 
            setUserData, 
            userRepos,
            setUserRepos,
            userStarreds,
            setUserStarreds
        }}>
            {children}
        </GithubUserContext.Provider>
    )
}