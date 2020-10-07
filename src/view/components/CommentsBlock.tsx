import React, {useEffect, useState} from "react";
import {db} from "../../config/firebase";
import {LinearProgress} from "@material-ui/core";

interface Props {
	postId:string
}
interface Comment {
	comment: string,
	date: string
}

export const CommentBlock = ({ postId }:Props) => {

	const [comment, setComment] = useState('')
	const [processing, setProcessing] = useState<boolean>(false);
	const [comments, setComments] = useState<Comment[]>([]);

	const handleSubmit = (event:any) => {
		event.preventDefault();
		db.collection('posts').doc(postId).collection('comments').add({
			comment,
			date: new Date()
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
			<form onSubmit={handleSubmit}>
				<label> Giv me comment</label>
				<textarea value={comment} onChange={handleChange}/>
				<button type="submit"> Submit </button>
			</form>
			{/* TODO: йухня - Comment */}
			{comments.map(comment => <div>
				{comment.comment}
				{new Date(comment.date).toLocaleString()}
			</div>)}
			{processing && <div className="line">
				<LinearProgress color="secondary"/>
			</div>}
		</>
	)

}


