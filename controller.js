const { ToDoList } = require("./models")
const { findLast, findByDescription, findByStatus, findAll } = require("./helper")

async function getToDoListById (req,res) {
	try {
		const { id } = req.params
		const query = ToDoList.where({ id: id })
		const response = await query.findOne()

		return response ? 
		res.status(200).json({
			data: response
		}) : 
		res.status(200).json({
			msg: `no record availabe against the id ${id}`
		})
	}
	catch (err) {
		res.status(500).json({
			msg: `error while fetching`
		})
	}
}

async function addToList (req, res) {
  try {
    const { description, status }  = req.body
		let lastElement = await findLast()
		let id = 0

		if(lastElement == "no data is present") id = '0'
		else if(lastElement == "error while fetching") {
			console.log(lastElement)
			res.status(500).json({
				err: "error while adding"
			})
		}
		else{
			id = parseInt(lastElement.id) + 1
		}

		let founded = await findByDescription(description);
		if(founded == "error while fetching") {
			res.status(500).json({
				err: "error while adding"
			})
		}
		else if(!founded) {
    	const listModel = new ToDoList({
				id: id,
      	description: description,
				status:status
    	})
			await listModel.save();
			res.status(200).json({
				detail: "to do list created successfully"
			})
		} else {
			res.status(200).json({
				detail: "description already Exists"
			})
		}
  } catch (err) {
    console.log(err)
    res.status(500).json({
      err: "error while adding"
    })
  }
}

async function getToDoList (req,res) {
	try {
		const { status } = req.query
		let response = ""
		console.log(status)
		if(status == 'All' || status == null ) response = await findAll()
		else response = await findByStatus(status)
		
		if ( response == 'error while fetching' ) {
			res.status(500).send({
				"error": response
			})
		}
		else {
			res.status(200).send({
				"data": response
			})
		}
	}
	catch {
		
	}
}

async function deleteToDoList (req,res) {
	try {
		let { id } = req.params
		console.log(id)
		let response = await ToDoList.deleteOne({id:id})

		return response.matchedCount ? 		
		res.status(200).json({
			message: `record with id ${id} is deleted successfully`
		}) : 
		res.status(200).json({
			message: `no record availabe against the id ${id}`
		})
	} catch (err) {
		res.status(500).json({
	    err: "error while deleting"
		})
	}
}

async function deleteToDoListByStatus (req,res) {
	// try {
		let { status } = req.params
		console.log(status)
		let response = await ToDoList.deleteMany({status:status})
		console.log(response.deletedCount)
		response.deletedCount ? 		
		res.status(200).json({
			message: `record with status completed are deleted successfully`
		}) : 
		res.status(200).json({
			message: `no record available against status completed`
		})
	// } catch (err) {
	// 	res.status(500).json({
	//     err: "error while deleting"
	// 	})
	// }
}

async function updateListStatus (req,res) {
	try {
		const { id } = req.params
		const update = req.body;
		console.log(update)
		let response = await ToDoList.updateOne({id:id},update)
		
		return response.matchedCount ? 		
		res.status(200).json({
			message: `record with id ${id} is updated successfully`
		}) : 
		res.status(200).json({
			message: `no record availabe against the id ${id}`
		})

	} catch (err) {
		res.status(500).json({
      err: "error while updating"
		})
	}
}

module.exports = {
  addToList,
  getToDoList,
  deleteToDoList,
	updateListStatus,
	getToDoListById,
	deleteToDoListByStatus
}
