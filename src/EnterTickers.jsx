import React, { useState } from 'react';

const EnterTickers = ({ onTickerArrayChange }) => {
  const [inputValues, setInputValues] = useState(['', '', '', '']);
  const [userTickerArray, setUserTickerArray] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleInputChange = (e, index) => {
    const inputValue = e.target.value.toUpperCase();
    const regex = /^[a-zA-Z]*$/;

    if (regex.test(inputValue)) {
      setInputValues((prevValues) => {
        const newValues = [...prevValues];
        newValues[index] = inputValue;
        return newValues;
      });
    } else {
      e.target.value = '';
      alert('Please enter only alphabetic characters.');
    }
  };

  const handleSubmit = () => {
    const tickerArray = inputValues.filter((value) => value !== '').join(',');
    setUserTickerArray(tickerArray);
    onTickerArrayChange(tickerArray); 
    setInputValues(['', '', '', '']);
    setShowModal(false);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  return (
    <div style={{ position: 'relative' }}>
      {showModal ? (
        <div style={{
          position: 'absolute',
          top: '-4.0vmin',
          left: '-12.0vmin',
          width: '24.0vmin',
          height: '9.0vmin',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <div style={{ // Containing DIV (salmon)
            backgroundColor: '#f7bcad',
            padding: '3px',
            borderRadius: '4px',
            border: '1px solid #ddd',
            width: '24.0vmin', 
            height: '9.0vmin', 
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
            <div style={{ // Overall field Containing DIV (Red)
              backgroundColor: '#e61515',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              width: '70%',
              height: '100%',
            }}>
              <div style={{ // Top 2 fields (blue)
                backgroundColor: '#1c0ee3',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
                marginBottom: '20px',
              }}>
                {inputValues.slice(0, 2).map((value, index) => (
                  <input
                    key={index}
                    type="text"
                    value={value}
                    onChange={(e) => handleInputChange(e, index)}
                    style={{
                      width: '100%',
                      height: '30%',
                      fontSize: '12px',
                      padding: '5px',
                      margin: '5px',
                    }}
                  />
                ))}
              </div>
              <div style={{ // Bottom 2 fields (yellow)
                backgroundColor: '#eded11',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
              }}>
                {inputValues.slice(2, 4).map((value, index) => (
                  <input
                    key={index + 2}
                    type="text"
                    value={value}
                    onChange={(e) => handleInputChange(e, index + 2)}
                    style={{
                      width: '100%',
                      height: '30%',
                      fontSize: '12px',
                      padding: '5px',
                      margin: '5px',
                    }}
                  />
                ))}
              </div>
            </div>
            <div style={{ //Right side div (Purple)
              backgroundColor: '#b303ff',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              width: '30%',
              height: '100%',
              paddingLeft: '5px',
            }}>
              <button onClick={handleSubmit} style={{
                height: '80%',
                width: '60%',
                fontSize: '14.5px',
                textAlign: 'center',
              }}>
                <span style={{ display: 'block', fontSize: '8px' }}>S</span>
                <span style={{ display: 'block', fontSize: '8px' }}>U</span>
                <span style={{ display: 'block', fontSize: '8px' }}>B</span>
                <span style={{ display: 'block', fontSize: '8px' }}>M</span>
                <span style={{ display: 'block', fontSize: '8px' }}>I</span>
                <span style={{ display: 'block', fontSize: '8px' }}>T</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button className="ticker-button" onClick={handleShowModal}>Enter Tickers</button>
      )}
    </div>
  );
};

export default EnterTickers;