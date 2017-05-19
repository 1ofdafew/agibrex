'use strict'

class DashboardController {
	* index(request, response) {
		yield response.sendView('dashboard')
	}
}

module.exports = DashboardController
