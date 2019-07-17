import React from 'react'

class TodoItem extends React.Component {
  constructor(props) {
    super(props)

    this.handleDelete = this.handleDelete.bind(this)
    this.inputChange = this.inputChange.bind(this)
    this.changeTask = this.changeTask.bind(this)
  }
  // 子组件如果想和父组件通信，子组件要调用父组件传递过来的方法
  handleDelete() {
    // this.props.delete(this.props.index) //代码优化
    const {deleteItem, index} = this.props
    deleteItem(index)
  }
	inputChange(){
	
	}
	changeTask(){
		const {changeItem, index} = this.props
		changeItem(index)
	}
  render() {
    const {content,active} = this.props
    return (<div className={`taskItem ${active?'active':null}`}>
								<input checked={`${active?'checked':''}`} onChange={this.changeTask} className="changeTask"  type="checkBox"/>
								
								<input className="taskText"  value={content} onChange={this.inputChange} type="text"/>
								
							{/* 	<p className="taskText">{content}</p> */}
								<span onClick={this.handleDelete} className="delTask"></span>
						</div>)
  }
}
export default TodoItem
