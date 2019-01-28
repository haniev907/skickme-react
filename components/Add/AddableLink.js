import Field from "../Common/Field"

import "./AddableLink.sass"

class AddableLink extends React.Component {
  onChange (event) {
    const {dispatch, actions} = this.context
    const {
      value, 
      dataset: {name, position}
    } = event.target

    dispatch(actions.setAddableField({
      name,
      position, 
      value
    }))
  }

  onCancel (event) {
    const {name} = event.currentTarget.dataset
    const {dispatch, actions} = this.context

    dispatch(actions.toggleSelectingLink(true, {name}))
  }

  getPrefix (prefix, {length}, i) {
    return length == 1 
      ? prefix 
      : length > 1 && i == length - 1
        ? prefix 
        : ""
  }

  render () {
    const {link} = this.props
    const placeholders = link.placeholder.split("@")

    const {
      fields, 
      name, 
      background, 
      icon,
      prefix,
      postfix
    } = link

    return (
      <div className="addable-link-wrapper flex">
        <div className="left-side flex" style={{background}}>
          <div 
            className="cancel" 
            data-name={name}
            onClick={::this.onCancel}
          />
          <div 
            className="icon" 
            style={{backgroundImage: icon}}
          />
        </div>
        <div className="right-side">
          {
            placeholders.map((placeholder, i) => {
              return <Field 
                key={i}
                data-name={name}
                data-position={i}
                type="text"
                name={name}
                prefix={this.getPrefix(prefix, placeholders, i)}
                postfix={postfix}
                placeholder={placeholder}
                value={fields[i] || ""}
                onChange={::this.onChange}
              />
            })
          }
        </div>
      </div>
    )
  }
}

AddableLink.contextTypes = {
  dispatch: PropTypes.func.isRequired,
  actions: PropTypes.shape({
    setAddableField: PropTypes.func.isRequired,
    toggleSelectingLink: PropTypes.func.isRequired
  }).isRequired
}

AddableLink.propTypes = {
  link: PropTypes.shape({
    placeholder: PropTypes.string.isRequired,
    prefix: PropTypes.string,
    postfix: PropTypes.string,
    fields: PropTypes.array.isRequired,
    name: PropTypes.string.isRequired,
    background: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired
  }).isRequired
}

export default AddableLink