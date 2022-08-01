import Home from "pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StandardPage from "pages/StandardPage";
import { GithubUserProvider } from "common/context/GithubUser";

export default function AppRouter() {
	return (
		<main className="container">
			<Router>	
				<GithubUserProvider>				
					<Routes>
						<Route path="/" element={<StandardPage />}>
							<Route path="/home" element={<Home />} />
						</Route>
					</Routes>		
				</GithubUserProvider>								
			</Router>
		</main>
	);
}