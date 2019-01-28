import {Link} from "react-router-dom"
import Field from "./Field"

import "./Form.sass"

class Form extends React.Component {
  onSubmit (event) {
    event.preventDefault()

    this.props.onSubmit(this.props.store.fields)
  }

  onChangeField (event) {
    const {name, value} = event.target
    const {dispatch, actions} = this.context
    
    dispatch(actions.setField(name, value))
  }

  render () {
    const {
      store,
      title, 
      fields, 
      legal,
      avatar,
      accordion,
      button
    } = this.props

    return (
      <div className="form-wrapper">
        {
          title && <div className="title">
            {title}
          </div> 
        }
        {
          avatar && avatar
        }
        <form onSubmit={::this.onSubmit}>
          {
            accordion
            ? <accordion.Component 
                data={accordion.data} 
                store={store}
                onChangeField={::this.onChangeField}
              />
            : fields.map((input, i) => {
              const {type, name, placeholder} = input
              const value = store.fields[name]

              return <Field 
                key={i}
                type={type} 
                name={name} 
                placeholder={placeholder} 
                value={value} 
                onChange={::this.onChangeField}
              />
            })
          }
          {
            legal && legal
          }
          <button>{button}</button>
        </form>
      </div>
    )
  }
}

Form.contextTypes = {
  dispatch: PropTypes.func.isRequired,
  actions: PropTypes.shape({
    setField: PropTypes.func.isRequired
  }).isRequired
}

Form.propTypes = {
  store: PropTypes.shape({
    fields: PropTypes.object.isRequired
  }).isRequired,
  
  title: PropTypes.string,
  fields: PropTypes.array,
  button: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  legal: PropTypes.node,
  avatar: PropTypes.node,

  accordion: PropTypes.shape({
    Component: PropTypes.func.isRequired,
    data: PropTypes.array.isRequired
  })
}

export default Form