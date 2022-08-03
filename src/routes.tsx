import Home from "pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StandardPage from "pages/StandardPage";
import { GithubUserProvider } from "common/context/GithubUser";
import ProfileStandard from "pages/ProfileStandard";
import ProfileInfo from "pages/ProfileInfo";
import ProfileRepos from "pages/ProfileRepos";
import ProfileStarredRepos from "pages/ProfileStarredRepos";

export default function AppRouter() {
	return (
		<main className="container">
			<Router>	
				<GithubUserProvider>				
					<Routes>
						<Route path="/" element={<StandardPage />}>
							<Route path="/home" element={<Home />} />
						</Route>
						<Route path="/profile" element={<ProfileStandard />}>
							<Route path="/profile/info" element={<ProfileInfo />} />
							<Route path="/profile/repos" element={<ProfileRepos />} />
							<Route path="/profile/starred" element={<ProfileStarredRepos />} />
						</Route>
					</Routes>		
				</GithubUserProvider>								
			</Router>
		</main>
	);
}