import React, {useEffect, useState} from 'react';
import {Link, RouteComponentProps} from "@reach/router";
import {useTitle} from "../../utils/useTitle";
import Post, {PostInterface} from "../../models/Post";
import {db} from "../../config/firebase";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import {Create, Delete} from "@material-ui/icons";
import AppLoader from "../components/AppLoader";
import {useCollection} from "../../utils/useCollection";

const useStyles = makeStyles({
	table: {
		minWidth: 650,
	},
});


const Management = (props:  RouteComponentProps) => {

	useTitle('Management');

	const [posts, processing] = useCollection<Post>('posts', snapshot => {
		const posts: Post[] = [];
		snapshot.forEach((post) => {
			posts.push(Post.createFromData(post.data() as PostInterface, post.id));
		})
		return posts;
	});

	const classes = useStyles();

	function handleDelete(postId: string) {
		db.doc(`posts/${postId}`).delete();
	}

	return <AppLoader loading={processing}>
				<Link to="/management/create"  role="button" >
					<button type="button">
						Add new post
					</button>
				</Link>
				<br/>
				<br/>
				<br/>
				<br/>
				<TableContainer component={Paper}>
					<Table className={classes.table} aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell>Title</TableCell>
								<TableCell>Author</TableCell>
								<TableCell/>
							</TableRow>
						</TableHead>
						<TableBody>
							{posts.map(post => (
								<TableRow key={post.id}>
									<TableCell component="th" scope="row">
										{post.title}
									</TableCell>

									<TableCell>
										<ButtonGroup variant="contained" color="primary">
											<Link to={`/management/edit/${post.id}`}><Create/></Link>
											<Button onClick={handleDelete.bind(null, post.id)}><Delete/></Button>
										</ButtonGroup>
									</TableCell>
									{/*<TableCell>{post.publishedAt}</TableCell>*/}
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</AppLoader>
};

export default Management;


