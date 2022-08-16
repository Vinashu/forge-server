import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {ToastContainer} from 'react-toastify';
import {Container} from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';
import {
  	Header,
	PrivateRoute
} from './components';
import {
	Home,
	Login,
	Register,
	Operation,
	Reward,
	Target,
} from './pages';
import {
	Category,
	CategoryAdd,
    CategoryEdit,
    CategoryDetail
} from './pages/category';
import {
	Variable,
	VariableAdd,
    VariableEdit,
    VariableDetail
} from './pages/variable';

function App() {
  return (
    <>
		<Router>
			<Header />
			<Container >
				<Routes>
					<Route path='/' element={<PrivateRoute />} >
						<Route path='/' element={<Home />} />
					</Route>
					<Route path='/home' element={<PrivateRoute />} >
						<Route path='/home' element={<Home />} />
					</Route>
					<Route path='/category' element={<PrivateRoute />} >
						<Route path='/category' element={<Category />} >
							<Route path="add" element={<CategoryAdd />} />
							<Route path=":id" element={<CategoryDetail />} />
							<Route path=":id/edit" element={<CategoryEdit />} />						
							<Route path=":id/detail" element={<CategoryDetail />} />
						</Route>
					</Route>
					<Route path='/variable' element={<PrivateRoute />} >
						<Route path='/variable' element={<Variable />} >
							<Route path="add" element={<VariableAdd />} />
							<Route path=":id" element={<VariableDetail />} />
							<Route path=":id/edit" element={<VariableEdit />} />						
							<Route path=":id/detail" element={<VariableDetail />} />						
						</Route>
					</Route>
					<Route path='/operation' element={<PrivateRoute />} >
						<Route path='/operation' element={<Operation />} />
					</Route>
					<Route path='/reward' element={<PrivateRoute />} >						
						<Route path='/reward' element={<Reward />} />
					</Route>
					<Route path='/target' element={<PrivateRoute />} >						
						<Route path='/target' element={<Target />} />
					</Route>						
					{/* <Route path='logout' element={<Logout />} /> */}
					<Route path='login' element={<Login />} />
					<Route path='register' element={<Register />} />					
				</Routes>			
			</Container>
		</Router>
		<ToastContainer />
		</>   
  );
}

export default App;
