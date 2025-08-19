import React from 'react'
import { Layout } from '../components/Layout'
import Journal from '../components/Journal'

const JournalPage = () => {
  return (
    <div className='journal-page'>
        <Layout>
            <Journal/>
        </Layout>
    </div>
  )
}

export default JournalPage