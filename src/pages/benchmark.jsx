import React, { useEffect, useState } from "react";
import './benchmark.css';
import axios from "axios";
import FoldText from "../components/FoldText";
import GradientText from "../components/GradientText";
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

    const [benchmarkData, setBenchmarkData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchBenchmark() {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_ML_MODEL_URL}/model/benchmark`
                );

                const data = response.data;

                setBenchmarkData(data);

            } catch (err) {
                console.error("Benchmark API Error:", err);
                setError(err.message);

            } finally {
                setLoading(false);
            }
        }

        fetchBenchmark();
    }, []);

    if (loading) {
    return <div>Loading benchmark data...</div>;
    }

    if (error) {
        return <div>Failed to load benchmark data: {error}</div>;
    }

    if (!benchmarkData) {
        return null;
    }


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
    
    const chartData1 = benchmarkData
    ? [
        {
            metric: "Accuracy",
            Testing: benchmarkData.baseline.test_accuracy*100,
            Validation:benchmarkData.baseline.validation_pr_auc*100
        },
        {
            metric: "Precision",
            Testing: benchmarkData.baseline.test_precision*100,
            Validation:benchmarkData.baseline.validation_precision*100
        },
        {
            metric: "Recall",
            Testing: benchmarkData.baseline.test_recall*100,
            Validation:benchmarkData.baseline.validation_recall*100
        },
        {
            metric: "F1 Score",
            Testing: benchmarkData.baseline.test_f1*100,
            Validation:benchmarkData.baseline.validation_f1*100
        },
        {
            metric: "ROC AUC",
            Testing: benchmarkData.baseline.test_roc_auc*100,
        },
    ]
    : [];

    const chartData2 = benchmarkData
    ? [
        {
            metric: "Accuracy",
            Testing: benchmarkData.current.test_accuracy*100,
            Validation:benchmarkData.current.validation_pr_auc*100
        },
        {
            metric: "Precision",
            Testing: benchmarkData.current.test_precision*100,
            Validation: benchmarkData.current.validation_pr_auc*100,
        },
        {
            metric: "Recall",
            Testing: benchmarkData.current.test_recall*100,
            Validation: benchmarkData.current.validation_recall*100,
        },
        {
            metric: "F1 Score",
            Testing: benchmarkData.current.test_f1*100,
            Validation: benchmarkData.current.validation_f1*100,
        },
        {
            metric: "ROC AUC",
            Testing: benchmarkData.current.test_roc_auc*100,
        },
    ]
    : [];

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
                                    <RadarChart data={chartData1}>
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
                                    <RadarChart data={chartData2}>
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
            </section>
        </section>
    )
}
export default BenchMark;