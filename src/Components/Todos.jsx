import React, { Component } from "react";
import PropTypes from "prop-types";
import TodoItem from "./TodoItem";

const propTypes = {
  todos: PropTypes.array
};

class Todos extends Component {
  render() {
    let todoItems;
    if (this.props.todos) {
      // sets value of todoItems to the returned value of the map. 
      todoItems = this.props.todos.map(todo => {
        return <TodoItem key={todo.title} todo={todo} />;
      });
    }
    return (
      <div className="Todos">
        <h3>Latest Todos</h3>
        {todoItems}
      </div>
    );
  }
}

Todos.propTypes = propTypes;

export default Todos;
