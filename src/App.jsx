import './App.css'
import { useNavigate } from 'react-router-dom';
import FoldText from './components/FoldText';
import GradientText from './components/GradientText';
import AnimatedContent from './components/AnimatedContent';
import SpecularButton from './components/SpecularButton';
import MaskRevealUp from './components/MaskRevealUp';


function App() {
  const navigate = useNavigate();

  return (
    <section className="App">
      <section className="App-Intro">
        <div className="App-Intro-Heading">
          <FoldText
            text="LossLess Engine"
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
          <div className="App-Intro-SubHeading">
            <GradientText
              colors={["#ca1717", "#F26A4B"]}
              animationSpeed={45}
              showBorder={true}
              className="custom-class"
            >
              AI-Powered Defense Against Fraud, Returns & Chargebacks !
            </GradientText>
          </div>
        </AnimatedContent>
      </section>

      <section className="App-Content">
        <div className="App-Content-GetStarted">
          <div className="App-Content-GetStarted-Desc">
            <MaskRevealUp
              className="text-lg text-muted-foreground"
              delay={350}
              lines={[
                "Every fraud case, chargeback, and return costs you real money.",
                "LossLess Engine intelligently catches payment risks with precision defense only, no false positives.",
                "Keep more revenue. Stay profitable."
              ]}
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
            <div className="App-Content-GetStarted-Button">
              <SpecularButton
                size="lg"
                radius={18}
                tint="#F26A4B"
                tintOpacity={0}
                blur={0}
                textColor="#000000"
                lineColor="#CFC8B8"
                baseColor="#F26A4B"
                intensity={1}
                shineSize={10}
                shineFade={40}
                thickness={1}
                speed={0.35}
                followMouse
                proximity={250}
                autoAnimate={true}
                onClick={() => navigate('/evaluate')}
              >
                Get Access
              </SpecularButton>
            </div>
          </AnimatedContent>
        </div>

        <div className="App-Content-NavBox">
          <AnimatedContent
            distance={100}
            direction="horizontal"
            reverse={true}
            duration={0.9}
            ease="power3.out"
            initialOpacity={0}
            animateOpacity
            scale={1}
            threshold={0.1}
            delay={0}
          >
            <div className="App-Content-BenchMark-Button">
              <SpecularButton
                size="lg"
                radius={18}
                tint="#F26A4B"
                tintOpacity={0}
                blur={0}
                textColor="#000000"
                lineColor="#CFC8B8"
                baseColor="#F26A4B"
                intensity={1}
                shineSize={10}
                shineFade={40}
                thickness={1}
                speed={0.35}
                followMouse
                proximity={250}
                autoAnimate={true}
                onClick={() => navigate('/benchmark')}
              >
                Model BenchMark
              </SpecularButton>
            </div>
          </AnimatedContent>

          <AnimatedContent
            distance={100}
            direction="horizontal"
            reverse={false}
            duration={0.9}
            ease="power3.out"
            initialOpacity={0}
            animateOpacity
            scale={1}
            threshold={0.1}
            delay={0}
          >
            <div className="App-Content-Model-Button">
              <SpecularButton
                size="lg"
                radius={18}
                tint="#F26A4B"
                tintOpacity={0}
                blur={0}
                textColor="#000000"
                lineColor="#CFC8B8"
                baseColor="#F26A4B"
                intensity={1}
                shineSize={10}
                shineFade={40}
                thickness={1}
                speed={0.35}
                followMouse
                proximity={250}
                autoAnimate={true}
                onClick={() => navigate('/model')}
              >
                Model Details
              </SpecularButton>
            </div>
          </AnimatedContent>

          <AnimatedContent
            distance={100}
            direction="horizontal"
            reverse={false}
            duration={0.9}
            ease="power3.out"
            initialOpacity={0}
            animateOpacity
            scale={1}
            threshold={0.1}
            delay={0}
          >
            <div className="App-Content-Developer-Button">
              <SpecularButton
                size="lg"
                radius={18}
                tint="#F26A4B"
                tintOpacity={0}
                blur={0}
                textColor="#000000"
                lineColor="#CFC8B8"
                baseColor="#F26A4B"
                intensity={1}
                shineSize={10}
                shineFade={40}
                thickness={1}
                speed={0.35}
                followMouse
                proximity={250}
                autoAnimate={true}
                onClick={() => navigate('/developer')}
              >
                Developer
              </SpecularButton>
            </div>
          </AnimatedContent>
        </div>
      </section>
      <div className="Footer-Wrapper">
        <AnimatedContent
          distance={100}
          direction="horizontal"
          reverse={false}
          duration={0.9}
          ease="power3.out"
          initialOpacity={0}
          animateOpacity
          scale={1}
          threshold={0.1}
          delay={0}
        >
          <div className='App-Footer'>
            <span>Defending merchant margins with AI | LossLess Engine | © RazorPay Buildathon 2026</span>
          </div>
        </AnimatedContent>
      </div>
    </section>
  );
}


export default App;