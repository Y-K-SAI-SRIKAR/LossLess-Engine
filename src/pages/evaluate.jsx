import React from "react";
import './evaluate.css';
import FoldText from "../components/FoldText";
import GradientText from "../components/GradientText";
import FileUploadSingle  from "../components/FileUploadSingle";
import FileUploadBatch from "../components/FileUploadBatch";

function Evaluate(){
    return (
        <section className="Evaluate">
            <section className="Evaluate-Intro">
                <div className="Evaluate-Intro-Heading">
                    <FoldText
                        text="Evaluate Transactions"
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
                <div className="Evaluate-Intro-SubHeading">
                    <GradientText
                        colors={["#ca1717", "#F26A4B"]}
                        animationSpeed={45}
                        showBorder={false}
                        className="custom-class"
                    >
                        Continuous Testing. Real Results.
                    </GradientText>
                </div>
            </section>
            <section className="Evaluate-Content">
                <div className="Evaluate-Content-Single">
                    <div className="w-full">
                        <FileUploadSingle />
                    </div>
                </div>
                <div className="Evaluate-Content-Batch">
                    <div className="w-full">
                        <FileUploadBatch />
                    </div>
                </div>
            </section>
        </section>
        
    )
}
export default Evaluate;