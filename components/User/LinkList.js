import ScrollBar from "react-custom-scrollbars"
import Link from "./Link"

import "./LinkList.sass"

const filterByName = (array, name, isReverse) => {
  return array.filter(item => {
    return isReverse
      ? item.name != name
      : item.name == name
  })
}

const linksMap = (links, linksView) => {
  return links.map(link => {
    const linkView = filterByName(linksView, link.name)[0]

    return !linkView ? null : {
      ...link,
      background: linkView.background
    }
  }).filter(link => link)
}

const LinkList = props => {
  const {
    isIm, 
    store,
    onClick, 
    onRemove, 
    linkConfigure,
    view: {
      empty, 
      links
    }
  } = props

  const linksMapped = linksMap(store.links, links)
  const buttons = filterByName(linksMapped, "nbutton")
  const others = filterByName(linksMapped, "nbutton", true)

  const otherClass = buttons.length && 
    others.length && "padding"
 
  const renderLink = (type, link, i) => (
    <Link
      link={link}
      key={`${link.name}-${i}`}
      type={type}
      isIm={isIm}
      onClick={onClick}
      onRemove={onRemove}
      linkConfigure={linkConfigure}
    />
  )

  return linksMapped.length
    ? <div className="link-list row flex">
      <ScrollBar 
        autoHeight
        autoHide={false}
        universal
        renderView={
          props => <div 
              {...props} 
              className="scrollbar-view flex"
            />
        }>
        <div className="button-links flex">
          {
            buttons
              .reverse()
              .map(renderLink.bind(this, "button"))
          }
        </div>
      </ScrollBar>
      <div className={`other-links flex ${otherClass}`}>
        {
          others
            .reverse()
            .map(renderLink.bind(this, "other"))
        }
      </div>
    </div>
    : <div className="empty-links row">
        {isIm ? empty.im : empty.user}
      </div>
}

LinkList.propTypes = {
  isIm: PropTypes.bool.isRequired,
  
  store: PropTypes.shape({
    links: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired
      })
    ).isRequired
  }).isRequired,

  view: PropTypes.shape({
    links: PropTypes.arrayOf(
      PropTypes.shape({
        background: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
      }).isRequired,
    ).isRequired,

    empty: PropTypes.shape({
      im: PropTypes.string.isRequired,
      user: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  
  onClick: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  linkConfigure: PropTypes.func.isRequired
}

export default LinkList