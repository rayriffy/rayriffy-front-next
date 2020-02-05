import React from 'react'

import { INav } from '../@types/INav'

import { Box, Flex, Link, Slide } from '@chakra-ui/core'

export const Nav: React.FC<INav> = props => {
  const { transition, from, items, children } = props

  return (
    <Slide in={transition} from={from} items={[true]} duration={1000}>
      {(styles: any) => {
        const component = (
          <Flex
            opacity={styles.opacity}
            transform={styles.transform}
            width={['100%', '100%', 'auto']}
            direction={['row', 'row', 'column']}
            justify='center'
            px={12}>
            {items.map((item, i) => {
              return (
                <Box
                  px={[4, 4, 2]}
                  py={[2, 2, 4]}
                  key={`nav-item-${item.name}-${i}`}>
                  <Link href={item.href} aria-label={item.name} isExternal>
                    <Box as={item.icon} size='32px' color='white' />
                  </Link>
                </Box>
              )
            })}
            {children}
          </Flex>
        ) as any

        return component
      }}
    </Slide>
  )
}
