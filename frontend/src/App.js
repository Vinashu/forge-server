import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import { Container } from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';
import { Header, PrivateRoute } from './components';
import { Home, Login, Register } from './pages';
import { Category, CategoryAdd, CategoryEdit, CategoryDetail } from './pages/category';
import { Variable, VariableAdd, VariableEdit, VariableDetail } from './pages/variable';
import { Operation, OperationAdd, OperationEdit, OperationDetail } from './pages/operation';
import { Reward, RewardAdd, RewardEdit, RewardDetail } from './pages/reward';
import { Target, TargetAdd, TargetEdit, TargetDetail } from './pages/target';

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
						<Route path='/operation' element={<Operation />} >
						<Route path="add" element={<OperationAdd />} />
							<Route path=":id" element={<OperationDetail />} />
							<Route path=":id/edit" element={<OperationEdit />} />
							<Route path=":id/detail" element={<OperationDetail />} />
						</Route>
					</Route>
					<Route path='/reward' element={<PrivateRoute />} >
						<Route path='/reward' element={<Reward />} >
							<Route path="add" element={<RewardAdd />} />
							<Route path=":id" element={<RewardDetail />} />
							<Route path=":id/edit" element={<RewardEdit />} />
							<Route path=":id/detail" element={<RewardDetail />} />
						</Route>
					</Route>
					<Route path='/target' element={<PrivateRoute />} >
						<Route path='/target' element={<Target />} >
							<Route path="add" element={<TargetAdd />} />
							<Route path=":id" element={<TargetDetail />} />
							<Route path=":id/edit" element={<TargetEdit />} />
							<Route path=":id/detail" element={<TargetDetail />} />
						</Route>						
					</Route>
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
