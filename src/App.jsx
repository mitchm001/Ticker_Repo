import React, { useState, useEffect } from 'react'
import { TimestampTemplate, EnterTickersModal, TickerBox, TwoTickerBox, ThreeTickerBox, FourTickerBox } from './TickerTemplates.jsx';
import ReactApexChart from 'react-apexcharts';
import Chart from 'react-apexcharts'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

// TWELVEDATA TIMESERIES API URL https://api.twelvedata.com/time_series?symbol=AAPL&interval=1min&apikey=your_api_key
// TWELVEDATA VARIABLES
const timeSeriesInterval = '1min';
const TDKEY = import.meta.env.VITE_TDKEY;

// API CALL FOR OPENING PRICE.  USED FOR GREEN VS RED CHARTING.
async function getOpenPrice(ticker) {
  let TDURLOPEN = 'https://api.twelvedata.com/time_series?symbol=' + ticker + '&interval=1day' + '&apikey=' + TDKEY;
  const response = await fetch(TDURLOPEN);
  const openData = await response.json();
  return openData;
};

// API CALL FOR STOCK DATA
async function getStock(ticker) {
  let TDURL = 'https://api.twelvedata.com/time_series?symbol=' + ticker + '&interval=' + timeSeriesInterval + '&apikey=' + TDKEY;
  const response = await fetch(TDURL);
  const data = await response.json();
  return data;
};


// FUNCTIONALITY AND DISPLAY
function App() {
  const [arrayTickers, setArrayTickers] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [currentTickerIndex, setCurrentTickerIndex] = useState(0);
  const [tickerIntervalId, setTickerIntervalId] = useState(null);

  // CHART DISPLAY SETTINGS
  const [chartOptions, setChartOptions] = useState({
    chart: {
      type: 'area',
      height: 350,
      toolbar: false,
      background: '#000068',
    },
    title: {
      text: '',
      align: 'left'
    },
    xaxis: {
      type: 'category',
      categories: [],
      tickAmount: undefined,
      tickPlacement: 'between',
      min: undefined,
      max: undefined,
      stepSize: undefined,
      range: undefined,
      floating: false,
      decimalsInFloat: undefined,
      overwriteCategories: undefined,
      position: 'bottom',
      labels: {
        show: true,
        rotate: -45,
        rotateAlways: false,
        hideOverlappingLabels: true,
        showDuplicates: false,
        trim: false,
        minHeight: undefined,
        maxHeight: 120,
        style: {
          colors: [],
          fontSize: '12px',
          fontFamily: 'Helvetica, Arial, sans-serif',
          fontWeight: 400,
          cssClass: 'apexcharts-xaxis-label',
        },
        formatter: (value) => {
          const date = new Date(parseInt(value));
          return date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
          });
          return time + ' EST';
        },
      },
      group: {
        groups: [],
        style: {
          colors: [],
          fontSize: '12px',
          fontWeight: 400,
          fontFamily: undefined,
          cssClass: ''
        }
      },
      axisBorder: {
        show: true,
        color: '#78909C',
        height: 1,
        width: '100%',
        offsetX: 0,
        offsetY: 0
      },
      axisTicks: {
        show: true,
        borderType: 'solid',
        color: '#78909C',
        height: 6,
        offsetX: 0,
        offsetY: 0
      },
    },
    yaxis: {
      labels: {
        formatter: (value) => {
          return `$${value.toFixed(2)}`;
        }
      },
      tickAmount: 6,
    },
    plotOptions: {
      area: {
        fillTo: 'origin',
        dataLabels: {
          enabled: false
        }
      }
    },
  });

  const getStockPrice = async (tickers) => {
    console.log('getStockPrice called with tickers:', tickers);
    const promises = tickers.map(async (ticker) => {
      try {
        const data = await getStock(ticker);
        console.log(`Received stock data for ${ticker}:`, data); // Log received stock data.  This will also log API error if we reach limit.
        if (data && data.values) {
          const fullStockData = data.values;
          //console.log(`Full stock data for ${ticker}:`, fullStockData); // Log full stock data
          if (fullStockData.length > 0) {
            const stockData = fullStockData[0];
            //console.log(`Latest stock data for ${ticker}:`, stockData); // Log latest stock data
            const displayTime = stockData.datetime.toString();
            const price = Number(stockData.close).toFixed(2);
            //console.log(`Current price for ${ticker}:`, price); // Log current price
            const priceTime = `${new Date(displayTime).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })} EST`;
            console.log(`Current price time for ${ticker}:`, priceTime); // Log current price time
            const prices = fullStockData.map((quote, index) => ({
              x: new Date(quote.datetime).getTime(),
              y: [parseFloat(quote.open), parseFloat(quote.high), parseFloat(quote.low), parseFloat(quote.close)].map((value) => Number(value).toFixed(2))
            }));
            const openPriceData = await getOpenPrice(ticker);
            const openPrice = openPriceData.values[0].open;
            return { ticker, price, priceTime, prices, openPrice };
          } else {
            console.log(`No stock data available for ${ticker} : `);
            return { ticker, price: null, priceTime: null, prices: null, openPrice: null };
          }
        } else {
          console.log(`Failed to retrieve stock data for ${ticker} : `);
          return { ticker, price: null, priceTime: null, prices: null, openPrice: null };
        }
      } catch (error) {
        console.log("ERROR: " + error);
        return { ticker, price: null, priceTime: null, prices: null, openPrice: null };
      }
    });
  
    const results = await Promise.all(promises);
    setChartData(results);
  };
  
  const handleModalSubmit = (newTickers) => {
    const tickers = newTickers.split(',');
    setArrayTickers(tickers);
  };
  
  useEffect(() => {
    async function fetchData() {
      if (arrayTickers.length > 0) {
        await getStockPrice(arrayTickers);
      } else {
        setChartData([]);
      }
    }
    fetchData();
  }, [arrayTickers]);
  
  useEffect(() => {
    return () => {
      if (tickerIntervalId) {
        clearInterval(tickerIntervalId);
      }
    };
  }, [tickerIntervalId]);
  
  useEffect(() => {
    let intervalId;
    if (arrayTickers.length > 0) {
      intervalId = setInterval(async () => {
        await getStockPrice(arrayTickers);
      }, 20000); // 20 second interval
    }
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [arrayTickers]);
  
  return (
    <div style={{ display: 'flex' }}>
    <div style={{ flex: 1 }}>
      {arrayTickers.length === 1 && (
        <TickerBox chartData={chartData} />
      )}
      {arrayTickers.length === 2 && (
        <TwoTickerBox chartData={chartData} />
      )}
      {arrayTickers.length === 3 && (
        <ThreeTickerBox chartData={chartData} />
      )}
      {arrayTickers.length === 4 && (
        <FourTickerBox chartData={chartData} />
      )}
    </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div className="modal-container">
          <EnterTickersModal onTickerArrayChange={handleModalSubmit} chartOptions={chartOptions} />
        </div>
        <div className="timestamp-container">
          <TimestampTemplate />
        </div>
      </div>
    </div>
  );
}

export default App