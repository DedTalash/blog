import React, {useEffect, useState} from "react";
import {db} from "../../config/firebase";
import {createStyles, LinearProgress, PropTypes, Theme} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import red from "@material-ui/core/colors/red";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import {connect} from "react-redux";
import {BlogReducers} from "../../redux/store";
import {setTitle} from "../../redux/actions";
import {User} from "firebase";

interface Props {
	postId:string,
	user?: User|null
}
interface Comment {
	id: string,
	comment: string,
	date: string
}

const useStylesCard = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			maxHeight: 200,
			width: '100%',
			overflow: 'auto'
		},
		spacedBlock: {
			marginBottom: theme.spacing(2)
		},
		buttonContainer: {
			marginBottom: theme.spacing(2),
			textAlign: 'right'
		},
		media: {
			height: 0,
			paddingTop: '56.25%', // 16:9

		},
		expand: {
			transform: 'rotate(0deg)',
			marginLeft: 'auto',
			transition: theme.transitions.create('transform', {
				duration: theme.transitions.duration.shortest,
			}),
		},
		expandOpen: {
			transform: 'rotate(180deg)',
		},
		avatar: {
			backgroundColor: red[500],
		},
	}),
);
 	const CommentBlock = (props:Props) => {
	const classes = useStylesCard();
	const postId = props.postId;
	const user = props.user;

	const [comment, setComment] = useState('')
	const [processing, setProcessing] = useState<boolean>(false);
	const [comments, setComments] = useState<Comment[]>([]);

	const handleSubmit = (event:any) => {
		event.preventDefault();
		db.collection('posts').doc(postId).collection('comments').add({
			comment,
			date: new Date().toString()
		});
		setComment('');
	}
	useEffect(() => {
		setProcessing(true);
		return db.collection('posts').doc(postId).collection('comments').onSnapshot(snapshot => {
			const comments: Comment[] = [];
			setProcessing(false);
			snapshot.forEach((comment) => {
				comments.push({
					...comment.data(),
					id: comment.id
				} as Comment);
			})
			setComments(comments);
		});
	}, []);

	const handleChange = (event:any) => {
		setComment(event.target.value);
	};


	// TODO: дизайн йухня
	return(
		<>
			<Container>
				<h3>Comments</h3>

				<Box className={classes.spacedBlock}>
					{comments.map(comment =>
						<Card key={comment.id} className={classes.root}>
							<CardHeader
								avatar={
									<Avatar aria-label="recipe" className={classes.avatar}>
										R
									</Avatar>
								}
								// action={
								// 	<IconButton aria-label="settings">
								// 		<MoreVertIcon />
								// 	</IconButton>
								// }
								title={user?.displayName}
								subheader={new Date(comment.date).toLocaleString()}
							/>
							{/*<CardMedia*/}
							{/*	className={classes.media}*/}
							{/*	// image={}*/}
							{/*	title="Paella dish"*/}
							{/*/>*/}
							<CardContent>
								<Typography variant="body2" color="textSecondary" component="p">
									{comment.comment}
								</Typography>
							</CardContent>
						</Card>)}
				</Box>
				<form autoComplete="off" onSubmit={handleSubmit}>
					<TextField  label="Enter your comment"
					            variant="outlined"
					            className={classes.spacedBlock}
					            fullWidth
					            rows={4}
					            multiline
					            aria-label="My comment"
					            value={comment} placeholder="Maximum 4 rows"
					            onChange={handleChange}/>
					<div className={classes.buttonContainer}>
						<Button
							variant="contained"
							color="primary"
							type="submit"
							size="large"
						>
							Post
						</Button>
					</div>
				</form>

				{processing && <div className="line">
					<LinearProgress color="secondary"/>
				</div>}
			</Container>

		</>
	)

}
export default connect(
	({user}: BlogReducers) => ({user}),
	{setTitle}
)(CommentBlock);