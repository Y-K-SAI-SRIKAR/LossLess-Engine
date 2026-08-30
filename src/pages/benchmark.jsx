import React from "react";
import './benchmark.css';
import FoldText from "../components/FoldText";
import GradientText from "../components/GradientText";
import AnimatedContent from "../components/AnimatedContent";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../components/RadarChart";
import { Badge } from "@/components/ui/badge";
import { TrendingUp } from "lucide-react";

function BenchMark(){
    const chartConfig = {
        Testing: {
            label: "Testing",
            color: "#F26A4B", 
        },
        Validation: {
            label: "Validation",
            color: "#2E2E2E", 
        },
    };
    const chartData = [
        { metric: "Accuracy", Testing: 186, Validation: 92 },
        { metric: "Precision", Testing: 305, Validation: 178 },
        { metric: "Recall", Testing: 237, Validation: 145 },
        { metric: "April", Testing: 273, Validation: 203 },
    ];

    return (
        <section className="BenchMark">
            <section className="BenchMark-Intro">
                <div className="BenchMark-Intro-Heading">
                    <FoldText
                        text="Model Benchmarks"
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
                <div className="BenchMark-Intro-SubHeading">
                    <GradientText
                        colors={["#ca1717", "#F26A4B"]}
                        animationSpeed={45}
                        showBorder={false}
                        className="custom-class"
                    >
                        Validated by data. Proven in production.
                    </GradientText>
                </div>
            </section>
            <section className="BenchMark-Content-Charts">
                <AnimatedContent
                    distance={100}
                    direction="vertical"
                    reverse={false}
                    duration={0.9}
                    ease="power3.out"
                    initialOpacity={0}
                    animateOpacity
                    scale={1}
                    threshold={0.1}
                    delay={0}
                >
                    <div className="BenchMark-Content-Charts-1">
                        <Card>
                            <CardHeader className="items-center pb-4">
                                <CardTitle>
                                Model : M1
                                <Badge
                                    variant="outline"
                                    className="text-green-500 bg-green-500/10 border-none ml-2"
                                >
                                    <TrendingUp className="h-4 w-4" />
                                    <span>Base Model</span>
                                </Badge>
                                </CardTitle>
                                <CardDescription>
                                Performance Snapshot: M1
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="pb-0">
                                <ChartContainer
                                    config={chartConfig}
                                    className="mx-auto aspect-square max-h-[250px]"
                                    >
                                    <RadarChart data={chartData}>
                                        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                                        <PolarAngleAxis dataKey="metric" />
                                        <PolarGrid strokeDasharray="3 3" />
                                        <Radar
                                        stroke="var(--color-desktop)"
                                        dataKey="Testing"
                                        fill="var(--color-desktop)"
                                        fillOpacity={0.1}
                                        />
                                        <Radar
                                        stroke="var(--color-mobile)"
                                        dataKey="Validation"
                                        fill="var(--color-mobile)"
                                        fillOpacity={0.1}
                                        />
                                    </RadarChart>
                                </ChartContainer>
                            </CardContent>
                        </Card>
                    </div>
                </AnimatedContent>
                <AnimatedContent
                    distance={100}
                    direction="vertical"
                    reverse={false}
                    duration={0.9}
                    ease="power3.out"
                    initialOpacity={0}
                    animateOpacity
                    scale={1}
                    threshold={0.1}
                    delay={0}
                >
                    <div className="BenchMark-Content-Charts-2">
                        <Card>
                            <CardHeader className="items-center pb-4">
                                <CardTitle>
                                Model : M11
                                <Badge
                                    variant="outline"
                                    className="text-green-500 bg-green-500/10 border-none ml-2"
                                >
                                    <TrendingUp className="h-4 w-4" />
                                    <span>Champion Model</span>
                                </Badge>
                                </CardTitle>
                                <CardDescription>
                                Performance Snapshot: M11
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="pb-0">
                                <ChartContainer
                                    config={chartConfig}
                                    className="mx-auto aspect-square max-h-[250px]"
                                    >
                                    <RadarChart data={chartData}>
                                        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                                        <PolarAngleAxis dataKey="metric" />
                                        <PolarGrid strokeDasharray="3 3" />
                                        <Radar
                                        stroke="var(--color-desktop)"
                                        dataKey="Testing"
                                        fill="var(--color-desktop)"
                                        fillOpacity={0.1}
                                        />
                                        <Radar
                                        stroke="var(--color-mobile)"
                                        dataKey="Validation"
                                        fill="var(--color-mobile)"
                                        fillOpacity={0.1}
                                        />
                                    </RadarChart>
                                </ChartContainer>
                            </CardContent>
                        </Card>
                    </div>
                </AnimatedContent>
            </section>
        </section>
    )
}
export default BenchMark;