import React from "react";
import { connect } from "react-redux";

class UserHeader extends React.Component {
  render() {
    //destructure user from this.props.user mapStateToProps key
    //const user = this.props.user;
    const { user } = this.props;

    if (!user) {
      return null;
    }
    return <div className="header">{user.name}</div>;
  }
}

//ownProps is a reference to our component (UserHeader) props (this.props.userId).
//find() is use to find the user.id === ownProps.userId (passed down from PostList) from the array.
const mapStateToProps = (state, ownProps) => {
  return { user: state.users.find((user) => user.id === ownProps.userId) };
};

export default connect(mapStateToProps)(UserHeader);
