// App component - represents the whole app
App = React.createClass({

  // mixin to make getMeteorData work
  mixins: [ReactMeteorData],

  // store state for hide-completed-tasks flag
  getInitialState() {
    return {
      hideCompleted: false
    }
  },

  // load items from collection and make them available this.data.tasks
  getMeteorData() {
    let query = {};

    if (this.state.hideCompleted) {
      // if hide completed is checked, filter tasks
      query = {checked: {$ne: true}};
    }
    return {
      tasks: Tasks.find(query, {sort: {createdAt: -1}}).fetch(),
      incompleteCount: Tasks.find({checked: {$ne: true}}).count()
    }
  },

  renderTasks() {
    // tasks coming from this.data.tasks now
    return this.data.tasks.map((task) => {
      return <Task key={task._id} task={task} />;
    });
  },

  handleSubmit(event) {
    event.preventDefault();

    // get input content with react ref
    var text = this.refs.textInput.value.trim();

    Tasks.insert({
      text: text,
      createdAt: new Date() // current time
    });

    this.refs.textInput.value = "";
  },

  toggleHideCompleted() {
    this.setState({
      hideCompleted: !this.state.hideCompleted
    });
  },

  render() {
    return (
      <div className="container">
        <header>
          <h1>Todo List ({this.data.incompleteCount})</h1>
          <label className="hide-completed">
            <input
              type="checkbox"
              readOnly={true}
              checked={this.state.hideCompleted}
              onClick={this.toggleHideCompleted} />
            Hide Completed Tasks
          </label>

          {/* Adding a classy form here */}
          <form className="new-task" onSubmit={this.handleSubmit}>
            <input
              type="text"
              ref="textInput"
              placeholder="Type to add new tasks"/>
          </form>
        </header>

        <ul>
          {this.renderTasks()}
        </ul>
      </div>
    );
  }
});
