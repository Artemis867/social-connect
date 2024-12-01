import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './compoents/login/LoginPage';
import Profile from './pages/Profile';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { useDispatch, useSelector } from 'react-redux';
import { closeToast } from './actions';


function App() {
  const toast = useSelector((state: any) => state.toast);
  const dispatch = useDispatch();

  const toastMarkup = toast?.active && (
      <div
        aria-live="polite"
        aria-atomic="true"
        className="position-relative"
        style={{ minHeight: '240px' }}
      >
        <ToastContainer
          className="p-3"
          position={'bottom-end'}
          style={{ zIndex: 1 }}
        >
          <Toast show={toast?.active}>
            <Toast.Header closeButton={false}>
              <img
                src="holder.js/20x20?text=%20"
                className="rounded me-2"
                alt=""
              />
              <strong className="me-auto">Notification</strong>
              <button style={{
                border: 'none',
              }} onClick={() => dispatch(closeToast())}>X</button>
            </Toast.Header>
            <Toast.Body>{toast?.content}</Toast.Body>
          </Toast>
        </ToastContainer>
      </div>
    );

  const routesMarkup = (
    <Router>
        <Routes>
          {/* Your routes go here */}
          <Route path="/" element={<LoginPage />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
  );

  return (
    <>
      {routesMarkup}
      {toastMarkup}
    </>
  );
}

export default App;
