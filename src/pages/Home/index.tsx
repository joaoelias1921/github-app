import classNames from "classnames";
import Logo from "assets/images/github-icon.png";
import { GithubUserContext } from "common/context/GithubUser";
import { useContext, useState } from "react";
import api from "services/api";
import styles from "./Home.module.scss";

export default function Home() {
	const {
		setUserData, 
		setUserRepos 
	} = useContext(GithubUserContext);
	const [user, setUser] = useState("");

	const provideUser = async () => {
		if(user != "") {
			try {
				await api.get(`users/${user}`)
					.then(res => setUserData(res.data));
				await api.get(`users/${user}/repos`)
					.then(res => setUserRepos(res.data));
			} catch(err) {
				console.log(err);
				setUserData(null);
				setUserRepos(null);
			}
		}		
	}

	return (
		<section className={styles.mainContainer}>
			<div className={styles.homeTitle}>
				<img src={Logo} alt="Github Logo" />
				<h1 className={styles.homeTitle__title}>Github App</h1>
				<h3 className={styles.homeTitle__subtitle}>Welcome to the Github App! Type your username or user ID below to start:</h3>
			</div>
			<div className={styles.userInput}>
				<input 
					type="text" 
					onChange={event => setUser(event.target.value)}
					className={styles.userInput__input}
				/>
				<button 
					onClick={provideUser}
					className={classNames({
						[styles.userInput__btn]: true,
						[styles.disabled]: !user
					})}
				>
					Enviar
				</button>
			</div>
		</section>
	);
}