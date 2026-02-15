import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceArea,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { getBtcHistory } from "@/api/crypto";
import { Card } from "@/components/ui/card";

type SelectionResult = {
  fromTs: number;
  toTs: number;
  changePct: number;
};

type ChartMouseState = {
  activeLabel?: number | string;
  chartX?: number;
  chartY?: number;
};

function getActiveTimestamp(state: ChartMouseState | undefined): number | null {
  if (!state) {
    return null;
  }

  if (typeof state.activeLabel === "number") {
    return state.activeLabel;
  }

  if (typeof state.activeLabel === "string") {
    const parsed = Number(state.activeLabel);
    return Number.isFinite(parsed) ? parsed : null;
  }

  return null;
}

function formatDateTime(ts: number): string {
  return new Date(ts).toLocaleString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getNearestPoint(
  points: Array<{ timestamp: number; price: number }>,
  targetTs: number,
): { timestamp: number; price: number } {
  return points.reduce((nearest, current) => {
    const nearestDiff = Math.abs(nearest.timestamp - targetTs);
    const currentDiff = Math.abs(current.timestamp - targetTs);
    return currentDiff < nearestDiff ? current : nearest;
  }, points[0]);
}

export function ChartPage() {
  const [dragStartTs, setDragStartTs] = useState<number | null>(null);
  const [dragEndTs, setDragEndTs] = useState<number | null>(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["btc-history"],
    queryFn: () => getBtcHistory(7),
  });

  const chartData = data ?? [];

  const selection = useMemo<SelectionResult | null>(() => {
    if (chartData.length === 0 || dragStartTs === null || dragEndTs === null) {
      return null;
    }

    const startPoint = getNearestPoint(chartData, dragStartTs);
    const endPoint = getNearestPoint(chartData, dragEndTs);
    const fromTs = Math.min(startPoint.timestamp, endPoint.timestamp);
    const toTs = Math.max(startPoint.timestamp, endPoint.timestamp);

    const first = startPoint.timestamp <= endPoint.timestamp ? startPoint : endPoint;
    const last = startPoint.timestamp <= endPoint.timestamp ? endPoint : startPoint;
    const changePct = first.price === 0 ? 0 : ((last.price - first.price) / first.price) * 100;

    return {
      fromTs,
      toTs,
      changePct,
    };
  }, [chartData, dragEndTs, dragStartTs]);

  if (isLoading) {
    return <p className="p-6 text-muted-foreground">Loading...</p>;
  }

  if (isError) {
    return <p className="p-6 text-rose-400">Error loading BTC chart</p>;
  }

  if (!data || data.length === 0) {
    return <p className="p-6 text-muted-foreground">No chart data</p>;
  }

  const prices = chartData.map((point) => point.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const padding = Math.max((maxPrice - minPrice) * 0.05, maxPrice * 0.002);

  function handleMouseDown(state: ChartMouseState | undefined) {
    const ts = getActiveTimestamp(state);

    if (ts === null) {
      return;
    }

    setDragStartTs(ts);
    setDragEndTs(ts);
  }

  function handleMouseMove(state: ChartMouseState | undefined) {
    if (dragStartTs === null) {
      return;
    }

    const ts = getActiveTimestamp(state);
    if (ts === null) {
      return;
    }

    setDragEndTs(ts);
  }

  function handleMouseUp() {
    setDragStartTs(null);
    setDragEndTs(null);
  }

  function handleMouseLeave() {
    setDragStartTs(null);
    setDragEndTs(null);
  }

  const isDragging = dragStartTs !== null && dragEndTs !== null;
  const changeText = selection
    ? `${selection.changePct >= 0 ? "+" : ""}${selection.changePct.toFixed(2)}%`
    : "Calculating...";

  return (
    <section>
      <h2 className="text-xl font-semibold text-foreground">BTC Price Chart</h2>

      <Card className="mt-6 border-border/70 bg-card/80 p-4 shadow-xl shadow-black/25 backdrop-blur md:p-6">
        <p className="mb-3 text-sm text-muted-foreground">
          Hold mouse button and drag on chart to see interval and growth.
        </p>

        <div className="relative h-[360px] w-full select-none">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#31584b" />
              <XAxis
                type="number"
                dataKey="timestamp"
                domain={["dataMin", "dataMax"]}
                minTickGap={36}
                tickFormatter={(value) =>
                  new Date(value).toLocaleDateString("ru-RU", {
                    day: "2-digit",
                    month: "2-digit",
                  })
                }
              />
              <YAxis
                width={90}
                domain={[minPrice - padding, maxPrice + padding]}
                tickFormatter={(value) => `$${Number(value).toLocaleString()}`}
              />
              <Tooltip
                isAnimationActive={false}
                contentStyle={{
                  background: "rgba(2, 23, 15, 0.92)",
                  border: "1px solid rgba(84, 130, 113, 0.7)",
                  borderRadius: "12px",
                }}
                labelStyle={{ color: "#d8f8e8" }}
                formatter={(value: number | string | undefined) => {
                  if (isDragging) {
                    return [changeText, "Change"];
                  }

                  const normalized = Number(value ?? 0);
                  return [`$${normalized.toLocaleString()}`, "Price"];
                }}
                labelFormatter={(value) => {
                  if (isDragging && selection) {
                    return `${formatDateTime(selection.fromTs)} - ${formatDateTime(selection.toTs)}`;
                  }

                  return formatDateTime(Number(value));
                }}
              />

              {isDragging && (
                <ReferenceArea
                  x1={Math.min(dragStartTs, dragEndTs)}
                  x2={Math.max(dragStartTs, dragEndTs)}
                  strokeOpacity={0.25}
                  fill="#36b9f0"
                  fillOpacity={0.16}
                />
              )}

              <Line
                type="monotone"
                dataKey="price"
                stroke="#ff4b91"
                strokeWidth={3}
                dot={false}
                activeDot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </section>
  );
}
