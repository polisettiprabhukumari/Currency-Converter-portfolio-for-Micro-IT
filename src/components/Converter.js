import React, { useState } from 'react';
import axios from 'axios';

const Converter = () => {
  const [from, setFrom] = useState('USD');
  const [to, setTo] = useState('INR');
  const [amount, setAmount] = useState(1);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const convert = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.get(`http://localhost:5000/api/convert?from=${from}&to=${to}&amount=${amount}`);
      setResult(res.data.result.toFixed(2));
    } catch (err) {
      setError('Conversion failed. Please try again.');
      setResult(null);
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 300, margin: 'auto' }}>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        style={{ width: '100%', padding: '8px', marginBottom: '8px' }}
      />
      <select value={from} onChange={(e) => setFrom(e.target.value)} style={{ width: '48%', marginRight: '4%' }}>
        <option>USD</option><option>INR</option><option>EUR</option>
      </select>
      <select value={to} onChange={(e) => setTo(e.target.value)} style={{ width: '48%' }}>
        <option>USD</option><option>INR</option><option>EUR</option>
      </select>
      <button onClick={convert} style={{ width: '100%', padding: '10px', marginTop: '12px' }}>
        {loading ? 'Converting...' : 'Convert'}
      </button>

      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}

      {result !== null && !loading && (
        <h3 style={{ marginTop: '15px', color: 'green' }}>
          {amount} {from} = {result} {to}
        </h3>
      )}
    </div>
  );
};

export default Converter;
