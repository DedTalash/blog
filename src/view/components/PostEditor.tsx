import React, {useState} from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {EditorState, ContentState, convertToRaw} from "draft-js";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker,
} from '@material-ui/pickers';
import {Button} from "@material-ui/core";
import Post from "../../models/Post";
import {connect} from "react-redux";
import {BlogReducers} from "../../redux/store";

import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import {db} from "../../config/firebase";
import {navigate} from "@reach/router";
import User from "../../models/User";

interface Props {
	post: Post,
	user: User
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			display: 'flex',
			flexWrap: 'wrap',
		},
		textField: {
			marginLeft: theme.spacing(1),
			marginRight: theme.spacing(1),
			width: '25ch',
		},
	}),
);

const PostEditor = ({post, user}: Props) => {
	const classes = useStyles();

	// ###################
	const contentBlock = htmlToDraft(post.content);

	const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
	const editorState = EditorState.createWithContent(contentState);
	// ###################

	const [content, setContent] = useState(editorState);
	const [date, setDate] = useState<Date | null>(post.date);
	const [title, setTitle] = useState(post.title);
	const [description, setDescription] = useState(post.description);
	const [alias, setAlias] = useState(post.alias);
	const [photo, setPhoto] = useState(post.photo);


	async function handleSubmit(event: any) {
		event.preventDefault();

		const newPost = {
			title,
			alias,
			photo,
			date,
			description,
			content: draftToHtml(convertToRaw(content.getCurrentContent())),
			user: db.collection('users').doc(user?.id)
		};

		if (post.isNew()) {
			await db.collection('posts').add(newPost);
		} else {
			await db.collection('posts').doc(post.id).set(newPost);
		}

		await navigate('/management');
	}

	return (
		<form onSubmit={handleSubmit}>
			<div className={classes.root}>
				<div>
					<TextField
						value={title}
						onChange={(event) => setTitle(event.target.value)}
						label="Title"
						style={{ margin: 8 }}
						placeholder="Placeholder"
						fullWidth
						margin="normal"
						variant="filled"
					/>
					<TextField
						value={alias}
						onChange={(event) => setAlias(event.target.value)}
						label="Alias"
						className={classes.textField}
						variant="filled"
					/>
					<TextField
						value={photo}
						onChange={(event) => setPhoto(event.target.value)}
						label="Picture"
						className={classes.textField}
						margin="dense"
						variant="filled"
					/>
					<TextField variant="outlined"
					           className={classes.textField}
					           fullWidth
					           rows={4}
					           multiline
					           aria-label="My comment"
					           value={description}
					           placeholder="Maximum 4 rows"
					           onChange={(event) => setDescription(event.target.value)}
					/>

				</div>
				<MuiPickersUtilsProvider utils={DateFnsUtils}>
					<Grid container justify="space-around">
						<KeyboardDatePicker
							disableToolbar
							variant="inline"
							format="MM/dd/yyyy"
							margin="normal"
							id="date-picker-inline"
							label="Publish date"
							value={date}
							onChange={setDate}
							KeyboardButtonProps={{
								'aria-label': 'change date',
							}}
						/>

					</Grid>
				</MuiPickersUtilsProvider>

			</div>

			<Editor
				editorState={content}
				toolbarClassName="toolbarClassName"
				wrapperClassName="wrapperClassName"
				editorClassName="editorClassName"
				onEditorStateChange={setContent}
			/>
			<Button type="submit">Save</Button>
		</form>
	);
};

export default connect(
	({user}: BlogReducers) => ({user})
)(PostEditor);