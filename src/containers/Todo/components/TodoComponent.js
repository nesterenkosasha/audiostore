import React from "react"

export default class TodoComponent extends React.Component {
  constructor(props) {
    super(props)
  }

  handleClick = (event) => {
    event.preventDefault()
    const { params: { index } } = this.props
    this.props.handleClickDelete(index)
  }

  render() {
    const { params: { data } } = this.props
    const te = data.split(' ')
    console.log(te)
    
    return (
      <div>
        <button onClick={this.handleClick}>X</button>
        <span>{"Title:"}</span>
        <span>{ te[0] }</span>
        <span> | </span>
        <span>{"Author:"}</span>
        <span>{ te[1] }</span>
      </div>
    )
  }
}

