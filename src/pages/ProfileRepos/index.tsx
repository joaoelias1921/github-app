import { GithubUserContext } from "common/context/GithubUser";
import ReposList from "components/ReposList";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ProfileRepos() {
    const { userData, userRepos } = useContext(GithubUserContext);
    const navigate = useNavigate();

    useEffect(() => {
        !userData && navigate("/home", {replace: true});
    }, [userData]);

    return(
        <>
            <ReposList repos={userRepos} isStarred={false}/>
        </>
    );
}