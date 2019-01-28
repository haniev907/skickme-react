import PropTypes from "prop-types"
import {Link} from "react-router-dom"

import "./Legal.sass"

const Legal = props => {
  const {legal} = props
  
  return (
    <div className="legal-wrapper">
      {legal.text}
      <Link to={legal.link.to}>
        {legal.link.text}
      </Link>
    </div>
  )
}

Legal.propTypes = {
  legal: PropTypes.shape({
    text: PropTypes.string.isRequired,
    link: PropTypes.shape({
      text: PropTypes.string.isRequired,
      to: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
}

export default Legal