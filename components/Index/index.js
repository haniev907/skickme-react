import Services from "services"
import {Link} from "react-router-dom"
import Languages from "../Common/Languages"
import Blazy from "blazy"

import "./Index.sass"

class Index extends React.Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  componentWillMount () {
    const {getCookie} = Services

    const sid = getCookie("sid")
    const auth = getCookie("auth")
    const id = getCookie("id")

    if (sid && auth && id)
      this.context.router.history.push("/im")
  }

  componentDidMount () {
    new Blazy
  }

  render () {
    const {
      title, 
      description, 
      buttons,
      languages,
      previewContent,
      pricing
    } = Services.getDictionary("index")

    return (
      <div className="index-page flex">
        <div className="left-side flex">
          <div className="logo"/>
          <div className="content flex">
            <div className="title">{title}</div>
            <div className="description">{description}</div>
            <div className="buttons flex">
              {
                buttons.map((button, i) => {
                  return (
                    <Link to={button.to} key={i} className="button">
                      <button>{button.text}</button>
                    </Link>
                  )
                })
              }
            </div>
            <div className="pricing">{pricing}</div>
          </div>
          <Languages
            getLanguage={Services.language}
            view={languages}
          />
        </div>
        <div className="right-side flex">
          <div className="preview-wrapper">
            <div 
              className="preview b-lazy"
              data-src={`${__PUBLIC_PATH__}preview-wrapper.png`}
            />
            <div 
              className="preview-content b-lazy" 
              data-src={`${__PUBLIC_PATH__}${previewContent}`} 
            />
          </div>
        </div>
      </div>
    )
  }
}

export default Index