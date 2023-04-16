import './App.scss'
import Nav from './components/Navigation/Nav'
import { BrowserRouter as Router } from 'react-router-dom'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Audio } from 'react-loader-spinner'

import AppRoutes from './routes/AppRoutes'
import { useContext } from 'react'
import { UserContext } from './Context/UserContext'

function App() {
    const { user } = useContext(UserContext)
    return (
        <Router>
            {user && user.isLoading ? (
                <>
                    <div className='audio-container'>
                        <Audio
                            heigth='100'
                            width='100'
                            color='orange'
                            ariaLabel='loading'
                        />
                        <div>Loading data ...</div>
                    </div>
                </>
            ) : (
                <>
                    <Nav />

                    <AppRoutes />
                </>
            )}

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
