import React from "react";
import './model.css';
import FoldText from "../components/FoldText";
import GradientText from "../components/GradientText";


function Model(){
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
        </section>
    )
}
export default Model;