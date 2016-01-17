// App component - represents the whole app
App = React.createClass({

  // mixin to make getMeteorData work
  mixins: [ReactMeteorData],

  // load items from collection and make them available this.data.tasks
  getMeteorData() {
    return {
      tasks: Tasks.find({}, {sort: {createdAt: -1}}).fetch()
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

  render() {
    return (
      <div className="container">
        <header>
          <h1>Todo List</h1>
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
