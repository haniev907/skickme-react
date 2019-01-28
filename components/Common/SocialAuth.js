import "./SocialAuth.sass"

class SocialAuth extends React.Component {
  onAuthInstagram (event) {
    const oAuthInstagram = this.props.oAuth("instagram")
    location.href = oAuthInstagram
  }

  render () {
    const {instagram} = this.props.auth

    return (
      <div className="social-auth-wrapper flex">
        <button 
          onClick={::this.onAuthInstagram} 
          className="instagram">
          {instagram}
        </button>
      </div>
    )
  }
}

SocialAuth.propTypes = {
  oAuth: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

export default SocialAuth