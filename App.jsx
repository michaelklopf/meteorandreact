// App component - represents the whole app
App = React.createClass({

  // mixin to make getMeteorData work
  mixins: [ReactMeteorData],

  // load items from collection and make them available this.data.tasks
  getMeteorData() {
    return {
      tasks: Tasks.find({}).fetch()
    }
  },

  renderTasks() {
    // tasks coming from this.data.tasks now
    return this.data.tasks.map((task) => {
      return <Task key={task._id} task={task} />;
    });
  },

  render() {
    return (
      <div className="container">
        <header>
          <h1>Todo List</h1>
        </header>

        <ul>
          {this.renderTasks()}
        </ul>
      </div>
    );
  }
});
