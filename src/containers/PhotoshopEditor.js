import { connect } from 'react-redux';
import EditShoot from '../components/EditShoot.jsx';
import { requestUpdatePhotoshoot, requestDeletePhotoshoot } from '../actions/photoshootActions.js';

const mapStateToProps = (state, ownProps) => {
  let id = Number(ownProps.params.photoshootId);
  return {photoshoot: state.photoshoots.list.find(s => (s.id == id))};
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdatePhotoshootClick: (details) => {
      dispatch(requestUpdatePhotoshoot(details));
    },
    onDeletePhotoshootClick: (id) => {
      dispatch(requestDeletePhotoshoot(id));
    }
  };
};

export const PhotoshootEditor = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditShoot);

