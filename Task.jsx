// Task component - represents a single todo item
Task = React.createClass({
  propTypes: {
    // This component gets the task to display through a React prop.
    // We can use propTypes to indicate it is required
    task: React.PropTypes.object.isRequired
  },

  toggleChecked() {
    // Toggle checked value
    Tasks.update(this.props.task._id, {
      $set: {checked: !this.props.task.checked}
    });
  },

  deleteThisTask() {
    Tasks.remove(this.props.task._id);
  },

  render() {
    // to style tasks depending on checked state, give them different class
    const taskClassName = this.props.task.checked ? "checked" : "";

    return (
      <li className={taskClassName}>
        <button className="delete" onClick={this.deleteThisTask}>
          &times;
        </button>

        <input
          type="checkbox"
          readOnly={true}
          checked={this.props.task.checked}
          onClick={this.toggleChecked} />

        <span className="text">{this.props.task.text}</span>
      </li>
    );
  }
});
