export type Coin = {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
};

type BtcHistoryResponse = {
  prices: [number, number][];
};

export type BtcPricePoint = {
  timestamp: number;
  price: number;
};

const COINGECKO_API_PROXY_BASE_URL = "/api/coingecko";

function getErrorMessage(status: number, fallback: string): string {
  if (status === 429) {
    return "CoinGecko rate limit reached. Try again in a minute.";
  }

  if (status === 403) {
    return "CoinGecko access denied. Check API key settings.";
  }

  return fallback;
}

export async function getCoins(): Promise<Coin[]> {
  const params = new URLSearchParams({
    vs_currency: "usd",
    order: "market_cap_desc",
    per_page: "6",
    page: "1",
    sparkline: "false",
  });

  const res = await fetch(`${COINGECKO_API_PROXY_BASE_URL}/coins/markets?${params.toString()}`);

  if (!res.ok) {
    throw new Error(getErrorMessage(res.status, "Failed to load coins"));
  }

  return res.json();
}

export async function getBtcHistory(days = 7): Promise<BtcPricePoint[]> {
  const params = new URLSearchParams({
    vs_currency: "usd",
    days: String(days),
  });

  const res = await fetch(`${COINGECKO_API_PROXY_BASE_URL}/coins/bitcoin/market_chart?${params.toString()}`);

  if (!res.ok) {
    throw new Error(getErrorMessage(res.status, "Failed to load BTC history"));
  }

  const data: BtcHistoryResponse = await res.json();

  return data.prices.map(([timestamp, price]) => ({
    timestamp,
    price: Number(price.toFixed(2)),
  }));
}
