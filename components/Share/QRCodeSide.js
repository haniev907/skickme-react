import QRCode from "./QRCode"
import "./QRCodeSide.sass"

const QRCodeSide = props => {
  const {
    view,
    store
  } = props
  
  const {
    title, 
    description
  } = view

  return (
    <div className="qr-code-side flex">
      <div className="title">{title}</div>
      <div className="description">{description}</div>
      <QRCode store={store}/>
    </div>
  )
}

QRCodeSide.propTypes = {
  store: PropTypes.object.isRequired,
  view: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
  }).isRequired
}

export default QRCodeSide