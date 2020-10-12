import React, {useState} from 'react';
import {RouteComponentProps} from "@reach/router";
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {EditorState, convertToRaw} from "draft-js";
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

interface Props {
	post?: Post
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

const Edit = (props:  RouteComponentProps) => {
	const classes = useStyles();

	const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
	const [text, setText] = useState(() => EditorState.createEmpty());
	const [title, setTitle] = useState('');
	const [alias, setAlias] = useState('');
	const [photo, setPhoto] = useState('');


	function handleSubmit(event: any) {
		event.preventDefault();
		console.log({
			title,
			alias,
			photo,
			selectedDate,
			text: convertToRaw(text.getCurrentContent())
			}
		)

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
						defaultValue="Default Value"
						className={classes.textField}
						margin="dense"
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
							value={selectedDate}
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

export default Edit;

