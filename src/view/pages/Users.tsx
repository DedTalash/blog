import React, {useEffect, useState} from 'react';
import {RouteComponentProps} from "@reach/router";
import {useTitle} from "../../utils/useTitle";
import {db} from "../../config/firebase";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import {LinearProgress} from "@material-ui/core";

export enum UserRole {
	ADMIN, USER, MANAGER,GUEST
}

interface User {
	name: string,
	photo: string,
	id: string,
	email: string,
	role: UserRole
}

const Users = (props:  RouteComponentProps) => {

	useTitle('Users');

	const [processing, setProcessing] = useState<boolean>(false);
	const [users, setUsers] = useState<User[]>([]);

	useEffect(() => {
		setProcessing(true);
		return db.collection('users').onSnapshot(snapshot => {
			const users: User[] = [];
			setProcessing(false);
			snapshot.forEach((user) => {
				users.push(user.data() as User);
			})
			setUsers(users);
		});
	}, []);

	const getRoleLabel = (role: UserRole): string => {
		switch (role){
			case UserRole.ADMIN: return 'Administrator'
			case UserRole.USER: return 'User'
			case UserRole.MANAGER: return 'Manager'
			case UserRole.GUEST: return 'Guest'
		}
	}

	return (
		<>
			<TableContainer component={Paper}>
				<Table  aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>Name</TableCell>
							<TableCell>Email</TableCell>
							<TableCell>Role</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{users.map(user => (
							<TableRow key={user.id}>
								<TableCell>
									{user.name}
								</TableCell>
								<TableCell>
									{user.email}
								</TableCell>
								<TableCell>
									{getRoleLabel(user.role)}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
				{processing && <div className="line">
					<LinearProgress color="secondary"/>
				</div>}
			</TableContainer>
		</>
	);
};

export default Users;