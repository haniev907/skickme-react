import Field from "../Common/Field"
import {Link} from "react-router-dom"
import Collapse from "react-css-collapse"

import "./Accordion.sass"

const FormAccordionItem = props => {
  const {
    isOpen,
    onChangeField, 
    store, 
    fields
  } = props
  
  return fields
  ? <Collapse isOpen={isOpen} className="accordion-item">
      {
        fields.map((field, i) => {
          return <Field 
            key={i} 
            onChange={onChangeField} 
            value={store.fields[field.name]}
            {...field}
          />
        })
      }
    </Collapse>
  : null
}

class FormAccordion extends React.Component {
  getIcon (name) {
    return `url(${__PUBLIC_PATH__}${name}.svg)`
  }

  onClick (event) {
    const {dispatch, actions, router} = this.context
    const {position, link} = event.currentTarget.dataset

    link !== "null"
    ? router.history.push(link)
    : dispatch(actions.setAccordionPosition(position))
  }

  isAccordionItemOpen (position) {
    const {accordionPosition} = this.props.store

    return accordionPosition == position ? true : false
  }

  accordionItemHeaderClassname (position, size) {
    return size -1 == position
      ? "header flex last"
      : "header flex"
  }

  render () {
    const {data, onChangeField, store} = this.props

    return (
      <div className="form-accordion-wrapper">
        {
          data.map((item, i) => {
            const {title, icon, fields, to} = item
            
            return (
              <div 
                onClick={::this.onClick} 
                className="accordion-wrapper" 
                data-position={i}
                data-link={to ? to : "null"}
                key={i}>
                <div className={this.accordionItemHeaderClassname(i, data.length)}>
                  {
                    icon && <div 
                      className="icon" 
                      style={{backgroundImage: this.getIcon(icon)}}
                    />
                  }
                  <div className="title">{title}</div>
                </div>
                <FormAccordionItem 
                  isOpen={this.isAccordionItemOpen(i)}
                  onChangeField={onChangeField}
                  store={store}
                  fields={fields}
                />
              </div>
            )
          })
        }
      </div>
    )
  }
}

FormAccordion.contextTypes = {
  router: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  actions: PropTypes.shape({
    setAccordionPosition: PropTypes.func.isRequired
  }).isRequired
}

FormAccordion.propTypes = {
  store: PropTypes.shape({
    accordionPosition: PropTypes.number.isRequired,
    fields: PropTypes.shape(
      PropTypes.string.isRequired
    )
  }).isRequired,

  onChangeField: PropTypes.func,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      icon: PropTypes.string,
      to: PropTypes.string,
      fields: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired
        }).isRequired
      )
    }).isRequired
  ).isRequired
}

export default FormAccordion