import logo from './logo.svg';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from "react";
import { ToastContainer } from 'react-toastify';
import FeedbackForm from "./components/FeedbackForm";

function App() {
    const searchParams = new URLSearchParams(document.location.search);
    const [showModal, setShowModal] = useState(false);
    const email = searchParams.get('email');

    const toggleShow = () => setShowModal(p => !p);

    useEffect(() => {
        setTimeout(() => setShowModal(true), 3000);
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                {/* It will only pop-up once the timeout is complete and email exists in the query params */ }
                { showModal && email ? <FeedbackForm email={email} showModal={toggleShow} /> : null }
            </header>
            <ToastContainer />
        </div>
    );
}

export default App;
