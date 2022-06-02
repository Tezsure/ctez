import { Button, ButtonGroup, Flex, Skeleton, SkeletonCircle, Text, useMediaQuery } from "@chakra-ui/react";
import React, { useState } from "react";
import { useCtezGraphOvendata } from "../../api/analytics";
import LineChart from "../../components/graph/line-chart";
import PiChart from "../../components/graph/pi-chart";
import { useThemeColors } from "../../hooks/utilHooks";

const OvenPiChart: React.FC = () => {
    const [textcolor] = useThemeColors(['homeTxt']);
    const [textHighlight] = useThemeColors(['sideBarBg']);
    const [largerScreen] = useMediaQuery(['(min-width: 900px)']);
    const [background, imported, text4] = useThemeColors([
        'cardbg',
        'imported',
        'text4',
    ]);
    const { data:dataChart = false } = useCtezGraphOvendata();
    console.log('data',dataChart)
    // graph options
   return(<Flex direction='column'
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
   {dataChart?<PiChart
         data={dataChart}  
        />:<SkeletonCircle size='300' />}
   </Flex>
  
</Flex>)
}
export default OvenPiChart;