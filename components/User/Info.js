import {Link} from "react-router-dom"
import GoBack from "../Common/GoBack"

import "./Info.sass"

const Button = props => {
  const {className, text, to, isIm} = props

  return !isIm ? null : (
    <Link 
      to={to}
      className={`${className} info-button flex`}>
      <div className="icon"/>
      <div className="text">{text}</div>
    </Link>
  )
}

const Info = props => {
  const {
    isIm, 
    view, 
    store, 
    getCookie
  } = props
  
  const {
    name, 
    username, 
    bio,
    isVerified
  } = store
  
  const reloadTo = getCookie("sid") ? "/im" : "/"
  const className = store.avatar ? "" : "text" 
  
  const avatar = {
    backgroundImage: `url(${store.avatar})`
  } 

  return (
    <div className="row user-info-wrapper flex">
      <Button 
        to="/profile" 
        className="profile-edit" 
        text={view.profile}
        isIm={isIm}
      />
      {
        !isIm 
        ? <GoBack reloadTo={reloadTo}/> 
        : null
      }
      <div className="content flex">
        <div className={`avatar-wrapper flex ${className}`}>
          {
            store.avatar
            ? <div className="icon" style={avatar}/>
            : <div className="name">{name.slice(0, 1)}</div>
          }
        </div>
        <Link 
          to={username} 
          title={isVerified ? view.official : ""}
          className={`name ${isVerified ? "verified" : ""}`}>
          {name}
        </Link>
        {
          bio ? <div className="bio">{bio}</div> : null
        }
      </div>
      <Button 
        to="/add" 
        className="add" 
        text={view.add}
        isIm={isIm}
      />
    </div>
  )
}

Info.propTypes = {
  view: PropTypes.shape({
    add: PropTypes.string.isRequired,
    profile: PropTypes.string.isRequired,
    official: PropTypes.string.isRequired
  }).isRequired,

  store: PropTypes.shape({
    avatar: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    bio: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    isVerified: PropTypes.bool.isRequired
  }).isRequired,

  isIm: PropTypes.bool.isRequired,
  getCookie: PropTypes.func.isRequired
}

export default Info