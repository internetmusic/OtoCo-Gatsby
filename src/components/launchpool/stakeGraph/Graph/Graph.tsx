import React, { useEffect, useState } from 'react'
import accounting from 'accounting'

//plugins
import { VictoryArea, VictoryGroup, VictoryLine, VictoryLabel } from 'victory'

//components
import PulsePoint from '../../../../../public/img/PulsePoint.inline.svg'

//style
import './Graph.scss'

type Props = {
  currentIdx: number
  currentPrice: number
  specs: { x: number; y: number }[]
}

const Graph = ({ currentIdx, currentPrice, specs }: Props) => {
  const [pathTransform, setPathTransform] = useState('')
  const [textTransform, setTextTransform] = useState('')
  const [priceLableDy, setPriceLableDy] = useState(0)
  const [priceLableDx, setPriceLableDx] = useState(0)

  const lineCapWidth = specs[10].y

  //set these states to piviot the svg background of the price tag

  useEffect(() => {
    if (currentIdx < 24) {
      setPathTransform('scale(-1, 1) translate(-160, 1)')
      setTextTransform('translate(7, -14)')
      setPriceLableDy(-90)
      setPriceLableDx(10)
    } else if (currentIdx > 85) {
      setPathTransform('scale(1, -1) translate(1, -100)')
      setTextTransform('translate(-80, -6)')
      setPriceLableDy(15)
      setPriceLableDx(-80)
    } else {
      setPathTransform('')
      setTextTransform('translate(-47, -14)')
      setPriceLableDy(-60)
      setPriceLableDx(-46)
    }
  }, [currentIdx])

  return (
    <div className="graph">
      <svg style={{ height: 0 }}>
        <defs>
          <linearGradient
            id="graph-gradient"
            gradientTransform="rotate(90)"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="55%" stopColor="rgba(217,14,246, 0.1)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0)" />
          </linearGradient>
        </defs>
      </svg>
      <svg style={{ height: 0 }}>
        <defs>
          <linearGradient
            id="current-line-gradient"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="50%" stopColor="#B441D1" />
            <stop offset="100%" stopColor="#6369F9" />
          </linearGradient>
        </defs>
      </svg>
      <VictoryGroup padding={{ left: 0, right: 0, top: 0, bottom: 0 }}>
        <VictoryArea
          // interpolation="natural"

          style={{ data: { fill: 'url(#graph-gradient)' } }}
          data={specs}
        />

        <VictoryArea
          //interpolation="natural"

          style={{ data: { fill: '#31188F' } }}
          data={specs.map((stake) => ({
            x: stake.x,
            y: stake.y,
            y0: stake.y - lineCapWidth,
          }))}
        />

        <VictoryLine
          //interpolation="natural"
          domain={{ x: [0, specs[99].x], y: [0, specs[99].y] }}
          style={{
            data: {
              stroke: 'url(#current-line-gradient)',
              strokeWidth: 8,
              strokeLinecap: 'round',
            },
            parent: { border: '1px solid #ccc' },
          }}
          data={specs.slice(0, currentIdx + 1)}
        />

        <VictoryLabel
          textAnchor="start"
          transform={textTransform}
          text={[
            `Next Price:`,
            `US$ ${accounting.formatMoney(currentPrice, { symbol: '' })}`,
          ]}
          lineHeight={[2.3, 1]}
          className={'current-token-label'}
          backgroundComponent={
            <svg width="125" height="71" viewBox="0 0 162 97" fill="none">
              <g>
                <path
                  transform={pathTransform}
                  d="M6 10C6 5.58172 9.58172 2 14 2H148C152.418 2 156 5.58172 156 10V87H14C9.58172 87 6 83.4183 6 79V10Z"
                  fill="url(#paint0_linear)"
                />
              </g>
              <defs>
                <linearGradient
                  id="paint0_linear"
                  x1="31.9091"
                  y1="2"
                  x2="51.8769"
                  y2="91.1377"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#6369F9" />
                  <stop offset="1" stop-color="#B441D1" />
                </linearGradient>
              </defs>
            </svg>
          }
          backgroundStyle={{ fill: 'null' }}
          style={[
            {
              fill: 'white',
              display: 'flex',
            },
            {
              fill: 'white',
              display: 'flex',
            },
          ]}
          backgroundPadding={25}
          datum={specs[currentIdx]}
          dy={priceLableDy}
          dx={priceLableDx}
        />

        <VictoryLabel
          className={''}
          text={''}
          backgroundComponent={<PulsePoint />}
          backgroundStyle={{ fill: 'null' }}
          backgroundPadding={50}
          dy={-45.5}
          dx={3}
          datum={specs[currentIdx]}
        />
      </VictoryGroup>
    </div>
  )
}

export default Graph
