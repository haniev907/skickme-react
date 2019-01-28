import "./Languages.sass"

class Languages extends React.Component {
  onClick (event) {
    const {dataset} = event.currentTarget

    localStorage.setItem("sk-language", dataset.name)
    location.reload()
  }

  filterLanguages (languages) {
    const currentLanguage = this.props.getLanguage()

    return languages.filter(language => {
      return language.name != currentLanguage
    })
  }

  render () {
    const languages = this.filterLanguages(this.props.view)

    return (
      <div className="languages-wrapper flex">
        {
          languages.map((language, i) => {
            return (
              <div 
                key={i}
                onClick={::this.onClick}
                data-name={language.name}
                className="language">
                {language.text}
              </div>
            )
          })
        }
      </div>
    )
  }
}

Languages.propTypes = {
  getLanguage: PropTypes.func.isRequired,
  view: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired
    }).isRequired
  ).isRequired
}

export default Languages