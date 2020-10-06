import React from "react";
import Post from "../../model/Post";
import {Formatter} from "../../components/Formatter";
import {Card, CardContent, CardMedia, createMuiTheme, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import TopBar from "../TopBar";

interface Props {
	post: Post
}

// TODO: fix this shit
const myTheme: any = createMuiTheme({
	breakpoints: {
		values: {
			xs: 0,
			sm: 384,
			md: 560,
			lg: 674,
			xl: 1200
		}
	}
});

const useStyles = makeStyles((theme) => {

	theme.breakpoints = myTheme.breakpoints;

	return ({
			blogPost: {
				[theme.breakpoints.down('sm')]: {
					display: 'block',
				},
				display: 'flex',
				marginTop: '20px',
			},
			cover: {
				flex: '0 0 200px',
				paddingTop: '25px',
				backgroundSize: 'cover',

				[theme.breakpoints.down('sm')]: {
					display: 'block',
					height: '250px',
				},
			},
			title: {
				fontSize: '20px',
			},
			bodyPost: {
				fontSize: '18px'
			},
		}
	);
});

export default function PostView(props: Props) {
	const classes = useStyles();

	return (
		<Card className={classes.blogPost} onFocus={() =>
			<TopBar title={props.post.title}/>
		}>
			<CardMedia onFocus={() =>
				<TopBar title={props.post.title}/>
			}
				className={classes.cover}
				image={props.post.urlToImage}
				title={props.post.title}
			/>
			<CardContent >
				<Typography className={classes.title} component="h5" variant="h5" gutterBottom={true}>
					{props.post.title}
				</Typography>
				<Typography className={classes.bodyPost} variant="body1" color="textSecondary" gutterBottom={true}>
					{props.post.description}
				</Typography>
				<Typography variant={"body2"} color="textSecondary" align={"right"}>
					{Formatter.toDate(props.post.publishedAt)}
				</Typography>
			</CardContent>
		</Card>
	);
}