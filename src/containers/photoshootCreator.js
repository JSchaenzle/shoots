import { connect } from 'react-redux';
import NewShoot from '../components/NewShoot.jsx';
import { requestAddPhotoshoot } from '../actions/photoshootActions.js';
import { browserHistory } from 'react-router';

const mapStateToProps = (state) => {
  return {photoshoots: state.photoshoots};
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddPhotoshootClick: (details) => {
      dispatch(requestAddPhotoshoot(details))
        .then(() => browserHistory.push("/photoshoots"));
    }
  };
};

export const PhotoshootCreator = connect(
  mapStateToProps,
  mapDispatchToProps
)(NewShoot);
