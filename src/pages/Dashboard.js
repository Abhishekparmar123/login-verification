import React from 'react'
import Chart from '../components/Barchart'

function Dashboard() {
  return (
    <div className='container'>
      <div className='is-flex is-justify-content-center is-align-items-center div--height'>
        <Chart/>
      </div>
    </div>
  )
}

export default Dashboard