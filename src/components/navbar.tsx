import React, { useEffect, useState } from 'react'

import styled from '@emotion/styled'
import { Box, Flex, Link, Text } from 'rebass'

interface INav {
  name: string
  to: string
}

const Cover = styled(Flex)`
  height: 15%;
`

const Item = styled(Text)`
  letter-spacing: 3px;
`

const ItemLink = styled(Link)`
  text-decoration: none;
`

const Navbar: React.FC = props => {
  // Init state
  let hideNudity = true
  let nudityCount = 0

  const [nav, setNav] = useState<INav[]>([])
  const defaultNav: INav[] = [
    {
      name: 'blog',
      to: 'https://blog.rayriffy.com',
    },
    {
      name: 'github',
      to: 'https://github.com/rayriffy',
    },
    {
      name: 'about',
      to: 'https://cv.rayriffy.com',
    },
  ]

  const keyUpHandler = (e: KeyboardEvent) => {
    // Count space and collecting keys
    if (e.keyCode === 32) {
      nudityCount++
    }

    if (nudityCount % 10 === 0 && nudityCount !== 0) {
      hideNudity = !hideNudity
      nudityCount = 0

      if (hideNudity === true) {
        setNav(defaultNav)
      } else {
        setNav(prev => [
          ...prev,
          { name: 'nsfw', to: 'https://h.rayriffy.com' },
        ])
      }
    }
  }

  useEffect(() => {
    window.addEventListener('keyup', keyUpHandler)
    setNav(defaultNav)

    return () => {
      window.removeEventListener('keyup', keyUpHandler)
    }
  }, [])

  return (
    <Cover justifyContent='center' alignItems='center'>
      <Box width={[4 / 5, 3 / 5, 1 / 3, 1 / 4]}>
        <Flex alignItems='center'>
          {nav.map(item => (
            <Item
              textAlign='center'
              fontSize={19}
              fontWeight={300}
              width={1 / nav.length}
              p={2}
              key={`nav-${item.name}`}>
              <ItemLink href={item.to} color='rgba(140,140,140,.9)'>
                {item.name}
              </ItemLink>
            </Item>
          ))}
        </Flex>
      </Box>
    </Cover>
  )
}

export default Navbar
