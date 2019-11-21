import React from 'react'
import TodoItem from './TodoItem'
import './App.css';
class todoList extends React.Component {
		constructor(props) {
		    super(props);
		    this.state = {
					isToggleOn: true,
					list: [] 
					/* list: [{text:'列表1',done:false},{text:'列表2'},{text:'列表3'}] */
					};
		    // 这边绑定是必要的，这样 `this` 才能在回调函数中使用
		     this.del = this.del.bind(this)
		     this.add = this.add.bind(this)
		     this.getList = this.getList.bind(this)
		     this.getFinishList = this.getFinishList.bind(this)
		     this.changeTask = this.changeTask.bind(this)	
		     this.getNum = this.getNum.bind(this)	
							
		  }
			componentWillMount(){
				this.setState({
						list: JSON.parse(localStorage.getItem('todoList')) || []
					});
			}
		add(e){
			let key = window.event.keyCode;
			if(key != 13) return;
			var  txt= this.refs.text.value
			if(txt){
				let obj = {text:txt,done:false}
				this.state.list.push(obj)
				this.setState({
						list: this.state.list
					});
					this.refs.text.value = ''
			}
			localStorage.setItem('todoList',JSON.stringify(this.state.list))
		}
		del(index){
// 			 var index=e.target.getAttribute("data-index");
debugger
			 console.log(index)
			 this.state.list.splice(index,1) 
			
			  this.setState({
           list: this.state.list
        });
				localStorage.setItem('todoList',JSON.stringify(this.state.list))
		}
		changeTask(index){
			let arr = this.state.list
			if(!arr.length) return
			arr[index].done===false ? arr[index].done=true : arr[index].done=false
			this.setState({
					list: arr
				});
				localStorage.setItem('todoList',JSON.stringify(this.state.list))
		}
		getList(){
			return this.state.list.map((item,index)=>{
				if(!item.done){
					return(
						<TodoItem 
								deleteItem={this.del}
								changeItem = {this.changeTask}
								content={item.text}
								key={index}
								index={index}
								active={item.done}
						>
						</TodoItem>
					)
				}
				return null	
			})	
		}
		getNum(){
			if(!this.state.list.length) return 0
			let newArr = this.state.list.filter(item => item.done===false)  
			return newArr.length
		}
		getFinishList(){
			return this.state.list.map((item,index)=>{
				if(item.done){
					return(
						<TodoItem 
								deleteItem={this.del}
								changeItem = {this.changeTask}
								content={item.text}
								key={index}
								index={index}
								active={item.done}
						>
						</TodoItem>
					)
				}
				return null	
			})	
		}
	  render(){
	  	
	  	return(
		  		<div>
							<div className="header">
									<div className="inputCon">
											<span  className="todoTitle">ToDoList</span>
											<input ref='text' onKeyPress={this.add} type="text" placeholder="添加ToDo"/>
									</div>										
							</div>
							<div className="main">
									<div className="newTask">
											<div className="taskState">
												<span className="title">正在进行</span>
												<span className="num">{this.getNum()}</span>
											</div>
											{this.getList()}
									</div>	
									<div className="newTask">
											<div className="taskState">
												<span className="title">已经完成</span>
												<span className="num">{this.state.list.length-this.getNum()}</span>
											</div>
											{this.getFinishList()}
									</div>	
							</div>
					</div>
				)
	  }
}
export default todoList;
