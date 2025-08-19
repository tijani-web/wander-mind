import React from 'react'
import Hero from '../components/Hero'
import { Layout } from '../components/Layout'

const Home = () => {
  return (
    <div className="home-page">
      <Layout>
        <Hero/>
      </Layout>
    </div>
  )
}

export default Home