import ReactQRCode from "qrcode.react"
import ReactRange from "react-simple-range"

import "./QRCode.sass"

class QRCode extends React.Component {
  onScaleImage ({value}) {
    const {dispatch, actions} = this.context

    dispatch(actions.scaleQRCode(value))
  }

  render () {
    const {store} = this.props
    const {username, scale} = store
    const url = `${location.origin}/${username}`

    return (
      <div className="qr-code-wrapper flex">
        <ReactRange
          value={scale}
          type="range"
          min={7} 
          max={25} 
          step={.5} 
          onChange={::this.onScaleImage}
          sliderColor="#d88acc"
          trackColor="#d88acc"
          thumbColor="#d88acc"
        />
        <ReactQRCode 
          size={scale * 10}
          value={url}
        />
      </div>
    )
  }
}

QRCode.contextTypes = {
  dispatch: PropTypes.func.isRequired,
  actions: PropTypes.shape({
    scaleQRCode: PropTypes.func.isRequired
  }).isRequired
}

QRCode.propTypes = {
  store: PropTypes.shape({
    username: PropTypes.string.isRequired,
    scale: PropTypes.number.isRequired
  }).isRequired
}

export default QRCode