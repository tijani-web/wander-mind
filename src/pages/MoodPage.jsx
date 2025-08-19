import React from 'react'
import { Layout } from '../components/Layout'
import Mood from '../components/Mood'

const MoodPage = () => {
  return (
    <div className="mood-page">
      <Layout>
        <Mood/>
    </Layout>
    </div>
  )
}

export default MoodPage