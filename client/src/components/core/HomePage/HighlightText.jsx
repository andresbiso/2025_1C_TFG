import PropTypes from 'prop-types';

const HighlightText = ({ text }) => {
  return (
    <span className="font-bold text-richblue-200 gradient_color"> {text}</span>
  );
};

HighlightText.propTypes = {
  text: PropTypes.string,
};

export default HighlightText;
