import { Button, ButtonGroup, Flex, Skeleton, Text, useMediaQuery } from "@chakra-ui/react";
import React, { useState } from "react";
import { useDriftGraph, useDriftGraphAll} from "../../api/analytics";
import LineChart from "../../components/graph/line-chart";
import GraphOneLine from "../../components/graph/OneLineGraph";
import { useThemeColors } from "../../hooks/utilHooks";

const GraphDrift: React.FC = () => {
    const [textcolor] = useThemeColors(['homeTxt']);
    const [textHighlight] = useThemeColors(['sideBarBg']);
    const [largerScreen] = useMediaQuery(['(min-width: 900px)']);
    const [background, imported, text4] = useThemeColors([
        'cardbg',
        'imported',
        'text4',
    ]);
    const { data:data1m = false } = useDriftGraph();
    const { data:dataAll = false } = useDriftGraphAll();
    const [value, setValue] = useState<number | undefined>();
    const [activeTab,setActiveTab]=useState('all');
    // graph options

    return (<Flex direction='column'
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
                Drift
            </Text>
            <ButtonGroup variant='ghost' gridGap={2} textColor={textcolor} fontSize='12px' spacing='-1'>
                <Button fontSize='12px' className={activeTab==='1m'?"btnactive":''} textDecoration='underline' onClick={()=>setActiveTab('1m')} >1M</Button>
                <Button fontSize='12px' className={activeTab==='all'?"btnactive":''}  textDecoration='underline' onClick={()=>setActiveTab('all')}>ALL</Button>
            </ButtonGroup>

        </Flex>
        {activeTab==='1m' ? data1m?<LineChart
         data={data1m}  setValue={setValue} 
        />:null:
        dataAll?<LineChart
         data={dataAll} isShowMonth setValue={setValue} 
        />:null
        }
    </Flex>)
}
export default GraphDrift;
