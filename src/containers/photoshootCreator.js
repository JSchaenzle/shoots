import { connect } from 'react-redux';
import NewShoot from '../components/NewShoot.jsx';
import { requestAddPhotoshoot } from '../actions/photoshootActions.js';

const mapStateToProps = (state) => {
  return {photoshoots: state.photoshoots};
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddPhotoshootClick: (details) => {
      dispatch(requestAddPhotoshoot(details.name, details.date));
    }
  };
};

export const PhotoshootCreator = connect(
  mapStateToProps,
  mapDispatchToProps
)(NewShoot);
