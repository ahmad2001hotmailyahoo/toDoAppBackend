const { ToDoList } = require("./models")

const findLast = async () => {
	try {
		let response = await ToDoList.find({})
		return response?.length ? response[response.length-1] : "no data is present"
	} catch (err) {
		return "error while fetching"
	}
}

const findByDescription = async (description) => {
	try {
		let response = await ToDoList.find({ description : description })
		return response?.length ? true : false
	}
	catch {
		return "error while fetching"
	}
}

const findByStatus = async (status) => {
	try {
		let response = await ToDoList.find({ status : status })
		return response
	}
	catch {
		return "error while fetching"
	}
}

const findAll = async (status) => {
	try {
		let response = await ToDoList.find({})
		return response
	}
	catch {
		return "error while fetching"
	}
}

module.exports = {
    findLast,
    findByDescription,
    findByStatus,
    findAll
}
