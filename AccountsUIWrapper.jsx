AccountsUIWrapper = React.createClass({
  componentDidMount() {
    // Use Meteor Blaze to render login buttons
    this.view = Blaze.render(Template.loginButtons,
      this.refs.container);
  },

  componentWillUnmount() {
    // clean up Blaze view
    Blaze.remove(this.view);
  },

  render() {
    // render a placeholder container for Blaze view
    return <span ref="container" />;
  }
});
