import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {ToastContainer} from 'react-toastify';
import {Container} from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';
import {
  	Header
} from './components';
import {
	Home,
	Login,
	Register,
	Category,
	Operation,
	Reward,
	Target,
	Variable,
	Logout
} from './pages';

function App() {
  return (
    <>
		<Router>
			<Header />
			<Container >Bla</Container>
			<Container >Bla</Container>
			<Container >Bla</Container>
			<Container >
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/home' element={<Home />} />
					<Route path='/login' element={<Login />} />
					<Route path='/register' element={<Register />} />
					<Route path='/category' element={<Category />} />
					<Route path='/operation' element={<Operation />} />
					<Route path='/reward' element={<Reward />} />
					<Route path='/target' element={<Target />} />
					<Route path='/variable' element={<Variable />} />
					<Route path='/logout' element={<Logout />} />
				</Routes>
			<Container >
				<Routes>
					<Route path='/logout' element={<Target />} />
				</Routes>
			</Container>					
			</Container>
		</Router>
		<ToastContainer />
		</>   
  );
}

export default App;
