import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import HomePage from './pages/HomePage';
import AddPostPage from './pages/AddPostPage';
import EditPostPage from './pages/EditPostPage';
import ViewPostPage from './pages/ViewPostPage';
import './styles/global.css';

function App() {
  return (
    <Router>
      <div className="app-shell">
        <Navbar />
        <main className="app-main">
          <div className="container">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/add" element={<AddPostPage />} />
              <Route path="/edit/:id" element={<EditPostPage />} />
              <Route path="/view/:id" element={<ViewPostPage />} />
            </Routes>
          </div>
        </main>
        <Footer />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#111827',
              color: '#fff',
              borderRadius: '8px',
              boxShadow: '0 18px 50px rgba(15, 23, 42, 0.24)',
            },
            success: {
              iconTheme: {
                primary: '#0f9f8f',
                secondary: '#fff',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
      </div>
    </Router>
  );
}

export default App;
