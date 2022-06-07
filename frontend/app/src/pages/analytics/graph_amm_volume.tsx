import { Button, ButtonGroup, Flex, Skeleton, SkeletonText, Text, useMediaQuery } from "@chakra-ui/react";
import React, { useState } from "react";
import { useCtezGraphAMMVolume, useCtezGraphAMMVolumeAll } from "../../api/analytics";
import { TextWithCircleColor } from "../../components/analytics/TTextWithColorCircle";
import BarChartAlt from "../../components/graph/bar-graph";
import { useThemeColors } from "../../hooks/utilHooks";
import { numberToMillionOrBillionFormate } from "../../utils/numberFormate";

const color = '#0F62FF';
const color2 = '#38CB89';
const GraphAMMVolume: React.FC = () => {
    const [textcolor] = useThemeColors(['homeTxt']);
    const [textHighlight] = useThemeColors(['sideBarBg']);
    const [largerScreen] = useMediaQuery(['(min-width: 900px)']);
    const [background, imported, text4] = useThemeColors([
        'cardbg',
        'imported',
        'text4',
    ]);
    const { data: data1m = false } = useCtezGraphAMMVolume();
    const { data: dataAll = false } = useCtezGraphAMMVolumeAll();

    const [value, setValue] = useState<number | undefined>();
    const [activeTab, setActiveTab] = useState('1m');
    // graph options

    return (<Flex direction='column'
        borderRadius={16}
        backgroundColor={background}
        flex={1}
        paddingX='35px'
        paddingY='27px'
        gridGap={4}
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
            <ButtonGroup variant='ghost' gridGap={2} textColor={textcolor} fontSize='12px' spacing='-1'>
                <Button fontSize='12px' className={activeTab === '1m' ? "btnactive" : ''} textDecoration='underline' onClick={() => setActiveTab('1m')} >1M</Button>
                <Button fontSize='12px' className={activeTab === 'all' ? "btnactive" : ''} textDecoration='underline' onClick={() => setActiveTab('all')}>ALL</Button>
            </ButtonGroup>

        </Flex>
        {activeTab === '1m' ? data1m ? <BarChartAlt
            data={data1m} setValue={setValue}
        /> : <Skeleton height='300px' minWidth='20px' /> :
            dataAll ? <BarChartAlt
                data={dataAll} isShowMonth setValue={setValue}
            /> : <Skeleton height='300px' minWidth='20px' />
        }
    </Flex>)
}
export default GraphAMMVolume;
