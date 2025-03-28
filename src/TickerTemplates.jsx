import React, { useState } from 'react';
import Chart from 'react-apexcharts';
import EnterTickers from './EnterTickers';

const EnterTickersModal = ({ onTickerArrayChange }) => {
  return (
    <div style={{ marginBottom: '0.8vmin' }}>
      <EnterTickers className="ticker-button" onTickerArrayChange={onTickerArrayChange} />
    </div>
  );
};

const TimestampTemplate = () => {
  const currentTime = new Date();
  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
  const paddedHours = formattedHours.toString().padStart(2, '0');
  const timestamp = `${paddedHours}:${minutes.toString().padStart(2, '0')} ${ampm} EST`;
  
  const dayOfWeek = currentTime.toLocaleString('en-US', { weekday: 'long' });
  const formattedDate = currentTime.toLocaleString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' });
  
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: '100%', 
    }}>
      <div style={{ flexGrow: 1 }}></div>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        height: '100%', 
      }}>
        <div style={{ //TIMESTAMP
          backgroundColor: '#f0f0f0',
          padding: '16px', 
          borderRadius: '4px',
          border: '1px solid #ddd',
          fontSize: '20px', 
          fontWeight: 'bold',
          width: '25.0vmin', 
          minHeight: '29.5vmin', 
          textAlign: 'center', 
          flex: '0.85', 
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-end',
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
            <span style={{ fontSize: '10.5vmin', paddingLeft: '2.0vmin' }}>{paddedHours}:</span>
            <span style={{ fontSize: '10.5vmin', paddingLeft: '0px' }}>{minutes.toString().padStart(2, '0')}</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', marginLeft: '16px' }}>
            <span style={{ fontSize: '5.5vmin', paddingTop: '2.0vmin', paddingRight: '1.0vmin' }}>{ampm}</span>
            <span style={{ fontSize: '2.5vmin', paddingTop: '14.0vmin', paddingBottom: '4.0vmin' }}>EST</span>
          </div>
        </div>
        <div style={{ //DATE
          backgroundColor: '#f0f0f0',
          padding: '16px', 
          borderRadius: '4px',
          border: '1px solid #ddd',
          fontSize: '18px', 
          fontWeight: 'bold',
          width: '25.0vmin', 
          height: '7.5vmin', 
          textAlign: 'center', 
          marginTop: '1px', 
          flex: '0.15',
          paddingTop: '45px', 
        }}>
          {dayOfWeek}, {formattedDate}
        </div>
      </div>
    </div>
  );
};

//ONE TICKERBOX DISPLAY SETTINGS (no chart)
const TickerBox = ({ chartData }) => {   
    const { ticker, price, openPrice } = chartData?.[0] ?? {};

    if (!ticker || !price || !openPrice) {
        return <div>No chart data available</div>;
    }

    const currentPrice = parseFloat(price.replace('$', ''));
    const percentChange = ((currentPrice - openPrice) / openPrice) * 100;
    const percentChangeDisplay = `${percentChange.toFixed(2)}%`;
    const percentChangeColor = percentChange >= 0 ? '#00FF00' : '#FF0000';
    const arrowDirection = percentChange >= 0 ? '\u2191' : '\u2193';
    
    return (
        <div className="fade-in" style={{
            border: '0.5vmin solid #ccc',
            borderRadius: '2vmin',
            padding: '4vmin', 
            width: '11vmin',
            height: '5vmin',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start', 
            alignItems: 'flex-start', 
            backgroundColor: '#f7f7f7'
          }}>
            <h2 style={{
              fontWeight: 750, 
              fontSize: '2.75vmin', 
              marginTop: '-3.25vmin',
              marginLeft: '-2.5vmin'
            }}>{chartData[0].ticker}</h2>
            <p style={{
              fontSize: '2vmin', 
              marginTop: '-2.25vmin',
              marginLeft: '-2.5vmin',
              fontWeight: 650,
            }}>{chartData[0].price}</p>
            <div style={{
              marginTop: '-3.5vmin', 
              marginLeft: '-2.4vmin'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center'
              }}>
                <span style={{
                  fontSize: '1.75vmin',
                  fontWeight: 1000,
                  color: percentChangeColor,
                  paddingRight: '1vmin', //space between arrow and percentage
                }}>{arrowDirection}</span>
                <p style={{
                  fontWeight: 600, 
                  fontSize: '1.75vmin', 
                  color: percentChangeColor,
                  marginLeft: '0.25vmin'
                }}>{percentChangeDisplay}</p>
              </div>
            </div>
          </div>
    );
};

//TWO TICKER BOX DISPLAY
const TwoTickerBox = ({ chartData }) => {

    return (
      <div className="fade-in" style={{
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        gap: '2vmin' // Add a gap between the two ticker boxes
      }}>
        <TickerBox chartData={[chartData[0]]} />
        <TickerBox chartData={[chartData[1]]} />
      </div>
    );
};

const ThreeTickerBox = ({ chartData }) => {
  
    return (
        <div className="fade-in" style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
          alignItems: 'center'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            gap: '2vmin'
          }}>
            <TickerBox chartData={[chartData[0]]} />
            <TickerBox chartData={[chartData[1]]} />
          </div>
          <div style={{ height: '2vmin' }}></div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            gap: '2vmin'
          }}>
            <TickerBox chartData={[chartData[2]]} />
          </div>
        </div>
    );
};

const FourTickerBox = ({ chartData }) => {
  
    return (
      <div className="fade-in" style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          gap: '2vmin'
        }}>
          <TickerBox chartData={[chartData[0]]} />
          <TickerBox chartData={[chartData[1]]} />
        </div>
        <div style={{ height: '2vmin' }}></div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          gap: '2vmin'
        }}>
          <TickerBox chartData={[chartData[2]]} />
          <TickerBox chartData={[chartData[3]]} />
        </div>
      </div>
    );
};



export { EnterTickersModal, TimestampTemplate, TickerBox, TwoTickerBox, ThreeTickerBox, FourTickerBox };