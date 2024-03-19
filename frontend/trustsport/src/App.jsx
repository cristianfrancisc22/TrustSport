import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from "./components/Header";
import Footer from "./components/Footer";
import RootLayout from './layouts/RootLayout';
import SignupPage from './pages/Signup';
import Home from "./components/Home";
import LoginPage from './pages/Login';
import Main from './pages/Main';
import TeamNews from './pages/TeamNews';
import NewsArticle from './pages/NewsArticle';
import ChampionshipNews from './pages/ChampionshipNews';
import CreatePost from './pages/CreatePost';
import SubscriptionPlanPage from './pages/SubscriptionPlanPage';
import Checkout from './components/Checkout';
import Success from "./components/Success";
import Failure from "./components/Failure";

export default function App() {
  return (
    <Router>
    <Header />
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Main />} />
        <Route path="checkout/:price/:duration/:priceId" element={<Checkout />} />
        <Route path="home" element={<Home />} />
        <Route path="post/:team" element={<TeamNews />} />
        <Route path="news/:id" element={<NewsArticle />} />
        <Route path="post/create" element={<CreatePost />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
        <Route path="new-subscription" element={<SubscriptionPlanPage />} />
        <Route path='failure' element={<Failure />} />
        <Route path='success' element={<Success />} />
        <Route path="championship/:championship" element={<ChampionshipNews />} />
        
      </Route>
    </Routes>
    <Footer />
  </Router>
  
  );
}
