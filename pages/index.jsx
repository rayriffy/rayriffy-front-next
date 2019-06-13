import React, {useState, useEffect} from 'react'

import styled from 'styled-components'
import Sound from 'react-sound'

import {Card} from 'rebass'

import App from '../components/App'
import Navbar from '../components/Navbar'
import Title from '../components/Title'

const Cover = styled(Card)`
  height: 100%;
  perspective: 800px;
  transition: 150ms;
  ${props => (props.ricked === true ? `background-image: url('/static/rick.jpg');` : `background-image: url('/static/main.jpg');`)}
`

const Page = styled(Card)`
  height: 100%;
`

const Index = props => {
  // Init state
  let [isRicked, setIsRicked] = useState('STOPPED')
  let mointRickKey = []

  const eventRick = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]

  const keyUpHandler = e => {
    // Count space and collecting keys
    if (e.keyCode !== 32) {
      mointRickKey = [...mointRickKey, e.keyCode]
    }

    //
    // Ricked roll the game
    //

    /* Ricked everyone */
    if (eventRick.every((key, i) => key === mointRickKey[i])) {
      setIsRicked('PLAYING')
    }

    /* Detect wrong sequence */
    mointRickKey.some((key, i) => {
      if (key !== eventRick[i]) {
        mointRickKey = []
        return true
      } else {
        return false
      }
    })
  }

  useEffect(() => {
    window.addEventListener('keyup', keyUpHandler)
    return () => {
      window.removeEventListener('keyup', keyUpHandler)
    }
  }, [])

  return (
    <App>
      <Sound
        url="/static/rick.mp3"
        playStatus={isRicked}
        onFinishedPlaying={() => {
          setIsRicked('STOPPED')
        }}
      />
      <Cover backgroundSize="cover" backgroundPosition="center" ricked={isRicked === 'PLAYING'}>
        <Page color="white" bg="rgba(0,0,0,0.5)">
          <Navbar />
          <Title />
        </Page>
      </Cover>
    </App>
  )
}

export default Index

Index.propTypes = {}
