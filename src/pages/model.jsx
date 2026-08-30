import React from "react";
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
            {entry.name}: ${(entry.value / 1000000).toFixed(2)}M
          </p>
        ))}
      </div>
    );
  }
  return null;
};

function Model(){

    const salesData = [
        { month: 'Jan 24', goals: 250000, sales: 280000, salesArea: 280000 },
        { month: 'Feb 24', goals: 420000, sales: 350000, salesArea: 350000 },
        { month: 'Mar 24', goals: 380000, sales: 480000, salesArea: 480000 },
        { month: 'Apr 24', goals: 520000, sales: 390000, salesArea: 390000 },
        { month: 'May 24', goals: 300000, sales: 520000, salesArea: 520000 },
        { month: 'Jun 24', goals: 550000, sales: 465000, salesArea: 465000 },
        { month: 'Apr 24', goals: 520000, sales: 390000, salesArea: 390000 },
        { month: 'May 24', goals: 300000, sales: 520000, salesArea: 520000 },
        { month: 'Jun 24', goals: 550000, sales: 465000, salesArea: 465000 },
        { month: 'Apr 24', goals: 520000, sales: 390000, salesArea: 390000 },
        { month: 'May 24', goals: 300000, sales: 520000, salesArea: 520000 },
    ];

    const chartConfig = {
        goals: {
            label: 'Goals',
            color: 'hsl(var(--chart-1))',
        },
        sales: {
            label: 'Sales',
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
                    <div className="w-full max-w-5xl flex items-center justify-center p-6 lg:p-8 mt-6">
                        <Card className="w-full lg:max-w-4xl custom-graph-card">
                            <CardHeader className="border-0 min-h-auto pt-6 pb-6">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-base font-semibold">Model Performance Overview</CardTitle>
                                </div>
                                <div className="flex items-center gap-4 text-sm mt-4">
                                    <ChartLabel label="Sales" color={chartConfig.sales.color} />
                                    <ChartLabel label="Goals" color={chartConfig.goals.color} />
                                </div>
                            </CardHeader>

                            <CardContent className="px-2.5 flex flex-col items-end">
                                <ChartContainer
                                    config={chartConfig}
                                    className="h-[350px] w-full [&_.recharts-curve.recharts-tooltip-cursor]:stroke-initial"
                                >
                                    <ComposedChart
                                        data={salesData}
                                        margin={{
                                            top: 5,
                                            right: 15,
                                            left: 5,
                                            bottom: 5,
                                        }}
                                    >
                                        <defs>
                                            <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="0%" stopColor={chartConfig.sales.color} stopOpacity={0.3} />
                                                <stop offset="100%" stopColor={chartConfig.sales.color} stopOpacity={0.05} />
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
                                            dataKey="month"
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
                                            tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
                                            domain={['dataMin - 50000', 'dataMax + 50000']}
                                            tickMargin={12}
                                        />
                                        <ReferenceLine x="Mar 24" stroke={chartConfig.sales.color} strokeWidth={1} />
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
                                            dataKey="salesArea"
                                            stroke="transparent"
                                            fill="url(#salesGradient)"
                                            strokeWidth={0}
                                            dot={false}
                                        />
                                        <Line
                                            type="linear"
                                            dataKey="sales"
                                            stroke={chartConfig.sales.color}
                                            strokeWidth={2}
                                            dot={{
                                                fill: 'var(--background)',
                                                strokeWidth: 2,
                                                r: 6,
                                                stroke: chartConfig.sales.color,
                                            }}
                                        />
                                        <Line
                                            type="linear"
                                            dataKey="goals"
                                            stroke={chartConfig.goals.color}
                                            strokeWidth={2}
                                            strokeDasharray="4 4"
                                            dot={{
                                                fill: 'var(--background)',
                                                strokeWidth: 2,
                                                r: 6,
                                                stroke: chartConfig.goals.color,
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