import React, {useEffect, useState} from 'react';
import {navigate, RouteComponentProps} from "@reach/router";
import {useTitle} from "../../utils/useTitle";
import {db, firebase} from "../../config/firebase";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import AppLoader from "../components/AppLoader";
import DropDown from "../components/DropDown";
import ArrowDropDownSharpIcon from "@material-ui/icons/ArrowDropDownSharp";
import {makeStyles} from "@material-ui/core/styles";

export enum UserRole {
    ADMIN, USER, MANAGER, GUEST
}

const useStyles = makeStyles(() => ({
	menu: {
		fontSize: 16
	},
	arrow: {
		fontSize: 15
	}
}));

interface User {
    name: string,
    photo: string,
    id: string,
    email: string,
    role: UserRole
}

const Users = (props: RouteComponentProps) => {
    useTitle('Users');
	const classes = useStyles();
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
        switch (role) {
            case UserRole.ADMIN:
                return 'Administrator'
            case UserRole.USER:
                return 'User'
            case UserRole.MANAGER:
                return 'Manager'
            case UserRole.GUEST:
                return 'Guest'
        }
    }
const setRoleUser = (id:string, role: UserRole ): void =>{
	db.collection('users').doc(id).update({role: role})
}
    return <AppLoader loading={processing}>
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
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
                                <DropDown items={[
                                    ['Users', () => {setRoleUser(user.id,UserRole.USER)}],
                                    ['Management', () => {setRoleUser(user.id,UserRole.MANAGER)}],
                                    ['Admin', () => {setRoleUser(user.id,UserRole.ADMIN)}],
                                ]}>
									<div className={classes.menu}>
										{getRoleLabel(user.role)}
									</div>
									<ArrowDropDownSharpIcon className={classes.arrow} />
                                </DropDown>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </AppLoader>
};

export default Users;