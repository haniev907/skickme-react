import {Link} from "react-router-dom"
import Languages from "../Common/Languages"

import "./Header.sass"

class Header extends React.Component {
  render () {
    const {
      isIm, 
      languages, 
      getLanguage,
      onMenuOpen
    } = this.props
    
    return isIm
      ? <div className="header-wrapper flex row">
          <div className="menu-button" onClick={onMenuOpen}>
            <div/>
          </div>
          <Languages
            view={languages}
            getLanguage={getLanguage}
          />
        </div>
      : null
  }
}

Header.propTypes = {
  languages: PropTypes.array.isRequired,
  getLanguage: PropTypes.func.isRequired,
  isIm: PropTypes.bool.isRequired,
  onMenuOpen: PropTypes.func.isRequired
}

export default Header