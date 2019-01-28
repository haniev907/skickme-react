import {Link} from "react-router-dom"
import "./Field.sass"

const Prepofix = props => {
  const {prepofix} = props

  return prepofix
    ? <span 
        className="prepofix">
        {prepofix}
      </span>
    : null
}

const Field = props => {
  const {
    type, 
    placeholder, 
    readOnly,
    prefix,
    postfix
  } = props

  const newProps = {
    ...props,
    placeholder: null
  }

  return (
    <label className="input-wrapper">
      <span>{placeholder}</span>
      <div className="field-wrapper flex">
        <Prepofix prepofix={prefix}/>
        {
          type == "textarea"
          ? <textarea {...newProps}/>
          : <input {...newProps} 
              readOnly={!!readOnly}
            />
        }
        <Prepofix prepofix={postfix}/>
      </div>
    </label>
  )
}

Field.propTypes = {
  type: PropTypes.string.isRequired,
  readOnly: PropTypes.bool,
  prefix: PropTypes.string,
  postfix: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

export default Field