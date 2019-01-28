import PropTypes from "prop-types"
import {
  ResponsiveContainer,
  LineChart, 
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Brush
} from "recharts"

import "./LineChart.sass"

const renderTooltip = props => {
  const {active, payload} = props

  return !active ? null : (
    <div className="linechart-tooltip-wrapper flex">
      <span>{payload[0].payload.text}</span>
      <div className="items">
        <div className="visits">
          {payload[0].name}: {payload[0].payload.visits}
        </div>
        <div className="clicks">
          {payload[1].name}: {payload[1].payload.clicks}
        </div>
      </div>
    </div>
  )
}

const AnalyticsLineChart = props => {
  const {store, view, normalizeData} = props
  const {stage, data} = store
  const {clicks, visits, notData} = view
  const analyticsData = normalizeData(stage, view, data)

  return (
    <div className="line-chart-wrapper flex">
      {
        analyticsData 
        ? <ResponsiveContainer>
            <LineChart data={analyticsData}>
              {
                analyticsData.length > 12 && <Brush
                  travellerWidth={8}
                  height={35}
                />
              }
              <XAxis 
                dataKey={stage} 
                padding={{left: 10, right: 10}}
                tickLine={false}
              />
              <YAxis 
                padding={{bottom: 10, top: 10}}
              />
              <Tooltip 
                content={renderTooltip}
                cursor={false}
              />
              <Line 
                name={visits}
                dot={{r: 0}} 
                activeDot={{strokeWidth: 4, stroke: "#d88acc"}} 
                dataKey="visits" 
                stroke="#d88acc"
                animationDuration={600}
              />
              <Line 
                name={clicks}
                dot={{r: 0}} 
                activeDot={{strokeWidth: 4, stroke: "#56c167"}} 
                dataKey="clicks" 
                stroke="#56c167"
                animationDuration={600}
              />
            </LineChart>
          </ResponsiveContainer>
          : <div className="not-data">{notData}</div>
      }
    </div>
  )
}

AnalyticsLineChart.propTypes = {
  normalizeData: PropTypes.func.isRequired,

  store: PropTypes.shape({
    stage: PropTypes.string.isRequired,
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

  view: PropTypes.shape({
    notData: PropTypes.string.isRequired,
    clicks: PropTypes.string.isRequired,
    visits: PropTypes.string.isRequired,
    months: PropTypes.shape({
      default: PropTypes.arrayOf(
        PropTypes.string.isRequired
      ).isRequired,
      postfix: PropTypes.arrayOf(
        PropTypes.string.isRequired
      ).isRequired
    }).isRequired
  }).isRequired
}

export default AnalyticsLineChart