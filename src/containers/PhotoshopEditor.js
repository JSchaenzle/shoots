import { connect } from 'react-redux';
import EditShoot from '../components/EditShoot.jsx';
import { requestUpdatePhotoshoot, requestDeletePhotoshoot } from '../actions/photoshootActions.js';
import { browserHistory } from 'react-router';

const mapStateToProps = (state, ownProps) => {
  let id = Number(ownProps.params.photoshootId);
  return {photoshoot: state.photoshoots.list.find(s => (s.id == id))};
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

