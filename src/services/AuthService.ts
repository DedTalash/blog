import {db, firebase} from "../config/firebase";
import User, {UserInterface} from "../models/User";
import store from "../redux/store";
import {setUser} from "../redux/actions";

class AuthService
{
	subscribe()
	{
		return firebase.auth().onAuthStateChanged((user) => {
			store.dispatch(
				setUser(User.createFromFirebaseUser(user))
			);
		});

		// db.collection('users').doc(user.id).set(user, {merge: true})
	}

	logout()
	{
		firebase.auth().signOut()
	}

	signIn()
	{

	}

	userSubscribe(id: string, model: User)
	{
		return db.collection('users').doc(id).onSnapshot(user => {
			model.update(user.data() as UserInterface);
			// store.dispatch(setUser(model));
		});
	}

	signUp()
	{

	}
}

const authService = new AuthService();
export default authService;