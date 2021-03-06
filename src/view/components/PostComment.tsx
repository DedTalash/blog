import React, {useEffect, useState} from 'react';
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import {createStyles, Theme} from "@material-ui/core";
import {db} from "../../config/firebase";
import Likes from "./Likes";
import useUser from "../../utils/useUser";

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
	}),
);
export interface Comment {
	id: string,
	comment: string,
	date: { toDate(): Date },
	user: any
}

interface Props {
	comment: Comment,
	postId: string
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

export default function PostComment(props: Props)
{
	const user = useUser();
	const classes = useStyles();
	const author = useDoc(props.comment.user.path);

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
				{user.id && <Likes path={`posts/${props.postId}/comments/${props.comment.id}/likes`}
						user={user}/>}
			</div>
		</div>
	);
}