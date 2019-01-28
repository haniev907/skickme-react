import "./TextChart.sass"

class TextChart extends React.Component {
  convertData (type, data) {
    if (!data.dates.length) return {}

    const numberWithCommas = number => {
      return number
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }

    const visitsCount = data.visits
      .reduce((previous, next) => previous + next)
    const clicksCount = data.clicks
      .reduce((previous, next) => previous + next)

    const percent = (clicksCount + visitsCount) / 100

    return {
      count: type == "visits" 
        ? numberWithCommas(visitsCount)
        : numberWithCommas(clicksCount),
      percent: Math.round(
        type == "visits" 
        ? visitsCount / percent 
        : clicksCount / percent
      )
    }
  }

  render () {
    const {store: {data}, view} = this.props
    const visits = this.convertData("visits", data)
    const clicks = this.convertData("clicks", data)

    return !data.dates.length ? null : (
      <div className="text-chart-wrapper flex">
        <div className="item visits flex">
          <div className="text">{view.allVisits}</div>
          <div className="graph flex">
            <div className="count">{visits.count}</div>
            <div className="percent">{visits.percent}%</div>
          </div>
        </div>
        <div className="item clicks flex">
          <div className="text">{view.allClicks}</div>
          <div className="graph flex">
            <div className="count">{clicks.count}</div>
            <div className="percent">{clicks.percent}%</div>
          </div>
        </div>
      </div>
    )
  }
}

TextChart.propTypes = {
  view: PropTypes.shape({
    allClicks: PropTypes.string.isRequired,
    allVisits: PropTypes.string.isRequired
  }).isRequired,

  store: PropTypes.shape({
    data: PropTypes.shape({
      dates: PropTypes.arrayOf(
        PropTypes.string
      ).isRequired,
      visits: PropTypes.arrayOf(
        PropTypes.number
      ).isRequired,
      clicks: PropTypes.arrayOf(
        PropTypes.number
      ).isRequired
    }).isRequired
  }).isRequired,
}

export default TextChart