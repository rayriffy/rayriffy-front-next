import React from 'react'

import { NextPage } from 'next'

import { Box, Flex, Heading } from '@chakra-ui/core'

const IndexPage: NextPage = props => {
  return (
    <Box height='100%' px={4}>
      <Flex height='10%' justify='center' align='center'>
        NAV
      </Flex>
      <Flex height='80%' justify='center' align='center'>
        <Box>
          <Heading
            size='md'
            letterSpacing='0.175em'
            color='gray.300'
            textAlign={['left', 'right']}>
            FULL-STACK DEVELOPER
          </Heading>
          <Heading size='xl' color='white' py={2}>
            Phumrapee Limpianchop
          </Heading>
          <Heading size='md' letterSpacing='0.175em' color='gray.300'>
            リッフィー レー
          </Heading>
        </Box>
      </Flex>
      <Flex height='10%' justify='center' align='center'>
        FOOTER
      </Flex>
    </Box>
  )
}

export default IndexPage
