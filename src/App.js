import './App.css';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import Home from './functions/authentication/Home';
import Header from './functions/admin/Header';
import LoginForm from './functions/Authentication/LoginForm';
import {store,persistor} from "./redux/store";
import AdminSidebar from './functions/admin/AdminSidebar';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<h2>loading...</h2>} persistor={persistor}>
        <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/login" element={<LoginForm/>} />
          <Route path="/sidebar" element={<AdminSidebar/>}/>
          <Route path="/" element={<Home/>} />
        </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
