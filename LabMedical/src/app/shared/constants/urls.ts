const baseUrl = 'http://localhost:8080/api/';

export const URLS = {
	usersEndpoints: {
		login: baseUrl + 'usuarios/login',
		userIdByEmail: baseUrl + 'usuarios/',
		resetPassword: baseUrl + 'usuarios/resetarsenha'
	},
	logsEndpoints: {
		createLog: baseUrl + 'logs/cadastrar'
	}
}