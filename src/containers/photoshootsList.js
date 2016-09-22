import { connect } from 'react-redux';
import { Shoots } from '../components/shoots.jsx';

const mapStateToProps = (state) => {
  let shoots = [];
  let user = state.accounts.activeSession.user;
  if (user) {
    shoots = state.photoshoots.usersPhotoshoots[user.id] || [];
  }
  return {
    photoshoots: shoots,
    retrieving: state.photoshoots.retrieving
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export const PhotoshootsList = connect(
  mapStateToProps,
  mapDispatchToProps
)(Shoots);
