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
import Post from "../../model/Post";
import {db} from "../../config/firebase";

interface Props {
	post: Post
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

const PostEditor = ({post}: Props) => {
	const classes = useStyles();
	console.log("e", post)
	const [selectedDate, setSelectedDate] = useState<Date | null>(post.publishedAt);
	const [text, setText] = useState(() => EditorState.createWithContent(
		ContentState.createFromText(''))
	);
	const [title, setTitle] = useState(post.title);
	const [alias, setAlias] = useState(post.url);
	const [author, setAuthor] = useState(post.author);
	const [photo, setPhoto] = useState(post.urlToImage);

	useState<Date | null>(post.publishedAt)

	function handleSubmit(event: any) {
		event.preventDefault();

		event.preventDefault();
		db.collection('posts').add({
			title,
			alias,
			author,
			photo,
			selectedDate,
			text: convertToRaw(text.getCurrentContent())

		})
	}


	return (
		<form onSubmit={handleSubmit}>
			<div className={classes.root}>

				<div>
					<TextField
						value={post.title}
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
						value={post.url}
						onChange={(event) => setPhoto(event.target.value)}
						label="Picture"
						defaultValue="Default Value"
						className={classes.textField}
						margin="dense"
						variant="filled"
					/>
					<TextField
						value={post.author}
						onChange={(event) => setAuthor(event.target.value)}
						label="Author"
						defaultValue="Default Value"
						className={classes.textField}
						margin="normal"
						variant="filled"
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
							value={post.publishedAt}
							onChange={setSelectedDate}
							KeyboardButtonProps={{
								'aria-label': 'change date',
							}}
						/>

					</Grid>
				</MuiPickersUtilsProvider>

			</div>

			<Editor
				editorState={text}
				toolbarClassName="toolbarClassName"
				wrapperClassName="wrapperClassName"
				editorClassName="editorClassName"
				onEditorStateChange={setText}
			/>
			<Button type="submit">Save</Button>
		</form>
	);
};

export default PostEditor;

