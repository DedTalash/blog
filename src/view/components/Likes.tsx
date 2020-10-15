import React, {useEffect, useState} from 'react';
import {ThumbDown, ThumbUp} from "@material-ui/icons";
import {db} from "../../config/firebase";
import {makeStyles} from "@material-ui/core/styles";
import {createStyles, Theme} from "@material-ui/core";
import {User} from "../../redux/userReducer";

export interface Comment {
    id: string,
    comment: string,
    date: { seconds: number, toDate(): Date },
    user: any
}

interface Props {
    depends?: string,
    user: User
    comment?: Comment,
    path: string
}

interface Like {
    type: boolean,
    date: string,
    uid: string
}
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            maxHeight: 200,
            width: '100%',
            overflow: 'auto'
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

    }),);

    const Likes = (props:Props) => {
        const [likesValue, setLikesValue] = useState<number>(0)
        const [canLike, setCanLike] = useState<boolean>(false)
        const classes = useStyles();

        const handleLike = (type: boolean) => {
            db.collection(props.path).add({
                type,
                date: new Date().toString(),
                uid: props.user?.id
            });
        }

        useEffect(() => {
            return db.collection(props.path).onSnapshot(snapshot => {
                let canLike = true;
                let value = 0;
                snapshot.forEach((like) => {
                    const userLike = like.data() as Like;

                    if (userLike.type) {
                        value++;
                    } else {
                        value--;
                    }

                    if (userLike.uid === props.user?.id) {
                        canLike = false;
                    }
                })
                setLikesValue(value);
                setCanLike(canLike);
            });
        }, [props.depends, props.user?.id]);
    return (
        <div>
            <div className={classes.likes}>
                {likesValue}
                {props.user && canLike && <>
                    <ThumbUp className={classes.buttonContainer} onClick={handleLike.bind(null, true)}/>
                    <ThumbDown className={classes.buttonContainer} onClick={handleLike.bind(null, false)}/>
                </>}
            </div>
        </div>
    );
};

export default Likes;
