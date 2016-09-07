import { connect } from 'react-redux';
import { NewShoot } from '../components/shoots.jsx';
import { requestAddPhotoshoot } from '../actions/photoshootActions.js';

const mapStateToProps = (state) => {
  return {photoshoots: state.photoshoots};
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddPhotoshootClick: (details) => {
      console.log("In Container. details:", details);
      dispatch(requestAddPhotoshoot(details.name, details.date));
    }
  };
};

export const PhotoshootCreator = connect(
  mapStateToProps,
  mapDispatchToProps
)(NewShoot);
