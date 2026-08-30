import React, { useEffect, useState } from "react";
import axios from "axios";
import './model.css';
import FoldText from "../components/FoldText";
import GradientText from "../components/GradientText";
import { ChartContainer, ChartTooltip } from '@/components/ui/chart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Area, CartesianGrid, ComposedChart, Line, ReferenceLine, XAxis, YAxis } from 'recharts';

const ChartLabel = ({ label, color }) => (
  <div className="flex items-center gap-2">
    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }}></div>
    <span className="text-sm font-medium">{label}</span>
  </div>
);

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
        <p className="font-semibold text-sm">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.color }} className="text-sm">
            {entry.name}: {entry.value.toFixed(2)}%
          </p>
        ))}
      </div>
    );
  }
  return null;
};

function Model(){

    const [HistoryData, setHistoryData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchHistory() {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_ML_MODEL_URL}/model/history`
                );

                const data = response.data;

                setHistoryData(data);

            } catch (err) {
                console.error("History API Error:", err);
                setError(err.message);

            } finally {
                setLoading(false);
            }
        }

        fetchHistory();
    }, []);

    if (loading) {
    return <div>Loading Model History...</div>;
    }

    if (error) {
        return <div>Failed to load Model History: {error}</div>;
    }

    if (!HistoryData) {
        return null;
    }


    const ModelData = HistoryData.versions.map((version) => ({
        model: `M${version.version}`,
        Precision: version.test_precision*100,
        ReCall: version.test_recall*100,
        ReCallArea: version.test_recall*100,
    }));

    const chartConfig = {
        Precision: {
            label: 'Precision',
            color: 'hsl(var(--chart-1))',
        },
        ReCall: {
            label: 'ReCall',
            color: 'hsl(var(--chart-2))',
        },
    };

    return (
        <section className="Model">
            <section className="Model-Intro">
                <div className="Model-Intro-Heading">
                    <FoldText
                        text="From M1 to Production"
                        splitBy="char"
                        hinge="top"
                        trigger="view"
                        duration={0.35}
                        stagger={0.035}
                        ease="power3.out"
                        perspective={700}
                        creaseShading={0.55}
                        fontSize={65}
                        fontWeight={700}
                        color="#000000"
                    />
                </div>
                <div className="Model-Intro-SubHeading">
                    <GradientText
                        colors={["#ca1717", "#F26A4B"]}
                        animationSpeed={45}
                        showBorder={false}
                        className="custom-class"
                    >
                        Training smarter. Detecting faster. Protecting better.
                    </GradientText>
                </div>
            </section>
            <section className="Model-Content">
                <div className="Model-Content-Graph">
                    <div className="w-full max-w-5xl flex items-center justify-center p-6 lg:px-8 py-2">
                        <Card className="w-full lg:max-w-4xl custom-graph-card">
                            <CardHeader className="border-0 min-h-auto pt-6 pb-6">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-base font-semibold">Model Performance Overview</CardTitle>
                                </div>
                                <div className="flex items-center gap-4 text-sm mt-4">
                                    <ChartLabel label="ReCall" color={chartConfig.ReCall.color} />
                                    <ChartLabel label="Precision" color={chartConfig.Precision.color} />
                                </div>
                            </CardHeader>

                            <CardContent className="px-2.5 flex flex-col items-end">
                                <ChartContainer
                                    config={chartConfig}
                                    className="h-[350px] w-full [&_.recharts-curve.recharts-tooltip-cursor]:stroke-initial"
                                >
                                    <ComposedChart
                                        data={ModelData}
                                        margin={{
                                            top: 5,
                                            right: 15,
                                            left: 5,
                                            bottom: 5,
                                        }}
                                    >
                                        <defs>
                                            <linearGradient id="ReCallGradient" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="0%" stopColor={chartConfig.ReCall.color} stopOpacity={0.3} />
                                                <stop offset="100%" stopColor={chartConfig.ReCall.color} stopOpacity={0.05} />
                                            </linearGradient>
                                        </defs>

                                        <CartesianGrid
                                            strokeDasharray="4 4"
                                            stroke="var(--input)"
                                            strokeOpacity={1}
                                            horizontal={true}
                                            vertical={false}
                                        />

                                        <XAxis
                                            dataKey="model"
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fontSize: 11, className: 'text-muted-foreground' }}
                                            dy={5}
                                            tickMargin={12}
                                        />

                                        <YAxis
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fontSize: 11, className: 'text-muted-foreground' }}
                                            tickFormatter={(value) => `${value}%`}
                                            domain={[0, 100]}
                                            tickMargin={12}
                                        />
                                        <ReferenceLine x="Mar 24" stroke={chartConfig.ReCall.color} strokeWidth={1} />
                                        <ChartTooltip
                                            content={<CustomTooltip />}
                                            cursor={{
                                                stroke: 'var(--input)',
                                                strokeWidth: 1,
                                                strokeDasharray: 'none',
                                            }}
                                        />
                                        <Area
                                            type="linear"
                                            dataKey="ReCallArea"
                                            stroke="transparent"
                                            fill="url(#ReCallGradient)"
                                            strokeWidth={0}
                                            dot={false}
                                        />
                                        <Line
                                            type="linear"
                                            dataKey="ReCall"
                                            stroke={chartConfig.ReCall.color}
                                            strokeWidth={2}
                                            dot={{
                                                fill: 'var(--background)',
                                                strokeWidth: 2,
                                                r: 6,
                                                stroke: chartConfig.ReCall.color,
                                            }}
                                        />
                                        <Line
                                            type="linear"
                                            dataKey="Precision"
                                            stroke={chartConfig.Precision.color}
                                            strokeWidth={2}
                                            strokeDasharray="4 4"
                                            dot={{
                                                fill: 'var(--background)',
                                                strokeWidth: 2,
                                                r: 6,
                                                stroke: chartConfig.Precision.color,
                                                strokeDasharray: '0',
                                            }}
                                        />
                                    </ComposedChart>
                                </ChartContainer>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>
        </section>
    )
}
export default Model;