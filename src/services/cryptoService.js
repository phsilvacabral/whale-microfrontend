// Serviço para buscar dados das criptomoedas da API real
export const fetchCryptoData = async () => {
  try {
    // Usar a API real do BFF que conecta com a Azure Function
    const response = await fetch('http://localhost:3000/api/crypto/top');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    
    if (!result.success || !result.data) {
      throw new Error('Resposta inválida da API');
    }
    
    return result.data;
  } catch (error) {
    console.error('Erro ao buscar dados das criptomoedas:', error);
    
    // Fallback para dados simulados em caso de erro
    console.log('Usando dados simulados como fallback...');
    return getMockData();
  }
};

// Função auxiliar com dados simulados para fallback
const getMockData = () => {
  const mockData = [
    {
      id: 'bitcoin',
      name: 'Bitcoin',
      symbol: 'btc',
      image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png',
      current_price: 43250.50,
      market_cap: 847500000000,
      market_cap_rank: 1,
      total_volume: 28500000000,
      price_change_percentage_24h: 2.45
    },
    {
      id: 'ethereum',
      name: 'Ethereum',
      symbol: 'eth',
      image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png',
      current_price: 2650.30,
      market_cap: 318500000000,
      market_cap_rank: 2,
      total_volume: 15200000000,
      price_change_percentage_24h: -1.23
    },
    {
      id: 'tether',
      name: 'Tether',
      symbol: 'usdt',
      image: 'https://assets.coingecko.com/coins/images/325/large/Tether.png',
      current_price: 1.00,
      market_cap: 95000000000,
      market_cap_rank: 3,
      total_volume: 45000000000,
      price_change_percentage_24h: 0.01
    },
    {
      id: 'binancecoin',
      name: 'BNB',
      symbol: 'bnb',
      image: 'https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png',
      current_price: 315.80,
      market_cap: 47500000000,
      market_cap_rank: 4,
      total_volume: 1200000000,
      price_change_percentage_24h: 1.87
    },
    {
      id: 'solana',
      name: 'Solana',
      symbol: 'sol',
      image: 'https://assets.coingecko.com/coins/images/4128/large/solana.png',
      current_price: 98.45,
      market_cap: 42500000000,
      market_cap_rank: 5,
      total_volume: 2800000000,
      price_change_percentage_24h: 3.21
    },
    {
      id: 'xrp',
      name: 'XRP',
      symbol: 'xrp',
      image: 'https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png',
      current_price: 0.62,
      market_cap: 33500000000,
      market_cap_rank: 6,
      total_volume: 1800000000,
      price_change_percentage_24h: -0.45
    },
    {
      id: 'usd-coin',
      name: 'USD Coin',
      symbol: 'usdc',
      image: 'https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png',
      current_price: 1.00,
      market_cap: 28500000000,
      market_cap_rank: 7,
      total_volume: 5200000000,
      price_change_percentage_24h: 0.00
    },
    {
      id: 'cardano',
      name: 'Cardano',
      symbol: 'ada',
      image: 'https://assets.coingecko.com/coins/images/975/large/cardano.png',
      current_price: 0.48,
      market_cap: 16800000000,
      market_cap_rank: 8,
      total_volume: 450000000,
      price_change_percentage_24h: 1.23
    },
    {
      id: 'avalanche-2',
      name: 'Avalanche',
      symbol: 'avax',
      image: 'https://assets.coingecko.com/coins/images/12559/large/Avalanche_Circle_RedWhite_Trans.png',
      current_price: 36.80,
      market_cap: 13800000000,
      market_cap_rank: 9,
      total_volume: 380000000,
      price_change_percentage_24h: 2.15
    },
    {
      id: 'dogecoin',
      name: 'Dogecoin',
      symbol: 'doge',
      image: 'https://assets.coingecko.com/coins/images/5/large/dogecoin.png',
      current_price: 0.08,
      market_cap: 11500000000,
      market_cap_rank: 10,
      total_volume: 520000000,
      price_change_percentage_24h: -2.34
    },
    {
      id: 'chainlink',
      name: 'Chainlink',
      symbol: 'link',
      image: 'https://assets.coingecko.com/coins/images/877/large/chainlink-new-logo.png',
      current_price: 14.25,
      market_cap: 8200000000,
      market_cap_rank: 11,
      total_volume: 280000000,
      price_change_percentage_24h: 0.87
    },
    {
      id: 'polygon',
      name: 'Polygon',
      symbol: 'matic',
      image: 'https://assets.coingecko.com/coins/images/4713/large/matic-token-icon.png',
      current_price: 0.85,
      market_cap: 7800000000,
      market_cap_rank: 12,
      total_volume: 180000000,
      price_change_percentage_24h: 1.45
    }
  ];

  // Adicionar variação aleatória nos preços para simular dados em tempo real
  return mockData.map(crypto => ({
    ...crypto,
    current_price: crypto.current_price * (0.98 + Math.random() * 0.04), // ±2% variação
    price_change_percentage_24h: crypto.price_change_percentage_24h + (Math.random() - 0.5) * 2 // ±1% variação
  }));
};

// Função para buscar dados de uma criptomoeda específica
export const fetchCryptoById = async (id) => {
  try {
    const allCryptos = await fetchCryptoData();
    return allCryptos.find(crypto => crypto.id === id);
  } catch (error) {
    console.error('Erro ao buscar criptomoeda por ID:', error);
    throw new Error('Falha ao carregar dados da criptomoeda');
  }
};

// Função para buscar dados de múltiplas criptomoedas por símbolo
export const fetchCryptosBySymbols = async (symbols) => {
  try {
    const allCryptos = await fetchCryptoData();
    return allCryptos.filter(crypto => 
      symbols.map(s => s.toLowerCase()).includes(crypto.symbol.toLowerCase())
    );
  } catch (error) {
    console.error('Erro ao buscar criptomoedas por símbolos:', error);
    throw new Error('Falha ao carregar dados das criptomoedas');
  }
};