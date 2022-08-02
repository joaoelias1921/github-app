import Home from "pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StandardPage from "pages/StandardPage";
import { GithubUserProvider } from "common/context/GithubUser";
import ProfileStandard from "pages/ProfileStandard";

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
						</Route>
					</Routes>		
				</GithubUserProvider>								
			</Router>
		</main>
	);
}