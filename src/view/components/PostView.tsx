import React from "react";
import Post from "../../model/Post";
import {Formatter} from "../../components/Formatter";
import {Card, CardContent, CardMedia, Grid, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {Link} from "@reach/router";

interface Props {
	post: Post,
}

const useStyles = makeStyles((theme) => {

	return ({
			root: {
				display: 'flex',
				flexWrap: 'wrap',
			},
			countCards: {
				display: 'inline-flex',
				padding: 10,
				[theme.breakpoints.up('md')]: {
					width: '33.3%',
				},
				[theme.breakpoints.down('md')]: {
					width: '50%',
				},
				[theme.breakpoints.down('xs')]: {
					width: '100%',
				},
			},
			blogPost: {
				verticalAlign: 'middle',
				display: 'block',
				marginTop: '20px',
			},
			cover: {
				height: 280,
				paddingTop: '25px',
				backgroundSize: 'cover',
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

export const PostView = (props: Props) => {
	const classes = useStyles();
	const { post } = props;

	return (
		<Grid item className={classes.countCards}>
			<Card className={classes.blogPost}  >
			<CardMedia
				className={classes.cover}
				image={post.urlToImage}
			/>
			<CardContent>
				<Typography className={classes.title} component="h5" variant="h5" gutterBottom={true}>
					<Link to={`/blog/${post.id}`}>{post.title}</Link>
				</Typography>
				<Typography className={classes.bodyPost} variant="body1" color="textSecondary" gutterBottom={true}>
					{post.description}
				</Typography>
				<Typography variant={"body2"} color="textSecondary" align={"right"}>
					{Formatter.toDate(post.publishedAt)}
				</Typography>
			</CardContent>
			</Card>
		</Grid>
	);
}

