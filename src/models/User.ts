import {User as FirebaseUser} from "firebase";
import authService from "../services/AuthService";

export enum UserRole {
	ADMIN, USER, MANAGER, GUEST
}

export interface UserInterface {
	name: string
	photo: string
	email: string
	role: UserRole
}

export default class User
{
	subscription: any;

	constructor(
		public name: string | null,
		public photo: string | null,
		public id: string,
		public email: string | null,
		public role: UserRole
	) {}

	subscribe()
	{
		if (this.id) {
			this.subscription = authService.userSubscribe(this.id, this);
		}
	}

	unSubscribe()
	{
		if (this.subscription) {
			this.subscription();
		}
	}

	getRoleLabel(): string
	{
		switch (this.role) {
			case UserRole.ADMIN:
				return 'Administrator'
			case UserRole.USER:
				return 'User'
			case UserRole.MANAGER:
				return 'Manager'
			case UserRole.GUEST:
				return 'Guest'
		}
	}

	can(action: string)
	{
		if (this.isGuest()) {
			return false;
		}

		if (this.isAdmin()) {
			return true;
		}

		switch (action) {
			case 'management':
				return this.isManager()
		}

		return false;
	}

	isAdmin(): boolean
	{
		return this.role === UserRole.ADMIN;
	}

	isManager(): boolean
	{
		return this.role === UserRole.MANAGER;
	}

	isUser(): boolean
	{
		return this.role === UserRole.USER;
	}

	isGuest(): boolean
	{
		return this.role === UserRole.GUEST;
	}

	update(data: UserInterface)
	{
		this.name = data.name;
		this.photo = data.photo;
		this.email = data.email;
		this.role = data.role;

		console.log(this.data());
	}

	static createFromFirebaseUser(user: FirebaseUser|null)
	{
		if (!user) {
			return User.createEmpty();
		}

		return new User(
			user.displayName,
			user.photoURL,
			user.uid,
			user.email,
			UserRole.USER
		)
	}

	static createFromData(data: UserInterface, id: string): User
	{
		return new User(
			data.name,
			data.photo,
			id,
			data.email,
			data.role
		)
	}

	static createEmpty(): User
	{
		return new User(
			'',
			'',
			'',
			'',
			UserRole.GUEST
		)
	}

	data() {
		return {
			name: this.name,
			photo: this.photo,
			email: this.email,
			role: this.role,
		};
	}
}