
import React, { Component } from "react";
import "./App.css";
// We added line 7  so we can use todoList as a variable for todays assessment (that makes sense)
import todoList from "./todos.json";

// I think the issue would be that the TodoList is meant to be a componenet that contains the todo items. If we make it the whole html page the TodoList component wouldn't be able to be used again. It's really just a data structure.
// I Actually you're right only two and yea the app component is like the webpage the tictactoe didn't have a whole layout structure
// app contains the two images I just slacked. I see.  Ok, that's helpful..  sorry to get sidetracked. All good so have you completed yesterdays assessmnt?

// No, not at all.  I had a town board meeting (I'm a volunteer attorney for the town) until 10:30 last night in Crawfordsville, so I didn't get home until about midnight.  that's approximately 8 hours past my bedtime...lol omg

// do you mind if I comment in questions through the code below?{sure}
class TodoItem extends Component {
  render() {
    return (
      <li className={this.props.completed ? "completed" : ""}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={this.props.completed}
            onClick={this.props.completeTodo}
          />
          <label>{this.props.title}</label>
          <button className="destroy" onClick={this.props.handleDeleteTodo} />
          {/* what is "destroy" about? */}
          {/* we'll connect it to the delete function OK*/}
        </div>
      </li>
    );
  }
}

class TodoList extends Component {
  render() {
    return <ul className="todo-list">{this.props.children}</ul>;
    // what's going on with this line?
    // This it the ul tag that acts as a list container for all the TodoItems that are added.
    // What's weird to me is that below we don't have to define the prop children=line 61" Like do you see how we had to define the other two props {title and completed} we made above? title={todo.title} completed={todo.completed}.  That is weird.  Did Taylor explain why? Let me see if we can live share with him too. its just a link I share. OK
  }
}
class App extends Component {
  state = { todos: todoList };

  handleToggleTodo = todoIdThatWasClicked => event => {
    const newTodos = this.state.todos.map(todo => {
      // find the todo who's id matches the idUserClicked
      if (todo.id === todoIdThatWasClicked) {
        // change that todo's completed value
        todo.completed = !todo.completed;
      }

      return todo;
    });

    // // for deleting a single todo
    // const newTodos = this.state.todos.filter(todo => {
    //   // return either true/false
    //   // return a false in the case where the todo.id matches the todoIdThatWasClicked
    //   // looks for a particular to do object
    // });

    // // for deleting all completed todos
    // const newTodos = this.state.todos.filter(todo => {
    //   // return either true/false
    //   // return a false in the case where the todo.completed is true
    //   // looks for all completed to do items.
    // });

    this.setState({
      todos: newTodos
    });
  };

  handleDeleteCompletedTodos = event => {
    const newTodos = this.state.todos.filter(todo => {
      if (todo.completed === true) {
        return false;
      }
      return true;
    });
    this.setState({
      todos: newTodos
    });
  };

  handleDeleteTodo = todoIdThatWasClicked => event => {
    const newTodos = this.state.todos.filter(todo => {
      if (todo.id === todoIdThatWasClicked) {
        return false;
      }
      return true;
      //look for matched id todoIdThatWasClicked = todo.id
    });
    this.setState({
      todos: newTodos
    });
  };

  // add new todos.
  addNewTodo = event => {
    if (event.keyCode === 13 /* the number for <ENTER> key */) {
      const newTodos = this.state.todos.slice(0);
      // newTodo = <todoItem>??</todoItem>
      // get the title from event.target.value
      // id for the new todo. use random number generator within a range to assign to the new todo. to make sure that you dont have two lists with the same to do.
      const newTodo = {
        id: 0 /* Math.floor(Math.random()) generate random number here */
      };
      newTodos.push(newTodo);
      this.setState({
        todos: newTodos
      });
    }
  };

  render() {
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            autoFocus
          />
        </header>
        <section className="main">
          <TodoList>
            {this.state.todos.map(todo => (
              <TodoItem
                title={todo.title}
                completed={todo.completed}
                completeTodo={this.handleToggleTodo(todo.id)}
                handleDeleteTodo={this.handleDeleteTodo(todo.id)}
              />
            ))}
          </TodoList>
        </section>
        <footer className="footer">
          <span className="todo-count">
            <strong>0</strong> item(s) left
          </span>
          <button
            className="clear-completed"
            onClick={this.handleDeleteCompletedTodos}
          >
            Clear completed
          </button>
        </footer>
      </section>
    );
  }
}

export default App;
