import { connect } from 'react-redux';
import EditShoot from '../components/EditShoot.jsx';
import { requestUpdatePhotoshoot } from '../actions/photoshootActions.js';

const mapStateToProps = (state) => {
  return {photoshoots: state.photoshoots};
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdatePhotoshootClick: (details) => {
      dispatch(requestUpdatePhotoshoot(details.id, details.name, details.date));
    }
  };
};

export const PhotoshootEditor = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditShoot);

