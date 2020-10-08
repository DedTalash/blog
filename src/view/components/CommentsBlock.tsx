import React, {useEffect, useState} from "react";
import {db} from "../../config/firebase";
import {createStyles, LinearProgress, Theme} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import red from "@material-ui/core/colors/red";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import CardMedia from "@material-ui/core/CardMedia";
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
	comment: string,
	date: string
}
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			'& > *': {
				margin: theme.spacing(1),
				width: '25ch',
			},
		},
	}),
);
const useStylesCard = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			maxHeight: 200,
			width: '100%',
			overflow: 'auto'
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
	const classes = useStyles();
	const classesCard = useStylesCard();
	const postId = props.postId;
	const user = props.user;
	const [expanded, setExpanded] = React.useState(false);
	const handleExpandClick = () => {
		setExpanded(!expanded);
	};
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
				comments.push(comment.data() as Comment);
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
				<form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
						<TextField  id="outlined-secondary"
									label="Outlined secondary"
									variant="outlined"
									color="secondary"
									rowsMax={4} aria-label="My comment"
									value={comment} placeholder="Maximum 4 rows"
									onChange={handleChange}/>
					<div>
						<Button
							variant="contained"
							color="primary"
							type="submit"
						>
							Submit
						</Button>
					</div>
				</form>
				<Box border={1}>
					{comments.map(comment =>
						<Card className={classesCard.root}>
							<CardHeader
								avatar={
									<Avatar aria-label="recipe" className={classesCard.avatar}>
										R
									</Avatar>
								}
								// action={
								// 	<IconButton aria-label="settings">
								// 		<MoreVertIcon />
								// 	</IconButton>
								// }
								title={user?.displayName}
								subheader="September 14, 2016"
							/>
							{/*<CardMedia*/}
							{/*	className={classesCard.media}*/}
							{/*	// image={}*/}
							{/*	title="Paella dish"*/}
							{/*/>*/}
							<CardContent>
								<Typography variant="body2" color="textSecondary" component="p">
									<div>{comment.comment}</div>
											{/*<div>{comment.date as string}</div>*/}
								</Typography>
							</CardContent>
						</Card>)}
				</Box>

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