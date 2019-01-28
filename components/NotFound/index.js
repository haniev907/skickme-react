import {Link} from "react-router-dom"
import "./Index.sass"

class NotFound extends React.Component {
  componentDidMount () {
    document
      .querySelector(".main-preloader")
      .classList
      .add("hide")
  }

  render () {
    return (
      <Link to="/" className="not-found-link">
        <div className="not-found-page page">
          <div className="container flex">
            <div className="logo"/>
            <div className="text">404</div>
          </div>
        </div>
      </Link>
    )
  }
}

export default NotFound