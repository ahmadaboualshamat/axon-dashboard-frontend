import React, {useState} from 'react';
import {useSelector, useDispatch, connect} from 'react-redux';
import {updateTodoItem, loadAllTodosFunction, getUserByIdFunction} from '../reducers/todoReducer' ;
import { Component , setState} from 'react';

class EditTodo extends Component {

      state = {
        updateItemName: ''/*,
        showLoading: true*/
      }
      async componentDidMount() {  
        // Runs after the first render() lifecycle
        await this.setState ({
            updateItemName: this.props.selectedItem.content
        })
        debugger
        await this.props.getUserByIdFunction(this.props.selectedItem.id);

        // debugger;
        if (this.props.getUserByIdResponse?.status === 200) {
            await this.setState ({
                updateItemName: this.props.getUserByIdResponse.data.content
            })
        } else {
            alert(this.props.getUserByIdResponseError);
        }
        // this.useState({updateItemName: this.props.selectedItem.content});
     
      }
    //Get the whole state from characterReducer
    // const todo = useSelector(state => state.todos);

    //Use for all the dispatch actions
    
 

     updateToDoitemFunction = async () => {
 
        const updatedItem = {
            id: this.props.selectedItem.id,
            content: this.state.updateItemName
        } 
        await this.props.updateTodoItem(updatedItem)
// debugger
        if (this.props.updateToDoItemResponse.status === 200) {
            await this.props.loadAllTodosFunction();
            this.props.closeEditTodoTabFunction();
        }
    }
    render() {
        return (
            <>  
                <div className="row">
                    <div className="row">
                        <div className="input-field col s4">
                            <input
                                value={this.state.updateItemName}
                                id="name"
                                type="text"
                                onChange={e => this.setState({updateItemName: e.target.value})}/>
                            <label htmlFor="name" className="active">Name</label>
                        </div>
                        
                    </div>
                    <button className="btn col s2 blue" onClick={this.updateToDoitemFunction} >Update</button>
                </div>
            </>
        );
    }
}
const mapStateToProps = state => {
    return {
    //   showLoading : state.todos.loading,
    //   addToDoItemResponse: state.todos.addToDoItemResponse,
        updateToDoItemResponse: state.todos.updateToDoItemResponse,
        getUserByIdResponse: state.todos.getUserByIdResponse,
        getUserByIdResponseError: state.todos.error
    }
  }
  
  const mapStateToDispatch = dispatch => {
    return {
      updateTodoItem: (newTodoObject) => dispatch(updateTodoItem(newTodoObject)),
      loadAllTodosFunction: () => dispatch(loadAllTodosFunction()),
      getUserByIdFunction: (userId) => dispatch(getUserByIdFunction(userId)),
    }
  }
export default connect(mapStateToProps, mapStateToDispatch)(EditTodo)  
