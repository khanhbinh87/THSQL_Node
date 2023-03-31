import './App.scss'
// import Nav from './components/Navigation/Nav'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Login from './components/Login/Login'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Register from './components/Register/Register'
function App() {
    return (
        <Router>
            {/* <Nav /> */}
            <Switch>
                <Route path='/' exact>
                    Home
                </Route>
                <Route path='/news'>News</Route>
                <Route path='/about'>About</Route>
                <Route path='/login'>
                    <Login />
                </Route>
                <Route path='/register'>
                    <Register />
                </Route>
                <Route path='/contact'>Contact</Route>
                <Route path='*'>404 Not Found</Route>
            </Switch>
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
