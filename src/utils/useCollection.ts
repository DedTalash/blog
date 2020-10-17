import {useEffect, useState} from "react";
import {db} from "../config/firebase";

type Snapshot = firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>;

export function useCollection<T>(path: string, dataFunction: (snapshot: Snapshot) => T[]): [T[], boolean] {
	const [processing, setProcessing] = useState<boolean>(false);
	const [posts, setPosts] = useState<T[]>([]);

	useEffect(() => {
		setProcessing(true);
		return db.collection(path).onSnapshot((snapshot: Snapshot) => {
			setProcessing(false);
			setPosts(dataFunction(snapshot));
		});
	}, [path]);

	return [posts, processing];
}