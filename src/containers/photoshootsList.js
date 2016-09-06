import { connect } from 'react-redux';
import { Shoots } from '../components/shoots.jsx';

const mapStateToProps = (state) => {
  return {photoshoots: state.photoshoots};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export const PhotoshootsList = connect(
  mapStateToProps,
  mapDispatchToProps
)(Shoots);
