export interface IApplicationUser {
  firstName?: string;
  lastName?: string;
  name?: string;
  email?: string;
}

export default class ApplicationUser implements IApplicationUser {
	firstName?: string;
	lastName?: string;
	name?: string;
	email?: string;

	constructor(userResponse?: any) {
		if (!userResponse) return;
		this.firstName = userResponse.firstName;
		this.lastName = userResponse.lastName;
		this.name = userResponse.name;
		this.email = userResponse.email;
	}
}
