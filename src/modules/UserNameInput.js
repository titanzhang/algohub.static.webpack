import Utils from './common';

class UserNameInput {
	init(loginUrl, checkUrl, inputID) {
		if (!loginUrl || !checkUrl || !inputID) throw new Error('UserNameInput::Init error');

		const inputObj = $('#' + inputID);

		this.login = this.onLogin(loginUrl, inputObj);
		this.checkLogin = this.onCheckLogin(checkUrl, inputObj);
		this.getUser = this.onGetUser(inputObj);
		inputObj.keypress(this.onKeyPress(inputObj));

		(async () => {
			const uname = await this.checkLogin();
			if (uname) {
				inputObj.val(uname);
			}
		})();
	}

	onGetUser(inputObj) {
		return () => {
			inputObj.val();
		};
	}

	onLogin(loginUrl, inputObj) {
		return async () => {
			try {
				const data = 'username=' + encodeURIComponent(inputObj.val());
				const result = await Utils.post(loginUrl, data);
				if (!result.status) {
					return false;
				}
				return result.result.userId;
			} catch(e) {
				return false;
			}
		};
	}

	onCheckLogin(checkUrl, inputObj) {
		return async () => {
			try {
				const result = await Utils.get(checkUrl);
				if (!result.status) {
					return false;
				}
				inputObj.val(result.result.userId);
				return result.result.userId;
			} catch(e) {
				return false;
			}
		};
	}

	onKeyPress(inputObj) {
		const self = this;
		return (event) => {
			if (event.which == '13') {
				(async () => {
					const uname = inputObj.val().trim();
					if (uname.length > 0) {
						const login = await self.login(uname);
					}
				})();
				return false;
			}
		};
	}

}

export default UserNameInput;
