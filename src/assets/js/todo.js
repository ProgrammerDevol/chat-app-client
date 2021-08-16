let token = window.localStorage.getItem('token')
let username = window.localStorage.getItem('username')
//let userid = window.localStorage.getItem('userId')
// let userId= window.localStorage.getItem('userId')
// console.log

if(!token && !username) window.location = '/login'
usernameText.textContent = username
userIcon.textContent = usernameText.textContent[0].toUpperCase()
usernameText.setAttribute('class','username')
const getTodos = async () => {
	let data = await request('/todos', 'GET', undefined, true);
	let res = await data.json();
	console.log(res.data)
	renderTodos(res.data)
}


form.onsubmit = async  (event) => {
	event.preventDefault()
	let newTodo = {
		todo_text: textInput.value
	}
	let res = await request('/todos', 'POST', newTodo, true)
	if(res.status == 200) {
		res = await res.json()
		let todo = res.data
		renderTodos([todo])
	}
}



function renderTodos(todos) {
	for(let todo of todos) {
		let li = document.createElement('li')
		let div = document.createElement('div')
		let div2 = document.createElement('div')
		let text = document.createElement('span')
		let time = document.createElement('span')
		let usernamet = document.createElement('span')
		let tru = document.createElement('span')
		

		
		//let dt = new Date()
		usernamet.textContent = todo.username
		console.log(todo.user_id)
		text.textContent = todo.todo_text
		time.textContent = todo.date
		time.setAttribute('class','aboo')
		usernamet.setAttribute('class','abo')
		text.setAttribute('class','text')
		div2.setAttribute('class','div2')
		
		console.log(todo.user_id)

		div2.append(usernamet)
		div2.append(text)
		div.append(tru)
		div.append(div2)
		div.append(time)
		li.append(div)
		

		ulList.append(li)
		

		if(todo.user_id == window.localStorage.getItem('userId')){
			// li.style.marginLeft = 'auto'
			// li.style.paddingLeft = '100px'
			// li.style.paddingRight = '40px'
			ulList.style.margin = '0'
			li.style.display = 'flex'
			li.style.alignItems = 'flex-start'
			// li.style.marginLeft = "550px"
			li.style.width =' 400px'  
			li.style.flexDirection = 'row-reverse'
			li.style.marginLeft = 'auto'
			time.style.marginBottom = " 20px"
			li.style.backgroundColor = "darkgreen"
			usernamet.style.color = 'white' 
			text.contentEditable = true
			time.style.marginLeft = '250px'

			let button = document.createElement('button')
			button.textContent = 'X'
			li.append(button)
			button.onclick = async () => {
				let res = await request('/todos', 'DELETE', { todo_id: todo.todo_id }, true)
				if(res.status == 200) {
					li.remove()
				}
			}
			text.onkeyup = async  (event) => {
				if(event.keyCode == 13) {
					let x = text.textContent
					let res = await request('/todos', 'PUT', { todo_id: todo.todo_id, todo_text: text.textContent }, true)
					text.textContent = x
				}

			}


		}else{
			li.style.width = '500px'
		}
		


		

		text.onkeyup = async  (event) => {
			if(event.keyCode == 13) {
				let x = text.textContent
				let res = await request('/todos', 'PUT', { todo_id: todo.todo_id, todo_text: text.textContent }, true)
				text.textContent = x
			}

		}

		time.onkeyup = async  (event) => {
			if(event.keyCode == 13) {
				let x = time.textContent
				let res = await request('/todos', 'PUT', { todo_id: todo.todo_id, todo_time: time.textContent }, true)
				time.textContent = x
			}

		}
	}

	textInput.value = ""
}

logout.onclick = () => {
	window.localStorage.removeItem('token')
	window.localStorage.removeItem('username')
	window.location = '/login'
}



getTodos()

