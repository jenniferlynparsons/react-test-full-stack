// import libraries and files (libraries first always? makes sense)
import React, { Component } from "react";
import uuid from "uuid";
import $ from "jquery";
import Projects from "./Components/Projects";
import AddProject from "./Components/AddProject";
import Todos from "./Components/Todos";
import "./App.css";

// class for each component. main app class handles state?
class App extends Component {
  // constructors inside classes handle state within the component
  constructor() {
    // class components call the base constructor
    super();
    // this sets the initial state of the app
    this.state = {
      projects: [],
      todos: []
    };
    // binding this to event handlers because bind calls in render create brand new functions each time they're called
    this.handleAddProject = this.handleAddProject.bind(this);
    this.handleDeleteProject = this.handleDeleteProject.bind(this);
  }

  getTodos() {
    $.ajax({
      url: "https://jsonplaceholder.typicode.com/todos",
      dataType: "json",
      cache: false,
      success: function(data) {
        //   setState is always used to update the state. don't update the state directly (this.state.todos = {todos: data} etc.)
        this.setState(
          {
            todos: data
          },
          function() {
            console.log(this.state);
          }
        );
      }.bind(this),
      error: function(xhr, status, err) {
        console.log(err);
      }
    });
  }

  getProjects() {
    this.setState({
      projects: [
        {
          id: uuid.v4(),
          title: "Business Website",
          category: "Web Design"
        },
        {
          id: uuid.v4(),
          title: "Social App",
          category: "Mobile Development"
        },
        {
          id: uuid.v4(),
          title: "Shopping Cart",
          category: "Web Development"
        }
      ]
    });
  }

  // this is a lifecycle method or hook, also componentDidMount, and this is where the ajax call happens. lifecycle methods allow component resources to be freed up when they're not being used
  componentWillMount() {
    this.getProjects();
    this.getTodos();
  }

  componentDidMount() {
    this.getProjects();
    this.getTodos();
  }

  handleAddProject(project) {
    let projects = this.state.projects;
    projects.push(project);
    this.setState({ projects: projects });
  }

  handleDeleteProject(id) {
    let projects = this.state.projects;
    let index = projects.findIndex(x => x.id === id);
    projects.splice(index, 1);
    this.setState({ projects: projects });
  }

  render() {
    return (
      <div className="App">
        <AddProject addProject={this.handleAddProject} />
        <Projects
          projects={this.state.projects}
          onDelete={this.handleDeleteProject}
        />
        <hr />
        <Todos todos={this.state.todos} />
      </div>
    );
  }
}

export default App;
