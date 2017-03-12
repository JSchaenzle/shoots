import { connect } from 'react-redux';
import EditShoot from '../components/EditShoot.jsx';
import { requestUpdatePhotoshoot, requestDeletePhotoshoot } from '../actions/photoshootActions.js';
import { browserHistory } from 'react-router';

const mapStateToProps = (state, ownProps) => {
  let photoshootId = Number(ownProps.params.photoshootId);
  let userId = state.accounts.activeSession.user.id;
  let shoots = state.photoshoots.usersPhotoshoots[userId] || [];

  return {photoshoot: shoots.find(s => (s.id === photoshootId))};
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdatePhotoshootClick: (details) => {
      dispatch(requestUpdatePhotoshoot(details))
               .then(() => browserHistory.push("/photoshoots"));
    },
    onDeletePhotoshootClick: (id) => {
      dispatch(requestDeletePhotoshoot(id))
        .then(() => browserHistory.push("/photoshoots"));
    }
  };
};

export const PhotoshootEditor = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditShoot);

