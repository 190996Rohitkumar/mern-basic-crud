import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter,Routes,Route } from 'react-router-dom';

import Navbar from './component/navbar';
import App from './App';
import Create from './component/Create';
import Read from './component/Read';
import Update from './component/Update';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div>
   
    <BrowserRouter>
      <Navbar />
      <Routes>
          <Route path="/" element={<App />} />
          <Route path="/create" element={<Create />} />
          <Route path="/read" element={<Read />} />
          <Route path="/updateuser/:id" element={<Update />} />
      </Routes>
    </BrowserRouter>
    
  </div>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

