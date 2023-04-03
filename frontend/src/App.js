import './App.scss'
import Nav from './components/Navigation/Nav'
import { BrowserRouter as Router} from 'react-router-dom'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'



import AppRoutes from './routes/AppRoutes'

function App() {
  
    return (
        <Router>
            <Nav />

            <AppRoutes />

            <ToastContainer
                position='top-right'
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme='light'
            />
        </Router>
    )
}

export default App
