import { Button, ButtonGroup, Flex, Skeleton, SkeletonText, Text, useMediaQuery } from "@chakra-ui/react";
import { format } from 'date-fns/fp';
import React, { useMemo, useState } from "react";
import { useCtezGraphctez1m, useCtezGraphctezall } from "../../api/analytics";
import { TextWithCircleColor } from "../../components/analytics/TTextWithColorCircle";
import TwoLineChart from "../../components/graph/two-line-chart";
import { useThemeColors } from "../../hooks/utilHooks";
import { numberToMillionOrBillionFormate } from "../../utils/numberFormate";

const color = '#0F62FF';
const color2 = '#38CB89';
const GraphCtez: React.FC = () => {
    const [textcolor] = useThemeColors(['homeTxt']);
    const [textHighlight] = useThemeColors(['sideBarBg']);
    const [largerScreen] = useMediaQuery(['(min-width: 900px)']);
    const [background, imported, text4] = useThemeColors([
        'cardbg2',
        'imported',
        'text4',
    ]);
  const { data:mainDatatarget1m=false } = useCtezGraphctez1m();
  const { data:mainDatatargetall=false } = useCtezGraphctezall();

  const [value, setValue] = useState<number | undefined>();
  const [time, setTime] = useState<number | undefined>();
  const [activeTab,setActiveTab]=useState('1m');
    // graph options
    const dateFormat = useMemo(() => format('MMM d, yyyy'), []);

    return (<Flex direction='column'
        borderRadius={16}
        backgroundColor={background}
        flex={1}
        paddingX='35px'
        paddingY='27px'
        gridGap={1}
    >
   <Flex justifyContent='space-between'>
            <div>
            <Text
                color={textcolor}
                fontSize={largerScreen ? '14px' : '14px'}
                lineHeight="29px"
                fontWeight={400}
            >
                Ctez Price
            </Text>
            <Flex flexDirection='column'>
            <Text
            color={textcolor}
            fontSize={largerScreen ? '32px' : '18px'}
            lineHeight="29px"
            fontWeight={600}
            >
            {(mainDatatarget1m && !value && mainDatatarget1m[mainDatatarget1m.length-1].value )?`${numberToMillionOrBillionFormate(mainDatatarget1m[mainDatatarget1m.length-1].value,6)} tez`:value?`${numberToMillionOrBillionFormate(value,6)} tez`:<SkeletonText pr={6} noOfLines={1} spacing="1" />}
            </Text>
            {time ? <Text fontSize='12px' >{dateFormat(time )}</Text>:<Text fontSize='12px'  opacity={0}>Time</Text>}
            </Flex>
            </div>
            <Flex flexDirection='column' align='flex-end' gridGap={2}>
            <ButtonGroup variant='ghost' gridGap={2} textColor={textcolor} fontSize='12px' spacing='-1'>
                <Button fontSize='12px' className={activeTab==='1m'?"btnactive":''} textDecoration='underline' onClick={()=>setActiveTab('1m')} >1M</Button>
                <Button fontSize='12px' className={activeTab==='all'?"btnactive":''}  textDecoration='underline' onClick={()=>setActiveTab('all')}>ALL</Button>
            </ButtonGroup>
            <Flex gridGap={4} >
                <TextWithCircleColor color={color}  text="Price" />
                <TextWithCircleColor color={color2}  text="Target" />

            </Flex>
            </Flex>

        </Flex>
        
        
        {/* <GraphTwoLine labelArr={priceData.dateArr} data1={priceData.ctez_priceArr} data2={priceData.tez_priceArr}/>
        graph goes here */}
        {activeTab==='1m' ? mainDatatarget1m?<TwoLineChart
         data={mainDatatarget1m} isShowCursor setValue={setValue} setLabel={setTime}
        />:<Skeleton height='300px' minWidth='20px' />:
        mainDatatargetall?<TwoLineChart
         data={mainDatatargetall} isShowCursor isShowMonth setValue={setValue} setLabel={setTime}
        />:<Skeleton height='300px' minWidth='20px' />
        }
    </Flex>)
}
export default GraphCtez;
