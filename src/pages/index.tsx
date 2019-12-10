import React, { useEffect, useState } from 'react'

import { get as lsGet, set as lsSet } from 'local-storage'
import Gamepad, { Button } from 'react-gamepad'
import Sound from 'react-sound'

import styled from '@emotion/styled'
import { Card } from 'rebass'

import eventSequence from '../data/sequence/rick'

import App from '../components/app'
import Navbar from '../components/navbar'
import Title from '../components/title'

interface ICover {
  ricked: boolean
}

const Cover = styled(Card)<ICover>`
  background-size: cover;
  background-position: center;

  height: 100%;
  perspective: 800px;
  transition: 150ms;
  ${(props: ICover) =>
    props.ricked === true
      ? `background-image: url('/static/rick.jpg');`
      : `background-image: url('/static/main.jpg');`}
`

const Page = styled(Card)`
  height: 100%;
`

const IndexPage: React.FC = props => {
  // Init state
  const [isRicked, setIsRicked] = useState<'PLAYING' | 'STOPPED' | 'PAUSED'>(
    'STOPPED'
  )

  const rickHandler = (e: string) => {
    // Count space and collecting keys
    lsSet('rickKey', [...lsGet<string[]>('rickKey'), e])

    //
    // Ricked roll the game
    //

    /* Ricked everyone */
    if (
      eventSequence.every((key, i) => key === lsGet<string[]>('rickKey')[i])
    ) {
      setIsRicked('PLAYING')
    }

    /* Detect wrong sequence */
    lsGet<string[]>('rickKey').some((key, i) => {
      if (key !== eventSequence[i]) {
        lsSet<string[]>('rickKey', [])

        return true
      } else {
        return false
      }
    })
  }

  const gamepadUpHandler = (e: Button) => {
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

  const keyUpHandler = (e: KeyboardEvent) => {
    rickHandler(e.code)
  }

  useEffect(() => {
    lsSet<string[]>('rickKey', [])
    window.addEventListener('keyup', keyUpHandler)

    return () => {
      window.removeEventListener('keyup', keyUpHandler)
    }
  }, [])

  return (
    <App>
      <Sound
        url='/static/rick.mp3'
        playStatus={isRicked}
        onFinishedPlaying={() => {
          setIsRicked('STOPPED')
        }}
      />
      <Gamepad onButtonUp={gamepadUpHandler}>
        <React.Fragment />
      </Gamepad>
      <Cover ricked={isRicked === 'PLAYING'}>
        <Page color='white' bg='rgba(0,0,0,0.5)'>
          <Navbar />
          <Title />
        </Page>
      </Cover>
    </App>
  )
}

export default IndexPage
