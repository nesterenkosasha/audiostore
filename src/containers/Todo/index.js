import React from "react"
import TodoComponent from "./components/TodoComponent"

export default class TodoContainer extends React.Component {
  state = {
    todos: []
  }

  constructor(props) {
    super(props)
    this.inputComponent = null
  }

  componentDidMount() {
    this.setState({ todos: this.getTodos() })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    try {
      if (!this.inputComponent) throw new Error("Input component is not defined!")
      if (this.inputComponent.value) {
        const todos = this.getTodos()
        todos.unshift({
          data: this.inputComponent.value
        })
        this.setState({ todos }, () => { 
          this.setTodos(todos)
          this.inputComponent.value = ""
        })
      }
    } catch ({ message }) {
      console.error(message)
    }
  }

  setTodos(todos) {
    localStorage.setItem("todos", JSON.stringify(todos))
    return this
  }

  getTodos() {
    const toParseData = localStorage.getItem("todos")
    return toParseData && JSON.parse(toParseData) || []
  }

  handleClickDelete = (id) => {
    const { todos } = this.state
    const filtered = todos.filter((el, index) => index != id)
    this.setState({ todos: filtered }, () => this.setTodos(filtered))
  }

  render() {
    const { todos } = this.state

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input 
            type={"text"}
            ref={(input) => this.inputComponent = input}
            placeholder={"Enter title and author"}
          />
          <button type={"submit"}>Submit</button>
        </form>
        <div>
          { todos.map((el, index) => (<TodoComponent 
            key={index} 
            handleClickDelete={this.handleClickDelete}            
            params={{...el, index}}
          />)) }
        </div>
      </div>
    )
  }
}


