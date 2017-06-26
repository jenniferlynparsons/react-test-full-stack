import React, { Component } from "react";
import PropTypes from "prop-types";

const propTypes = {
  todo: PropTypes.object
};

class TodoItem extends Component {
  render() {
    return (
      <li className="Todo">
        <strong>{this.props.todo.title}</strong>
      </li>
    );
  }
}

TodoItem.propTypes = propTypes;

export default TodoItem;
