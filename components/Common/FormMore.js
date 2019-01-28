import {Link} from "react-router-dom"
import "./FormMore.sass"

const FormMore = props => {  
  return (
    <div className="form-more">
      {
        props.items.map((item, i) => {
          const {to, text} = item
          return <Link key={i} to={to}>{text}</Link>
        })
      }
    </div>
  )
}

FormMore.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      to: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired
    }).isRequired
  ).isRequired
}

export default FormMore