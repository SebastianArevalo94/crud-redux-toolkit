import {createSlice} from '@reduxjs/toolkit';

const initialState = ({
	users: []
});

export const userSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		addUser: (state, action) => {
			state.users.push(action.payload)
		},
		deleteUser: (state, action) => { 
			const userFind = state.users.find((user) => user.id === action.payload)
            if (userFind) {
                state.users.splice(state.users.indexOf(userFind), 1)
            }
		},
		editUser: (state, action) => {
			const {id, name, age, email} = action.payload;
			const userFind = state.users.find(user => user.id === id);
			 if(userFind){
			 	userFind.name = name;
			 	userFind.age = age;
			 	userFind.email = email;
			 };
		}
	}
});

export const {addUser, deleteUser, editUser} = userSlice.actions;

export default userSlice.reducer