import React from 'react';
import Header from "./components/Header"
import Footer from "./components/Footer"
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import SignupPage from './pages/Signup';
import LoginPage from './pages/Login';
import Main from './pages/Main';
import TeamNews from './pages/TeamNews';
import NewsArticle from './pages/NewsArticle';
import ChampionshipNews from './pages/ChampionshipNews';
import CreatePost from './pages/CreatePost';

export default function App() {
  return (
    <div>
      <Header />
      <div className=" p-10 mb-10"> {/* Adjust the top margin to accommodate the header */}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/teamNews/:team" element={<TeamNews />} />
            <Route path="/news/:id" element={<NewsArticle />} />
            <Route path="/:championship" element={<ChampionshipNews />} />
            <Route path="/createPost" element={<CreatePost />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </Routes>
        </BrowserRouter>
      </div>
      <Footer />
    </div>
  );
}
