import { Box, Button, ButtonGroup, Center, Flex, Skeleton, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useMediaQuery } from '@chakra-ui/react';
import React from 'react';
import { useMainHeader } from '../../api/analytics';
import { useThemeColors } from '../../hooks/utilHooks';
import { numberToMillionOrBillionFormate } from '../../utils/numberFormate';
import './analytics.css';
import GraphAMMTVL from './graph_amm_tvl';
import GraphAMMVolume from './graph_amm_volume';
import GraphCtez from './graph_ctez';
import GraphDrift from './graph_drift';
import OvenPiChart from './graph_oven_pi';
import GraphTVL from './graph_tvl';
import OvenTable from './ovenTable';
import TransactionTableoven from './transactionsTable';
import TransactionTableAMM from './transactionsTableAmm';


const AnaluticsPage: React.FC = () => {
    const { data: headerData = false } = useMainHeader();
    const [textcolor] = useThemeColors(['homeTxt']);
    const [textHighlight] = useThemeColors(['sideBarBg']);
    const [largerScreen] = useMediaQuery(['(min-width: 900px)']);
    const [background, imported, text4] = useThemeColors([
        'cardbg',
        'imported',
        'text4',
    ]);
    const GradientText = (text: string | number, isDollor: boolean) => {
        return <b className='gradientcolortext'>
            {isDollor ? '$' : null}
            {text}
        </b>;
    }
    const GradienTSimmer = () => {
        return null;
    }
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
                    Ctez is managing <GradienTSimmer /> {headerData ? GradientText(numberToMillionOrBillionFormate(headerData.TVL), true) : <GradienTSimmer />} across {headerData ? GradientText(`${headerData.total_ovens} Ovens`, false) : <GradienTSimmer />}
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
                    <GraphDrift />
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
                <OvenTable />
            </div>

            <div className='section-container'>
                <Flex direction='row' wrap='wrap' gridGap='10' >
                    <GraphTVL />
                    <OvenPiChart />

                </Flex>
            </div>
            <div className='section-container'>
                <TransactionTableoven />
            </div>

            <div className='section-container'>
            <Text
                    fontSize={largerScreen ? '30px' : '20px'}
                    lineHeight="50px"
                    fontWeight={400}
                    className='gradientcolortext'
                    marginBottom='20px'
                >
                    AMM
                </Text>
                <Flex direction='row' wrap='wrap' gridGap='10' >
                    <GraphAMMTVL/>
                    <GraphAMMVolume/>
                </Flex>
            </div>

            <div className='section-container'>
            <TransactionTableAMM/>
            </div>


        </div>
    )
}
export default AnaluticsPage;
