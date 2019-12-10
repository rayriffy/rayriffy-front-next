import React, { useEffect, useState } from 'react'

import { get as lsGet, set as lsSet } from 'local-storage'
import Gamepad, { Button } from 'react-gamepad'

import styled from '@emotion/styled'
import { Link, Text } from 'rebass'

import eventSequence from '../data/sequence/happy'

const Container = styled.div`
  display: block;
`

const Title = styled(Text)`
  line-height: 2em;
  text-transform: lowercase;
  text-decoration: none;
  color: rgba(255, 255, 255, 0.4);
  letter-spacing: 0.416667em;
  text-align: center;
  display: block;
`

const Subtitle = styled(Link)`
  font-size: 19px;
  font-weight: 400;
  line-height: 1.2em;
  text-transform: lowercase;
  text-decoration: none;
  color: #e6e6e6;
  letter-spacing: 0.210526em;
  transition: color 0.2s ease-in-out;

  &::hover {
    color: rgba(140, 140, 140, 0.9);
  }
`

const Content: React.FC = props => {
  // Init state
  const [title, setTitle] = useState('code + music ≈ life')
  const [subtitle, setSubtitle] = useState('contact@rayriffy.com')

  const happyHandler = (e: string) => {
    // Collecting keys
    lsSet<string[]>('happyKey', [...lsGet<string[]>('happyKey'), e])

    /* For resetting the game */
    if (lsGet<number>('happyPhase') === eventSequence.length) {
      lsSet<number>('happyPhase', 0)
      lsSet<string[]>('happyKey', [e])
    }

    /* Verify and pointer increment */
    if (
      eventSequence[lsGet<number>('happyPhase')].every(
        (key, i) => key === lsGet<string[]>('happyKey')[i]
      )
    ) {
      switch (lsGet<number>('happyPhase')) {
        case 0:
          setTitle('ちょっと、↑にためて下さい。')
          setSubtitle('難易度：EASY')
          break
        case 1:
          setTitle('回転　一回転')
          setSubtitle('難易度：NORMAL')
          break
        case 2:
          setTitle('回転　反転　一回転')
          setSubtitle('難易度：NORMAL')
          break
        case 3:
          setTitle('回転　一回転')
          setSubtitle('難易度：HARD')
          break
        case 4:
          setTitle('ちょっと？　間違えないで下さい。')
          setSubtitle(
            '難易度：HARD<br />Left-shift: SELECT<br />Right-shift: START'
          )
          break
        case 5:
          setTitle('友人　同僚　彼氏　彼女')
          setSubtitle('難易度：INSANE')
          break
        case 6:
          setTitle('疲労　心労　問答無用')
          setSubtitle('難易度：INSANE')
          break
        case 7:
          setTitle('同時押し')
          setSubtitle('難易度：INSANE')
          break
        case 8:
          setTitle('リセット')
          setSubtitle('END')
          break
      }
      lsSet<string[]>('happyKey', [])
      lsSet<number>('happyPhase', lsGet<number>('happyPhase') + 1)
    }

    /* Detect wrong sequence */
    lsGet<string[]>('happyKey').some((key, i) => {
      if (key !== eventSequence[lsGet<number>('happyPhase')][i]) {
        lsSet<string[]>('happyKey', [])

        if (lsGet<number>('happyPhase') !== 0) {
          lsSet<number>('happyPhase', 0)
          setTitle('code + music ≈ life')
          setSubtitle('contact@rayriffy.com')
          // TODO: Set shake animation
        }

        return true
      } else {
        return false
      }
    })
  }

  const gamepadUpHandler = (e: Button) => {
    if (e === 'DPadUp') {
      happyHandler('ArrowUp')
    } else if (e === 'DPadDown') {
      happyHandler('ArrowDown')
    } else if (e === 'DPadLeft') {
      happyHandler('ArrowLeft')
    } else if (e === 'DPadRight') {
      happyHandler('ArrowRight')
    } else if (e === 'A' || e === 'B' || e === 'X' || e === 'Y') {
      happyHandler(`Key${e}`)
    } else if (e === 'LB' || e === 'LT') {
      happyHandler('KeyL')
    } else if (e === 'RB' || e === 'RT') {
      happyHandler('KeyR')
    } else if (e === 'Back') {
      happyHandler('ShiftLeft')
    } else if (e === 'Start') {
      happyHandler('ShiftRight')
    } else if (e !== null) {
      happyHandler(e)
    }
  }

  const keyUpHandler = (e: KeyboardEvent) => {
    happyHandler(e.code)
  }

  useEffect(() => {
    lsSet<string[]>('happyKey', [])
    lsSet<number>('happyPhase', 0)
    window.addEventListener('keyup', keyUpHandler)

    return () => {
      window.removeEventListener('keyup', keyUpHandler)
    }
  }, [])

  return (
    <Container>
      <Gamepad onButtonUp={gamepadUpHandler}>
        <React.Fragment />
      </Gamepad>
      <Title fontSize={24} fontWeight={300} my={3}>
        {title}
      </Title>
      <Subtitle
        href='mailto:contact@rayriffy.com'
        dangerouslySetInnerHTML={{ __html: subtitle }}
      />
    </Container>
  )
}

export default Content
