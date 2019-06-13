import React, {useState, useEffect} from 'react'
import ls from 'local-storage'

import Gamepad from 'react-gamepad'
import Sound from 'react-sound'

import styled from 'styled-components'
import {Card} from 'rebass'

import eventSequence from '../data/sequence/rick'

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

  const rickHandler = e => {
    // Count space and collecting keys
    ls('rickKey', [...ls('rickKey'), e])

    //
    // Ricked roll the game
    //

    /* Ricked everyone */
    if (eventSequence.every((key, i) => key === ls('rickKey')[i])) {
      setIsRicked('PLAYING')
    }

    /* Detect wrong sequence */
    ls('rickKey').some((key, i) => {
      if (key !== eventSequence[i]) {
        ls('rickKey', [])
        return true
      } else {
        return false
      }
    })
  }

  const gamepadUpHandler = e => {
    if (e === 'DPadUp') {
      rickHandler('ArrowUp')
    } else if (e === 'DPadDown') {
      rickHandler('ArrowDown')
    } else if (e === 'DPadLeft') {
      rickHandler('ArrowLeft')
    } else if (e === 'DPadRight') {
      rickHandler('ArrowRight')
    } else if (e === 'A' || e === 'B' || e === 'X' || e === 'Y') {
      rickHandler(`Key${e}`)
    } else if (e === 'LB' || e === 'LT') {
      rickHandler('KeyL')
    } else if (e === 'RB' || e === 'RT') {
      rickHandler('KeyR')
    } else if (e === 'Back') {
      rickHandler('ShiftLeft')
    } else if (e === 'Start') {
      rickHandler('ShiftRight')
    } else if (e !== null) {
      rickHandler(e)
    }
  }

  const keyUpHandler = e => {
    rickHandler(e.code)
  }

  useEffect(() => {
    ls('rickKey', [])
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
      <Gamepad onButtonUp={gamepadUpHandler}>
        <></>
      </Gamepad>
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
