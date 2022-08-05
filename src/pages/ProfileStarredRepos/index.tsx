import { GithubUserContext } from "common/context/GithubUser";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReposList from "components/ReposList";

export default function ProfileStarredRepos() {
    const { userData, userStarreds } = useContext(GithubUserContext);
    const navigate = useNavigate();

    useEffect(() => {
        !userData && navigate("/home", {replace: true});
    }, [userData]);

    return(
        <>
            <ReposList repos={userStarreds} isStarred={true}/>
        </>
    );
}