import React, { Component} from 'react';
import { removeTodoItem, loadAllTodosFunction } from '../reducers/todoReducer';
import { /*useSelector,useDispatch,*/ connect } from 'react-redux';
import { ConfirmDialog } from 'primereact/confirmdialog'; // To use <ConfirmDialog> tag
import { confirmDialog } from 'primereact/confirmdialog'; // To use confirmDialog method
import  'primereact/resources/themes/lara-light-indigo/theme.css';  
import  'primereact/resources/primereact.min.css';  
import EditTodo from './EditTodo';
// import  'primeicons/primeicons.css';  
// type TodoItemProps = { item: any, todoList: [], removeTodoItem: Function};

class TodoItem extends Component {
    state = {
        confirmationMessage: '',
        selectedItem:null,
        showEditSection: false
      }

    async componentDidMount() {  
        // Runs after the first render() lifecycle
        console.log("Did mount called TodoItem"); 
        this.state = {
            confirmationMessage: 'Are you sure to delete item name = ?',
            selectedItem:null,
            visible:false,
            showEditSection: false
        }
      }
    removeTodoItemOnClick = async (todoId) => {  
        //filter to get the todoId which need to be remove
        let selectedItem = this.props.todoList.filter(item => item.id === todoId)[0];
        this.setState({
            confirmationMessage: 'Are you sure to delete item name =' + selectedItem.content,
            selectedItem:selectedItem,
            visible: true
        })
        // this.confirm();
        // await this.props.removeTodoItem(selectedItem);
           
        // if (this.props.removeTodoItemResponse?.status === 200 ) {
        //     await this.props.loadAllTodosFunction();
        // }

    }

    editTodoItemOnClick = async (todoId) => {  
        //filter to get the todoId which need to be remove
        let selectedItem = this.props.todoList.filter(item => item.id === todoId)[0];
        
        this.setState({
            selectedItem:selectedItem,
            showEditSection:true
        })
        // this.confirm();
        // await this.props.removeTodoItem(selectedItem);
           
        // if (this.props.removeTodoItemResponse?.status === 200 ) {
        //     await this.props.loadAllTodosFunction();
        // }

    }

    acceptFunc = async () => {  
        //filter to get the todoId which need to be remove
        let selectedItem = this.props.todoList.filter(item => item.id === this.state.selectedItem?.id)[0];
         
        await this.props.removeTodoItem(selectedItem);
           
        if (this.props.removeTodoItemResponse?.status === 200 ) {
            await this.props.loadAllTodosFunction();
        }

    }
    rejectFunc = async () => {  
    //    alert();

    }

    // confirm = () => {
    //     confirmDialog({
    //         message: this.state.confirmationMessage,
    //         header: 'Confirmation',
    //         icon: 'pi pi-exclamation-triangle',
    //         accept: () => this.acceptFunc(),
    //         reject: () => this.rejectFunc()
    //     });
    // }
     
    closeEditTodoTabFunction = async () => {  
       this.setState({showEditSection: false})

    }
    render() {
        return (
            <>  
                {(this.state.visible &&  
                <ConfirmDialog visible={this.state.visible} onHide={() => this.setState({visible: false})} 
                message={this.state.confirmationMessage} className="p-confirm-dialog"
                header="Confirmation" icon="pi pi-exclamation-triangle" 
                accept={this.acceptFunc} reject={this.rejectFunc} />
                )}
                
                <li className="collection-item" key={this.props.item.id}>{this.props.item.content}
                    
                    <span
                        onClick={() => {
                        this.editTodoItemOnClick(this.props.item.id)
                    }}
                        className="secondary-content">
                        
                        <i className="material-icons">edit</i>
                    </span>
                    
                    <span
                        onClick={() => {
                        this.removeTodoItemOnClick(this.props.item.id)
                    }}
                        className="secondary-content">
                        
                        <i className="remove-btn material-icons blue-text">clear</i>
                    </span>
                </li>
                {this.state.showEditSection && <EditTodo selectedItem={this.state.selectedItem} closeEditTodoTabFunction = {this.closeEditTodoTabFunction}/>}
                
            </>
        );
    }
     
}


const mapStateToProps = state => {
    return {
      todoList : state.todos.todoList,
      showLoading : state.todos.loading,
      removeTodoItemResponse: state.todos.removeTodoItemResponse
    }
  }
  
  const mapStateToDispatch = dispatch => {
    return {
      removeTodoItem: (newTodoObject) => dispatch(removeTodoItem(newTodoObject)),
      loadAllTodosFunction: () => dispatch(loadAllTodosFunction()),
    }
  }
  export default connect(mapStateToProps, mapStateToDispatch)(TodoItem)
// //Single todo item component
// const TodoItem = (props) => {
//     //Get todoList from todoReducer
//     const todoList = useSelector(state => state.todos.todoList)
//     //Use for all the dispatch actions
//     const dispatch = useDispatch();

//     //Remove single todo in the list
//     const removeTodoItem = (todoId) => {
//         //filter to get the todoId which need to be remove
//         let newTodoList = todoList.filter(item => item.id !== todoId);
//         dispatch({type: 'REMOVE_TODO', payload: newTodoList})

//     }

//     return (
//         <li className="collection-item" key={props.item.id}>{props.item.content}
//             <span
//                 onClick={() => {
//                 removeTodoItem(props.item.id)
//             }}
//                 className="secondary-content">
//                 <i className="remove-btn material-icons blue-text">clear</i>
//             </span>
//         </li>
//     );
// }

// export default TodoItem;