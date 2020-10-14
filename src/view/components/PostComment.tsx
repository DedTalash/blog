import React, {useEffect, useState} from 'react';
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import {createStyles, Theme} from "@material-ui/core";
import {db} from "../../config/firebase";
import {ThumbDown, ThumbUp} from "@material-ui/icons";


const useStyles = makeStyles((theme: Theme) =>
	createStyles({

		avatar: {
			display: 'inline-block',
			float: 'left',
			width: 80,
			height: 80,
			marginRight: 30,
			webkitBorderRadius: '50%',
			moBorderRadius: '50%',
			msBorderRadius: '50%',
			borderRadius: '50%'
		},

		commentContent: {
			position: 'relative',
			width: '100%',
			display: 'block'
		},
		commentAuthor: {
			display: 'inline-block',
			width: '100%'
		},
		commentAuthorName: {
			fontWeight: 600,
			margin: '5px 0 8px',
			float: 'left',
			fontSize: 14
		},
		commentData: {
			float: 'right',
			textAlign: 'right',
			fontSize: 10,
			lineHeight: '2.5',
			textTransform: 'uppercase',
			letterSpacing: '.1em'
		},
		commentText: {
			margin: 0,
			padding: 0,
			border: 0,
			outline: 0,
			font: 'inherit',
			verticalAlign: 'baseline',
			fontFamily: 'inherit',
			fontStyle: 'inherit',
			fontWeight: 'inherit',
			wordBreak: 'break-all'
		},
		commentArea: {
			display: 'flex',
			marginBottom: 30,
			paddingBottom: 30,
			borderBottom: '1px solid #f1f1f1'
		},
		likes: {
			maxHeight: 200,
			width: '100%',
			display: 'block',
			textAlign: 'right'
		},
		buttonContainer: {
			marginBottom: theme.spacing(2),
			marginRight: theme.spacing(2)
		},
	}),
);
export interface Comment {
	id: string,
	comment: string,
	date: { seconds: number, toDate(): Date },
	user: any
}

interface Props {
	comment: Comment
}
interface Like {
	type: boolean,
	date: string,
	uid: string
}
function useDoc(path: string) {
	const [doc, setDoc] = useState()
	useEffect(() => {
		return db.doc(path).onSnapshot( doc => {
			setDoc({
				...doc.data(),
				id: doc.id
			})
		})
	}, [path])
	return doc;
}

const PostComment = (props: Props) => {
	const classes = useStyles();
	const author = useDoc(props.comment.user.path);
	const [likesValue, setLikesValue] = useState<number>(0)
	const [canLike, setCanLike] = useState<boolean>(false)
	const handleLike = (type: boolean) => {
		db.doc(props.comment.user.path).collection('comments').
		doc(props.comment.id).collection('likes').add({
			type,
			date: new Date().toString(),
			uid: props.comment.user?.id

		});
	}
	useEffect(() => {
		return db.doc(props.comment.user.path).collection('comments')
			.doc(props.comment.id).collection('likes').onSnapshot(snapshot => {
				let canLike = true;
				let value = 0;
				snapshot.forEach((like) => {
					const userLike = like.data() as Like;

					if (userLike.type) {
						value++;
					} else {
						value--;
					}

					if (userLike.uid === props.comment.user?.id) {
						canLike = false;
					}
				})
				setLikesValue(value);
				setCanLike(canLike);
			});
	}, [props.comment.id,props.comment.user.id]);
	return (
		<div className={classes.commentArea}>
			<ListItemAvatar className={classes.avatar}>
				<Avatar alt="Remy Sharp" src={author?.photo}/>
			</ListItemAvatar>
			<div className={classes.commentContent}>
				<div className={classes.commentAuthor}>
                                <span className={classes.commentAuthorName}>
                                {author?.name}
                                </span>
					<span className={classes.commentData}>
                                    {props.comment.date.toDate().toLocaleTimeString()}
                                </span>
				</div>
				<Typography className={classes.commentText}>
					{props.comment.comment}
				</Typography>
				<div className={classes.likes}>
					{likesValue}
					{props.comment.user && canLike && <>
						<ThumbUp className={classes.buttonContainer} onClick={handleLike.bind(null, true)}/>
						<ThumbDown className={classes.buttonContainer} onClick={handleLike.bind(null, false)}/>
					</> }
				</div>
			</div>
		</div>
	);
};

export default PostComment;