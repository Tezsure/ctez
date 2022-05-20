import { Box, Button, ButtonGroup, Center, Flex, Skeleton, SkeletonCircle, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useMediaQuery } from '@chakra-ui/react';
import React from 'react'
import { useThemeColors } from '../../hooks/utilHooks';
import './analytics.css';
import GraphCtez from './graph_ctez';
import GraphDrift from './graph_drift';


const AnaluticsPage: React.FC = () => {
    const [textcolor] = useThemeColors(['homeTxt']);
    const [textHighlight] = useThemeColors(['sideBarBg']);
    const [largerScreen] = useMediaQuery(['(min-width: 900px)']);
    const [background, imported, text4] = useThemeColors([
        'cardbg',
        'imported',
        'text4',
    ]);
    return (
        <div style={{ padding: largerScreen ? '55px' : '35px' }}>
            <Center>
                <Text
                    color={textcolor}
                    fontSize={largerScreen ? '48px' : '26px'}
                    lineHeight="50px"
                    fontWeight={400}
                    textAlign='center'
                >
                    Ctez is managing <b className='gradientcolortext'>$3.4m</b> across <b className='gradientcolortext'>351 ovens</b>
                </Text>
            </Center>
            <div className='section-container'>
                <Text
                    fontSize={largerScreen ? '30px' : '20px'}
                    lineHeight="50px"
                    fontWeight={400}
                    className='gradientcolortext'
                    marginBottom='20px'
                >
                    Protocol
                </Text>
                <Flex direction='row' wrap='wrap' gridGap='10' >
                    <GraphCtez />
                    <GraphDrift/>
                </Flex>
            </div>
            <div className='section-container'>
                <Text
                    fontSize={largerScreen ? '30px' : '20px'}
                    lineHeight="50px"
                    fontWeight={400}
                    className='gradientcolortext'
                    marginBottom='20px'
                >
                    Ovens
                </Text>
                <TableContainer
                    backgroundColor={background}
                    fontSize='14px'
                    borderRadius={16}
                    textAlign='right'
                >
                    <Table variant='simple'>
                        <Thead>
                            <Tr>
                                <Th isNumeric>Total</Th>
                                <Th isNumeric>Created</Th>
                                <Th isNumeric>Liquidated</Th>
                                <Th isNumeric>TVL</Th>
                                <Th isNumeric>Total Supply</Th>
                                <Th isNumeric>Collateral Supply</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            <Tr>
                                <Td isNumeric>351</Td>
                                <Td isNumeric>602</Td>
                                <Td isNumeric>52</Td>
                                <Td isNumeric>853k tez</Td>
                                <Td isNumeric>694k tez</Td>
                                <Td isNumeric>110%</Td>
                            </Tr>
                        </Tbody>
                    </Table>
                </TableContainer>
            </div>

            <div className='section-container'>
                <Flex direction='row' wrap='wrap' gridGap='10' >
                <Flex direction='column'
                        borderRadius={16}
                        backgroundColor={background}
                        flex={1}
                        paddingX='35px'
                        paddingY='27px'
                        gridGap={6}
                    >

                        <Flex justifyContent='space-between' >
                            <Text
                                color={textcolor}
                                fontSize={largerScreen ? '20px' : '16px'}
                                lineHeight="29px"
                                fontWeight={400}
                            >
                                TVL
                            <div style={{fontSize:'32px',fontWeight:600}}>
                            $3.4M
                            </div>
                            </Text>
                            <ButtonGroup variant='ghost' textColor={textcolor} fontSize='12px' spacing='-1'>
                                <Button fontSize='12px' textDecoration='underline'>1W</Button>
                                <Button fontSize='12px' textDecoration='underline' >1M</Button>
                                <Button fontSize='12px' textDecoration='underline'>ALL</Button>
                            </ButtonGroup>

                        </Flex>
                        <Skeleton height='250px' minWidth='20px' />
                    </Flex>





                    <Flex direction='column'
                        borderRadius={16}
                        backgroundColor={background}
                        flex={1}
                        paddingX='35px'
                        paddingY='27px'
                        gridGap={6}
                        justifyContent='center'
                    >

                        <Flex justifyContent='space-between'>
                            <Text
                                color={textcolor}
                                fontSize={largerScreen ? '20px' : '16px'}
                                lineHeight="29px"
                                fontWeight={600}
                            >
                                Ovens
                            </Text>

                        </Flex>
                        <Flex justifyContent='center'>
                        <SkeletonCircle size='250' />
                        </Flex>
                       
                    </Flex>

                </Flex>
            </div>
                <div className='section-container'>
                    <Box
                     backgroundColor={background}
                     fontSize='14px'
                     borderRadius={16}
                     
                     paddingY={35}
                     paddingX={25}
                     >
                 <Flex justifyContent='space-between' wrap='wrap'>
                            <Text
                                color={textcolor}
                                fontSize={largerScreen ? '20px' : '16px'}
                                lineHeight="29px"
                                fontWeight={600}
                            >
                                Transactions
                            </Text>
                            <ButtonGroup variant='ghost' textColor={textcolor}  spacing='-1'>
                                <Button fontSize='12px' textDecoration='underline'>Mint</Button>
                                <Button fontSize='12px' textDecoration='underline' >Burn</Button>
                                <Button fontSize='12px' textDecoration='underline'>Deposit</Button>
                                <Button fontSize='12px' textDecoration='underline'>Withdraw</Button>
                            </ButtonGroup>

                </Flex>
                <TableContainer
                   textAlign='center'
                >
                    <Table variant='simple'>
                        <Thead>
                            <Tr>
                                <Th  textAlign='left'>Minted</Th>
                                <Th >Target</Th>
                                <Th >Oven</Th>
                                <Th >Account</Th>
                                <Th isNumeric>Time</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            <Tr>
                                <Td  textAlign='left'>100ctez</Td>
                                <Td >1.05</Td>
                                <Td >KTae...45</Td>
                                <Td >T21xy...23</Td>
                                <Td isNumeric>2 hours ago</Td>
                            </Tr>
                            <Tr>
                                <Td  textAlign='left'>100ctez</Td>
                                <Td >1.05</Td>
                                <Td >KTae...45</Td>
                                <Td >T21xy...23</Td>
                                <Td isNumeric>2 hours ago</Td>
                            </Tr>
                            <Tr>
                                <Td  textAlign='left'>100ctez</Td>
                                <Td >1.05</Td>
                                <Td >KTae...45</Td>
                                <Td >T21xy...23</Td>
                                <Td isNumeric>2 hours ago</Td>
                            </Tr>
                            <Tr>
                                <Td  textAlign='left'>100ctez</Td>
                                <Td >1.05</Td>
                                <Td >KTae...45</Td>
                                <Td >T21xy...23</Td>
                                <Td isNumeric>2 hours ago</Td>
                            </Tr>
                            <Tr>
                                <Td  textAlign='left'>100ctez</Td>
                                <Td >1.05</Td>
                                <Td >KTae...45</Td>
                                <Td >T21xy...23</Td>
                                <Td isNumeric>2 hours ago</Td>
                            </Tr>
                            <Tr>
                                <Td  textAlign='left'>100ctez</Td>
                                <Td >1.05</Td>
                                <Td >KTae...45</Td>
                                <Td >T21xy...23</Td>
                                <Td isNumeric>2 hours ago</Td>
                            </Tr>
                            <Tr>
                                <Td  textAlign='left'>100ctez</Td>
                                <Td >1.05</Td>
                                <Td >KTae...45</Td>
                                <Td >T21xy...23</Td>
                                <Td isNumeric>2 hours ago</Td>
                            </Tr>
                            <Tr>
                                <Td  textAlign='left'>100ctez</Td>
                                <Td >1.05</Td>
                                <Td >KTae...45</Td>
                                <Td >T21xy...23</Td>
                                <Td isNumeric>2 hours ago</Td>
                            </Tr>
                        </Tbody>
                    </Table>
                </TableContainer>
                </Box>
            </div>

            <div className='section-container'>
                <Flex direction='row' wrap='wrap' gridGap='10' >
                <Flex direction='column'
                        borderRadius={16}
                        backgroundColor={background}
                        flex={1}
                        paddingX='35px'
                        paddingY='27px'
                        gridGap={6}
                    >

                        <Flex justifyContent='space-between' >
                            <Text
                                color={textcolor}
                                fontSize={largerScreen ? '20px' : '16px'}
                                lineHeight="29px"
                                fontWeight={400}
                            >
                                TVL
                            <div style={{fontSize:'32px',fontWeight:600}}>
                            $3.4M
                            </div>
                            </Text>
                            <ButtonGroup variant='ghost' textColor={textcolor} fontSize='12px' spacing='-1'>
                                <Button fontSize='12px' textDecoration='underline'>1W</Button>
                                <Button fontSize='12px' textDecoration='underline' >1M</Button>
                                <Button fontSize='12px' textDecoration='underline'>ALL</Button>
                            </ButtonGroup>

                        </Flex>
                        <Skeleton height='300px' minWidth='20px' />
                    </Flex>
                    <Flex direction='column'
                        borderRadius={16}
                        backgroundColor={background}
                        flex={1}
                        paddingX='35px'
                        paddingY='27px'
                        gridGap={6}
                    >

                        <Flex justifyContent='space-between'>
                            <Text
                                color={textcolor}
                                fontSize={largerScreen ? '20px' : '16px'}
                                lineHeight="29px"
                                fontWeight={600}
                            >
                                Volume
                            </Text>
                            <ButtonGroup variant='ghost' textColor={textcolor} fontSize='12px' spacing='-1'>
                                <Button fontSize='12px' textDecoration='underline'>1W</Button>
                                <Button fontSize='12px' textDecoration='underline' >1M</Button>
                                <Button fontSize='12px' textDecoration='underline'>ALL</Button>
                            </ButtonGroup>

                        </Flex>
                        <Skeleton height='300px' minWidth='20px' />
                    </Flex>
                                        
                </Flex>
               </div> 

               <div className='section-container'>
                    <Box
                     backgroundColor={background}
                     fontSize='14px'
                     borderRadius={16}
                     
                     paddingY={35}
                     paddingX={25}
                     >
                 <Flex justifyContent='space-between' wrap='wrap'>
                            <Text
                                color={textcolor}
                                fontSize={largerScreen ? '20px' : '16px'}
                                lineHeight="29px"
                                fontWeight={600}
                            >
                                Transactions
                            </Text>
                            <ButtonGroup variant='ghost' textColor={textcolor}  spacing='-1'>
                                <Button fontSize='12px' textDecoration='underline'>Mint</Button>
                                <Button fontSize='12px' textDecoration='underline' >Burn</Button>
                                <Button fontSize='12px' textDecoration='underline'>Deposit</Button>
                                <Button fontSize='12px' textDecoration='underline'>Withdraw</Button>
                            </ButtonGroup>

                </Flex>
                <TableContainer
                   textAlign='center'
                >
                    <Table variant='simple'>
                        <Thead>
                            <Tr>
                                <Th  textAlign='left'>Minted</Th>
                                <Th >Target</Th>
                                <Th >Oven</Th>
                                <Th >Account</Th>
                                <Th isNumeric>Time</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            <Tr>
                                <Td  textAlign='left'>100ctez</Td>
                                <Td >1.05</Td>
                                <Td >KTae...45</Td>
                                <Td >T21xy...23</Td>
                                <Td isNumeric>2 hours ago</Td>
                            </Tr>
                            <Tr>
                                <Td  textAlign='left'>100ctez</Td>
                                <Td >1.05</Td>
                                <Td >KTae...45</Td>
                                <Td >T21xy...23</Td>
                                <Td isNumeric>2 hours ago</Td>
                            </Tr>
                            <Tr>
                                <Td  textAlign='left'>100ctez</Td>
                                <Td >1.05</Td>
                                <Td >KTae...45</Td>
                                <Td >T21xy...23</Td>
                                <Td isNumeric>2 hours ago</Td>
                            </Tr>
                            <Tr>
                                <Td  textAlign='left'>100ctez</Td>
                                <Td >1.05</Td>
                                <Td >KTae...45</Td>
                                <Td >T21xy...23</Td>
                                <Td isNumeric>2 hours ago</Td>
                            </Tr>
                            <Tr>
                                <Td  textAlign='left'>100ctez</Td>
                                <Td >1.05</Td>
                                <Td >KTae...45</Td>
                                <Td >T21xy...23</Td>
                                <Td isNumeric>2 hours ago</Td>
                            </Tr>
                            <Tr>
                                <Td  textAlign='left'>100ctez</Td>
                                <Td >1.05</Td>
                                <Td >KTae...45</Td>
                                <Td >T21xy...23</Td>
                                <Td isNumeric>2 hours ago</Td>
                            </Tr>
                            <Tr>
                                <Td  textAlign='left'>100ctez</Td>
                                <Td >1.05</Td>
                                <Td >KTae...45</Td>
                                <Td >T21xy...23</Td>
                                <Td isNumeric>2 hours ago</Td>
                            </Tr>
                            <Tr>
                                <Td  textAlign='left'>100ctez</Td>
                                <Td >1.05</Td>
                                <Td >KTae...45</Td>
                                <Td >T21xy...23</Td>
                                <Td isNumeric>2 hours ago</Td>
                            </Tr>
                        </Tbody>
                    </Table>
                </TableContainer>
                </Box>
            </div>
  
            
        </div>
    )
}
export default AnaluticsPage;
