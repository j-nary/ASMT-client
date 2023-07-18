// 가격 조정 RangeSlider
// 참고 : https://codesandbox.io/s/zl8nrlp9x?file=/src/index.tsx

import * as React from 'react';
import styled from "styled-components";
import { Slider, Rail, Handles, Tracks, Ticks } from 'react-compound-slider';

import {
  SliderItem,
  GetHandleProps,
  GetTrackProps
} from 'react-compound-slider';
import { number } from 'yargs';

const formatTicks = (d: number) => {

  return d < 20000 ? d : '20000+';
};

// Handle component
interface IHandleProps {
  domain: number[];
  handle: SliderItem;
  getHandleProps: GetHandleProps;
}

export const Handle: React.FC<IHandleProps> = ({
  domain: [min, max],
  handle: { id, value, percent },
  getHandleProps
}) => (
  <div
    role="slider"
    aria-valuemin={min}
    aria-valuemax={max}
    aria-valuenow={value}
    style={{
      left: `${percent}%`,
      position: 'absolute',
      marginLeft: '-11px',
      marginTop: '-6px',
      zIndex: 2,
      width: 24,
      height: 24,
      cursor: 'pointer',
      borderRadius: '50%',
      boxShadow: '1px 1px 1px 1px rgba(0, 0, 0, 0.2)',
      backgroundColor: '#34568E'
    }}
    {...getHandleProps(id)}
  />
);

// Track component
interface ITrackProps {
  source: SliderItem;
  target: SliderItem;
  getTrackProps: GetTrackProps;
}

export const Track: React.FC<ITrackProps> = ({
  source,
  target,
  getTrackProps
}) => (
  <div
    style={{
      position: 'absolute',
      height: 14,
      zIndex: 1,
      backgroundColor: '#7aa0c4',
      borderRadius: 7,
      cursor: 'pointer',
      left: `${source.percent}%`,
      width: `${target.percent - source.percent}%`
    }}
    {...getTrackProps()}
  />
);

// Tick Component
interface ITickProps {
  key: string;
  tick: SliderItem;
  count: number;
  format: Function;
}

export const Tick: React.FC<ITickProps> = ({ tick, count, format }) => (
  <div>
    <div
      style={{
        position: 'absolute',
        marginTop: 14,
        width: 1,
        height: 5,
        backgroundColor: 'rgb(200,200,200)',
        left: `${tick.percent}%`
      }}
    />
    <div
      style={{
        position: 'absolute',
        marginTop: 22,
        fontSize: 10,
        textAlign: 'center',
        marginLeft: `${-(100 / count) / 2}%`,
        width: `${100 / count}%`,
        left: `${tick.percent}%`
      }}
    >

      {format(tick.value)}
    </div>
  </div>
);

// RangeSlider 기초 세팅
const sliderStyle: React.CSSProperties = {
  margin: '5%',
  position: 'relative',
  width: '90%'
};

const railStyle: React.CSSProperties = {
  position: 'absolute',
  width: '100%',
  height: 14,
  borderRadius: 7,
  cursor: 'pointer',
  backgroundColor: '#D7DADA'
};

const domain: number[] = [0, 20000]; // RangeSlider 최소, 최대 범위

interface RangeSliderProps {
  onChangeValues: (values: readonly number[]) => void;
  minPrice: number;
  maxPrice: number;
}
// RangeSlider 클래스
export class RangeSlider extends React.Component<RangeSliderProps> {
  public state = {
    values: [this.props.minPrice, this.props.maxPrice]
  };
  public componentDidUpdate(prevProps: RangeSliderProps) {
    if (
      prevProps.minPrice !== this.props.minPrice ||
      prevProps.maxPrice !== this.props.maxPrice
    ) {
      this.setState({
        values: [this.props.minPrice, this.props.maxPrice]
      });
    }
  }
  public onChange = (values: readonly number[]) => {
    this.setState({ values });
    this.props.onChangeValues(values);
  };

  public render() {
    const {
      state: { values }
    } = this;

    return (
      <div style={{ height: 120, width: '100%' }}>
        <Slider
          mode={1}
          step={1000}
          domain={domain}
          rootStyle={sliderStyle}
          onChange={this.onChange}
          values={values}
        >
          <Rail>
            {({ getRailProps }) => (
              <div style={railStyle} {...getRailProps()} />
            )}
          </Rail>
          <Handles>
            {({ handles, getHandleProps }) => (
              <div className="slider-handles">
                {handles.map(handle => (
                  <Handle
                    key={handle.id}
                    handle={handle}
                    domain={domain}
                    getHandleProps={getHandleProps}
                  />
                ))}
              </div>
            )}
          </Handles>
          <Tracks left={false} right={false}>
            {({ tracks, getTrackProps }) => (
              <div className="slider-tracks">
                {tracks.map(({ id, source, target }) => (
                  <Track
                    key={id}
                    source={source}
                    target={target}
                    getTrackProps={getTrackProps}
                  />
                ))}
              </div>
            )}
          </Tracks>
          <Ticks values={[0, 5000, 10000, 15000, 20000]}>
            {({ ticks }) => (
              <div className="slider-ticks">
                {ticks.map(tick => (
                  <Tick
                    key={tick.id}
                    tick={tick}
                    count={ticks.length}
                    format={formatTicks}
                  />
                ))}
              </div>
            )}
          </Ticks>
        </Slider>
      </div>
    );
  }
}

export default RangeSlider;