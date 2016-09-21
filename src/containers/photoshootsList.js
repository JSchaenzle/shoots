import { connect } from 'react-redux';
import { Shoots } from '../components/shoots.jsx';

const mapStateToProps = (state) => {
  let userId = state.accounts.activeSession.user.id;
  let shoots = state.photoshoots.usersPhotoshoots[userId] || [];
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
