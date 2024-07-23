import React,{useState/*, useReducer*/} from 'react';
// import loadAllTodosFunction from 
import { /*useSelector,useDispatch,*/ connect } from 'react-redux';
import TodoItem from '../components/TodoItem';
// import todoReducer from '../reducers/todoReducer';
import {loadAllTodosFunction, addTodoItem} from '../reducers/todoReducer' ;
import Spinner from 'react-bootstrap/Spinner';
import { Component , setState} from 'react';

class TodoList extends Component {

  state = {
    errMsg: '' ,
    inputTodo: ''/*,
    showLoading: true*/
  }
 

  async componentDidMount() {  
    // Runs after the first render() lifecycle
    console.log("Did mount called");
    await this.props.loadAllTodosFunction();
 
  }
  handleInput = (e)=>{ 
   // setInputTodo(e.target.value);
   this.setState({ 
     inputTodo: e.target.value 
   })
 }

randomNumberInRange = (min, max) => {
    return Math.floor(Math.random()
        * (max - min + 1)) + min;
  };
//Handle onClick event
 addNewTodo = async()=>{
  //Valid input value
  if(this.state.inputTodo.trim().length>1)
  {   
      // setErrMsg('');
      this.setState ({ 
        errMsg: '' 
      })

      let newTodoObject={
          /*id: this.randomNumberInRange(1,1000),*/
          content:this.state.inputTodo
      } 
 
        //Add new todo item into List with the action
      // dispatch({type:'ADD_TODO',payload:newTodoObject});
      await this.props.addTodoItem(newTodoObject);

      // debugger;
      // console.log(this.props.addToDoItemResponse);
      if (this.props.addToDoItemResponse?.status === 201) {
        // debugger;
        // console.log(this.props.removeTodoItemResponse);
        await this.props.loadAllTodosFunction();
      }
      //Empty input 
      // setInputTodo('');
      
      this.setState ({ 
        inputTodo: ''  
      })
  }
  else{
      //Display Error message
      // setErrMsg('');
       
      this.setState({ 
        errMsg: 'Please input something...' 
      })
  }
}

  render() {
    return (    
      <>
        {(this.props.showLoading && 
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>)}
        <section id="section-todo">
        <h3 className="center-align white-text blue">Users</h3>
        {
            this.props.todoList.length>0?
            (<ul className="collection">
            {
              this.props.todoList.map(item => {
                return <TodoItem key={item.id} item={item} />
              })
            }
          </ul>):
          (<p className="center-align">You don't have anything to do! Awesome!</p>)
        }
       
        <div className="row">
        <p className="red-text err-msg col s12 center-align">
        {this.state?.errMsg}
        </p>
        <div className="input-field col s10">
        <input onChange={this.handleInput} value={this.state?.inputTodo} placeholder="Add todo..." id="todo-input" type="text" />
        <label htmlFor="todo-input" className="active">New Todo</label>
        </div>
      
        <button className="btn col s2 blue" onClick={this.addNewTodo} >Add</button>
        </div>
      </section>
      </>
       
      );
  }
} 


const mapStateToProps = state => {
  return {
    todoList : state.todos.todoList,
    showLoading : state.todos.loading,

    addToDoItemResponse: state.todos.addToDoItemResponse/*,
    removeTodoItemResponse: state.todos.removeTodoItemResponse*/
  }
}

const mapStateToDispatch = dispatch => {
  return {
    loadAllTodosFunction: () => dispatch(loadAllTodosFunction()),
    addTodoItem: (newTodoObject) => dispatch(addTodoItem(newTodoObject)),
  }
}
 
// export default TodoList;
export default connect(mapStateToProps, mapStateToDispatch)(TodoList)