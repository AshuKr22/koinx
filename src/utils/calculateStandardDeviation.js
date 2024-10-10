export const calculateStandardDeviation = (prices) => {
    const n = prices.length;
    if (n === 0) return 0;
  
    const mean = prices.reduce((sum, price) => sum + price, 0) / n;
    const squaredDifferences = prices.map(price => Math.pow(price - mean, 2));
    const variance = squaredDifferences.reduce((sum, sqDiff) => sum + sqDiff, 0) / n;
    
    return Math.sqrt(variance);
  };