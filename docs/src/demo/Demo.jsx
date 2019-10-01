// @flow

import React from 'react';

import {Box} from 'dcme-style/layout';
import {Flex} from 'dcme-style/layout';

import {Card} from 'dcme-style/affordance';
import {DividerVertical} from 'dcme-style/affordance';
import {Link} from 'dcme-style/affordance';
import {Input} from 'dcme-style/affordance';
import {Select} from 'dcme-style/affordance';
import {Text} from 'dcme-style/affordance';
import {Unselectable} from 'dcme-style/affordance';
import {H1} from 'dcme-style';

import ParcelBoundary from 'react-dataparcels/ParcelBoundary';
import {numberToString} from 'demo/ParcelUpdaters';

import SimulationLogic from 'simulation/SimulationLogic';
import NumberSlider from 'component/NumberSlider';
import NumberSliderExponential from 'component/NumberSliderExponential';
import Graph from 'demo/Graph';
import DemoContent from 'demo/DemoContent.mdx';

const ZOOM_OPTIONS = [
    {value: "1", label: "1x"},
    {value: "2", label: "2x"},
    {value: "4", label: "4x"},
    {value: "8", label: "8x"},
    {value: "16", label: "16x"},
    {value: "32", label: "32x"},
    {value: "64", label: "64x"}
];

type Props = {
    simulation: Simulation,
    stateParcel: Parcel,
    resultParcel: Parcel
};

export default () => <SimulationLogic>
    {(props: Props) => {
        return <Card textStyle="monospace">
            <Box px={[3,3,4]}>
                <Flex py={4} alignItems="end">
                    <Box mr={3}>
                        <H1>ResponsiveAnalogRead</H1>
                    </Box>
                    <Box mr={3}>
                        <Text textStyle="code">v2.0.0</Text>
                    </Box>
                </Flex>
                <Box pb={4}>
                    <Text>An Arduino library for smoothing out noise. <a href="https://github.com/dxinteractive/ResponsiveAnalogRead"><Link>github</Link></a></Text>
                </Box>
                <Unselectable>
                    <Flex height="25rem">
                        <SimulationGraph width={.6} mx={3} {...props} />
                        <DividerVertical />
                        <SimulationControls mx={3} {...props} />
                        <DividerVertical />
                        <ConfigurationControls mx={3} {...props} />
                    </Flex>
                </Unselectable>
                <Box mt={5}>
                    <Card textStyle="copy">
                        <DemoContent />
                    </Card>
                </Box>
            </Box>
        </Card>;
    }}
</SimulationLogic>;

const SimulationGraph = (props: Props) => {
    let {stateParcel, simulation, ...rest} = props;
    return <Flex flexDirection="column" {...rest}>
        <Flex pb={3} alignItems="center">
            <Box flexGrow="1">
            </Box>
            <Box mr={3}>
                <Text>zoom</Text>
            </Box>
            <ParcelBoundary parcel={stateParcel.get('zoom').pipe(numberToString())}>
                {zoom => <Box mr={3} width="6rem">
                    <Select
                        {...zoom.spread()}
                        options={ZOOM_OPTIONS}
                        clearable={false}
                    />
                </Box>}
            </ParcelBoundary>
            <ParcelBoundary parcel={stateParcel.get('min').pipe(numberToString())}>
                {min => <>
                    <Box mr={3}>
                        <Text>min</Text>
                    </Box>
                    <Box mr={3} width="6rem">
                        <Input {...min.spread()} type="number" />
                    </Box>
                </>}
            </ParcelBoundary>
            <ParcelBoundary parcel={stateParcel.get('max').pipe(numberToString())}>
                {max => <>
                    <Box mr={3}>
                        <Text>max</Text>
                    </Box>
                    <Box mr={3} width="6rem">
                        <Input {...max.spread()} type="number" />
                    </Box>
                </>}
            </ParcelBoundary>
        </Flex>
        <Flex flexGrow="1">
            <Graph
                simulation={simulation}
                stateParcel={stateParcel}
            />
        </Flex>
        <Box mt={3}>
            <Text><Text color="tertiary">■</Text>{'\u00A0'}raw <Text color="primary">■</Text>{'\u00A0'}output</Text>
        </Box>
    </Flex>;
};

const SimulationControls = (props: Props) => {
    let {stateParcel, resultParcel, ...rest} = props;
    let {min, max} = stateParcel.value;
    return <Flex flexDirection="column" alignItems="center" {...rest}>
        <Box mb={3}>
            <Text>Simulation</Text>
        </Box>
        <Flex flexGrow="1">
            <Flex>
                <NumberSlider
                    label="input"
                    parcel={stateParcel.get('input')}
                    min={min}
                    max={max}
                />
            </Flex>
            <Flex>
                <NumberSliderExponential
                    label="noise"
                    parcel={stateParcel.get('noise')}
                    min={min}
                    max={max}
                />
            </Flex>
            <Flex>
                <NumberSlider
                    label="raw"
                    parcel={resultParcel.get('raw')}
                    disabled
                    min={min}
                    max={max}
                />
            </Flex>
            <Flex>
                <NumberSlider
                    label="output"
                    parcel={resultParcel.get('output')}
                    disabled
                    min={min}
                    max={max}
                />
            </Flex>
        </Flex>
    </Flex>;
};

const ConfigurationControls = (props: Props) => {
    let {stateParcel, ...rest} = props;
    let {min, max, smoothEnabled, glideEnabled, settleEnabled} = stateParcel.value;
    return <Flex flexDirection="column" alignItems="center" {...rest}>
        <Box mb={3}>
            <Text>Configuration</Text>
        </Box>
        <Flex flexGrow="1">
            <Flex>
                <NumberSliderExponential
                    label="noise floor"
                    parcel={stateParcel.get('noisefloor')}
                    min={min}
                    max={max}
                />
            </Flex>
            <Flex>
                <NumberSliderExponential
                    label="smooth"
                    parcel={stateParcel.get('smooth')}
                    toggleParcel={stateParcel.get('smoothEnabled')}
                    disabled={!smoothEnabled}
                    min={0}
                    max={50}
                />
            </Flex>
            <Flex>
                <NumberSliderExponential
                    label="glide"
                    parcel={stateParcel.get('glide')}
                    toggleParcel={stateParcel.get('glideEnabled')}
                    disabled={!glideEnabled}
                    min={0}
                    max={50}
                />
            </Flex>
            <Flex>
                <NumberSliderExponential
                    label="settle"
                    parcel={stateParcel.get('settle')}
                    toggleParcel={stateParcel.get('settleEnabled')}
                    disabled={!settleEnabled}
                    min={0}
                    max={50}
                    step={1}
                />
            </Flex>
            <Flex>
                <NumberSlider
                    label="settle time"
                    parcel={stateParcel.get('settleTime')}
                    disabled={!settleEnabled}
                    min={0}
                    max={10}
                    step={1}
                />
            </Flex>
        </Flex>
    </Flex>;
};
