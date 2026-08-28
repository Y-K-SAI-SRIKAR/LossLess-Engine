import React from "react";
import './developer.css';
import FoldText from "../components/FoldText";
import GradientText from "../components/GradientText";
import AnimatedContent from "../components/AnimatedContent";

function Developer(){
    return (
        <section className="Developer">
            <section className="Developer-Intro">
                <div className="Developer-Intro-Heading">
                    <FoldText
                        text="Vision & Execution"
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
                    <div className="Developer-Intro-SubHeading">
                        <GradientText
                            colors={["#ca1717", "#F26A4B"]}
                            animationSpeed={45}
                            showBorder={false}
                            className="custom-class"
                        >
                            Srikar Yerraguntla : GenAI & ML specialist
                        </GradientText>
                    </div>
                </AnimatedContent>
            </section>
        </section>
    )
}

export default Developer;