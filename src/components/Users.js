import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {addUser, deleteUser, editUser} from '../redux/userSlice';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import './Users.css';

const Users = () => {

	 const idGenerator = () => {
	    const CHARS =
	      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	    let autoId = "";

	    for (let i = 0; i < 20; i++) {
	      autoId += CHARS.charAt(Math.floor(Math.random() * CHARS.length));
	    }
	    return autoId;
  	};

  	const initialState = ({
		id: "",
		name: "",
		age: "",
		email: "",
  	});

	const [user, setUser] = useState(initialState);
	const [action, setAction] = useState('Agregar');

	const handleInputChange = ({target}) => {
		setUser({
			...user,
			[target.name]: target.value
		})
	};

	const dispatch = useDispatch();

	const handleSubmit = (e) => {
		e.preventDefault();
		if(action ==='Agregar') {
			dispatch(addUser({...user, id: idGenerator()}));
		} else {
			dispatch(editUser(user));
			setAction('Agregar');
		}
		setUser(initialState);
		
	};

	const state = useSelector(state => state.users);

	const handleEdit = (id) => {
		const userToEdit = state.users.find(user => user.id === id);
		if(userToEdit){
			setUser(userToEdit);
			setAction('Editar');
		};
	};

	const handleDelete = (id) => {
		dispatch(deleteUser(id))
	};


	return(
		<div className="global">
			<Box className='form-container' component={Paper}>
				<form className='form' onSubmit={handleSubmit}>
					<FormLabel sx={{ml:1, mb:-1, fontSize:25}}>Nombre</FormLabel>
			      	<TextField name="name" id="name" label="Nombre" variant="filled" value={user.name} onChange={handleInputChange}/>
			      	<FormLabel sx={{ml:1, mb:-1, fontSize:25}}>Edad</FormLabel>
			      	<TextField name="age" id="age" type='number' label="Edad" variant="filled" value={user.age} onChange={handleInputChange} />	
			      	<FormLabel sx={{ml:1, mb:-1, fontSize:25}}>Correo</FormLabel>
			      	<TextField name="email" id="email" type='email' label="Correo" variant="filled" value={user.email} onChange={handleInputChange} />
			      	<Button variant="contained" type="submit" size="medium">
			          {
			          	action
			          }
			        </Button>
		    	</form>
			</Box>
	    	<TableContainer sx={{width: 500, m:2, height: 1}} component={Paper}>
	      <Table aria-label="simple table">
	        <TableHead> 
	          <TableRow>
	            <TableCell align="center">Nombre</TableCell>
	            <TableCell align="center">Edad</TableCell>
	            <TableCell align="center">Correo</TableCell>
	            <TableCell align="center">Accion</TableCell>
	          </TableRow>
	        </TableHead>
	        <TableBody>

				{
					state.users.map(user =>(
						<TableRow key={user.id}>
			              <TableCell align="center">{user.name}</TableCell>
			              <TableCell align="center">{user.age}</TableCell>
			              <TableCell align="center">{user.email}</TableCell>
			              <TableCell align="center">
				              <EditIcon color='info' onClick={()=>handleEdit(user.id)}/>
				              <DeleteIcon color='error' onClick={()=>handleDelete(user.id)}/>
			              </TableCell>
	            		</TableRow>
						))
				}

	        </TableBody>
	      </Table>
	    </TableContainer>
		</div>
		)
};

export default Users