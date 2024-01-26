import React from "react";
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import Dashboard from './pages/Dashboard';
import Vacancies from './pages/Vacancies';
import Companies from "./pages/Companies";

import Navigation from './components/Navigation';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const App = () => {

  const createNotification = (type, message) => {
    if (type === "info") {
      NotificationManager.info(message);
    } else if (type === "success") {
      NotificationManager.success(message);
    } else if (type === "warning") {
      NotificationManager.warning(message);
    } else if (type === "error") {
      NotificationManager.error(message);
    }
  };


  return (
    <div className="App">
      <BrowserRouter basename="/">
      <NotificationContainer />
      <Navigation />
      <div id="environment">
        <Routes>
          <Route path="/" element={<Dashboard createNotification={createNotification} />} />
          <Route path="/vacancies" element={<Vacancies createNotification={createNotification} />} />
          <Route path="/companies" element={<Companies createNotification={createNotification} />} />
        </Routes>
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
