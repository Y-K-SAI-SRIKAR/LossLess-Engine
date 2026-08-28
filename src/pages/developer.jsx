import React from "react";
import './developer.css';
import FoldText from "../components/FoldText";
import GradientText from "../components/GradientText";
import AnimatedContent from "../components/AnimatedContent";
import * as Icons from 'react-icons/vsc';
import * as IC from 'react-icons/fa';
import Dock from '../components/Dock';
import Img from '../assets/9.jpg';
import DitherReveal from '../components/DitherReveal';

function Developer(){

    const items = [
    { icon: <Icons.VscMail size={18} />, label: 'Mail', onClick: () => window.open('mailto:ksaisrikaryerraguntla9@gmail.com', '_blank') },
    { icon: <IC.FaLinkedin size={18} />, label: 'LinkedIn', onClick: () => window.open('https://www.linkedin.com/in/y-k-sai-srikar/', '_blank') },
    { icon: <Icons.VscGithub size={18} />, label: 'GitHub', onClick: () =>window.open('https://github.com/Y-K-SAI-SRIKAR', '_blank') },
    { icon: <IC.FaInstagram size={18} />, label: 'Instagram', onClick: () => window.open('https://instagram.com/shinazugawa_.22._', '_blank') }
  ];

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
            <section className="Developer-Content">
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
                    <div className="Developer-Content-Image">
                        <DitherReveal
                            image = {Img}
                            focusY = {8}
                            revealRadius = {100}
                        />
                    </div>
                </AnimatedContent>
                <div className="Developer-Content-Right">
                    <div className="Developer-Connect-Text">
                        <span>Elsewhere</span>
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
                        <div className="Developer-Content-Dock">
                            <Dock 
                                items={items}
                                panelHeight={68}
                                baseItemSize={50}
                                magnification={70}
                            />
                        </div>
                    </AnimatedContent>
                </div>
            </section>
        </section>
    )
}

export default Developer;