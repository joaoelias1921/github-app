import classNames from "classnames";
import Logo from "assets/images/github-icon.png";
import { GithubUserContext } from "common/context/GithubUser";
import { useContext, useState } from "react";
import api from "services/api";
import styles from "./Home.module.scss";
import { useNavigate } from "react-router-dom";

export default function Home() {
	const {
		setUserData,
		setUserRepos,
		setUserStarreds,
	} = useContext(GithubUserContext);
	const [user, setUser] = useState("");
	const [errorActive, setErrorActive] = useState(true);
	const navigate = useNavigate();

	const provideUser = async () => {
		if(user) {
			try {
				await api.get(`users/${user}`)
					.then(res => setUserData(res.data));
				await api.get(`users/${user}/repos`)
					.then(res => setUserRepos(res.data));
				await api.get(`users/${user}/starred`)
					.then(res => setUserStarreds(res.data));				
				setErrorActive(true);
				navigate("/profile/info");
			} catch(err) {
				console.log(err);
				setUserData(null);
				setUserRepos(null);
				setUserStarreds(null);
				setErrorActive(false);
			}
		}
	}

	return (
		<>
			<div className={styles.homeTitle}>
				<img src={Logo} alt="Github Logo" />
				<h1 className={styles.homeTitle__title}>Github App</h1>
				<h3 className={styles.homeTitle__subtitle}>Welcome to the Github App! Type your official Github username below to start:</h3>
			</div>
			<div className={styles.userInput}>
				<input 
					type="text" 
					onChange={event => setUser(event.target.value)}
					className={styles.userInput__input}
				/>
				<p 
					className={classNames({
						[styles.userInput__error]: true,
						[styles.invisible]: errorActive
					})}
				>
					Oops, something went wrong, please try again!
				</p>
				<button 
					onClick={provideUser}
					className={classNames({
						[styles.userInput__btn]: true,
						[styles.disabled]: !user
					})}
				>
					Go!
				</button>
			</div>
		</>
	);
}