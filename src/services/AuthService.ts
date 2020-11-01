import {db, firebase} from "../config/firebase";
import User, {UserInterface} from "../models/User";
import store from "../redux/store";
import {closeModal, setUser} from "../redux/actions";

class AuthService
{
	subscribe()
	{
		return firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				store.dispatch(closeModal());
			}

			store.dispatch(
				setUser(User.createFromFirebaseUser(user))
			);
		});
	}

	logout()
	{
		firebase.auth().signOut()
	}

	userSubscribe(id: string, model: User)
	{
		return db.collection('users').doc(id).onSnapshot(user => {
			if (user.exists) {
				model.update(user.data() as UserInterface);
				store.dispatch(setUser(model));
			}
		});
	}
	signIn()
	{

	}
	createUser(model: User)
	{
		db.collection('users').doc(model.id).get().then(record => {
			if (!record.exists) {
				db.collection('users').doc(model.id).set(model.data());
			}
		});
	}
}

const authService = new AuthService();
export default authService;