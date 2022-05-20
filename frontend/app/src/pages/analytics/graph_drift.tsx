import { Button, ButtonGroup, Flex, Skeleton, Text, useMediaQuery } from "@chakra-ui/react";
import React from "react";
import { useDriftGraph} from "../../api/analytics";
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
    const { data = false } = useDriftGraph();
    console.log("ggg",data)
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
            <ButtonGroup variant='ghost' textColor={textcolor} fontSize='12px' spacing='-1'>
                <Button fontSize='12px' textDecoration='underline'>1W</Button>
                <Button fontSize='12px' textDecoration='underline' >1M</Button>
                <Button fontSize='12px' textDecoration='underline'>ALL</Button>
            </ButtonGroup>

        </Flex>

        {data ? <GraphOneLine labelArr={data.dateArr} data1={data.currentAnnualDriftArr} /> : <Skeleton height='200px' minWidth='20px' />}
        {/* graph goes here */}
    </Flex>)
}
export default GraphDrift;
