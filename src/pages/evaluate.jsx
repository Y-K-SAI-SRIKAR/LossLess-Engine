import React, { useState } from "react";
import './evaluate.css';
import axios from "axios";
import FoldText from "../components/FoldText";
import GradientText from "../components/GradientText";
import FileUploadSingle  from "../components/FileUploadSingle";
import FileUploadBatch from "../components/FileUploadBatch";
import SpecularButton from "../components/SpecularButton";

const API_URL = import.meta.env.VITE_BACKEND_URL;

function Evaluate(){
    const [singleFile, setSingleFile] = useState(null);
    const [batchFile, setBatchFile] = useState(null);

    const [singleLoading, setSingleLoading] = useState(false);
    const [batchLoading, setBatchLoading] = useState(false);

    const [singleResult, setSingleResult] = useState(null);
    const [batchResult, setBatchResult] = useState(null);

    const [singleError, setSingleError] = useState("");
    const [batchError, setBatchError] = useState("");

    const [singleResultOpen, setSingleResultOpen] = useState(false);
    const [batchResultOpen, setBatchResultOpen] = useState(false);

    const handleSingleFile = (files) => {
        if (files.length > 0) {
            setSingleFile(files[0]);
            setSingleResult(null);
            setSingleError("");
        }
    };

    const handleBatchFile = (files) => {
        if (files.length > 0) {
            setBatchFile(files[0]);
            setBatchResult(null);
            setBatchError("");
        }
    };

    const handleSingleAnalyze = async () => {
        if (!singleFile) return;

        try {
            setSingleLoading(true);
            setSingleError("");
            setSingleResult(null);

            const formData = new FormData();
            formData.append("file", singleFile);

            const response = await axios.post(
                `${API_URL}/api/v1/analyze`,
                formData
            );

            setSingleResult(response.data);
            setSingleResultOpen(true);

        } catch (error) {
            setSingleError(
                error.response?.data?.detail ||
                "Single transaction analysis failed."
            );
        } finally {
            setSingleLoading(false);
        }
    };

    const handleBatchAnalyze = async () => {
        if (!batchFile) return;

        try {
            setBatchLoading(true);
            setBatchError("");
            setBatchResult(null);

            const formData = new FormData();
            formData.append("file", batchFile);

            const response = await axios.post(
                `${API_URL}/api/v1/analyze/batch`,
                formData
            );

            setBatchResult(response.data);
            setBatchResultOpen(true);

        } catch (error) {
            setBatchError(
                error.response?.data?.detail ||
                "Batch transaction analysis failed."
            );
        } finally {
            setBatchLoading(false);
        }
    };

    const resultDownloadUrl =
    batchResult?.analysis?.artifacts?.result_download_url;

    const reportDownloadUrl =
    batchResult?.analysis?.artifacts?.report_download_url;

    const findTool = (value, toolName) => {
        if (Array.isArray(value)) {
            for (const item of value) {
                if (item?.tool_name === toolName) {
                    return item;
                }

                const found = findTool(item, toolName);

                if (found) {
                    return found;
                }
            }
        }

        if (value && typeof value === "object") {
            for (const child of Object.values(value)) {
                const found = findTool(child, toolName);

                if (found) {
                    return found;
                }
            }
        }

        return null;
    };

    const predictionTool = findTool(
        singleResult?.analysis,
        "prediction_tool"
    );
        
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
                        <FileUploadSingle onFilesAccepted={handleSingleFile}/>
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
                            onClick={handleSingleAnalyze}
                            disabled={!singleFile || singleLoading}
                        >
                            {singleLoading ? "Analyzing..." : "Analyze Transaction"}
                        </SpecularButton>
                        {singleError && (
                            <p>{singleError}</p>
                        )}

                        {singleResult && (
                            <div className="result-card">
                                <div 
                                    className="result-header" 
                                    onClick={() => setSingleResultOpen(!singleResultOpen)}
                                >
                                    <h3>Analysis Completed</h3>
                                    <span className={`dropdown-arrow ${singleResultOpen ? 'open' : ''}`}>▼</span>
                                </div>
                                
                                {singleResultOpen && (
                                    <div className="result-body single-analysis-result">
                                        <p><strong>Transaction ID:</strong> {singleResult.transaction_id}</p>
                                        <p><strong>Customer ID:</strong> {singleResult.analysis?.customer_id}</p>
                                        <p><strong>Risk Level:</strong> {singleResult.analysis?.decision?.risk_level}</p>
                                        <p><strong>Action:</strong> {singleResult.analysis?.decision?.action}</p>
                                        <p>
                                            <strong>Fraud Probability:</strong>{" "}
                                            {predictionTool?.data?.fraud_probability != null
                                                ? `${(predictionTool.data.fraud_probability * 100).toFixed(2)}%`
                                                : "N/A"}
                                        </p>
                                        <p><strong>Explanation:</strong> {singleResult.analysis?.explanation || "No explanation available."}</p>
                                        <p><strong>Model:</strong> {singleResult.analysis?.metadata?.ml_model || "N/A"}</p>
                                        <p><strong>Model Alias:</strong> {singleResult.analysis?.metadata?.ml_alias || "N/A"}</p>
                                        <p>
                                            <strong>Threshold:</strong>{" "}
                                            {singleResult.analysis?.metadata?.ml_threshold != null
                                                ? (singleResult.analysis.metadata.ml_threshold * 100).toFixed(2)
                                                : "N/A"}%
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
                <div className="Evaluate-Content-Batch">
                    <div className="w-full">
                        <FileUploadBatch onFilesAccepted={handleBatchFile}/>
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
                            onClick={handleBatchAnalyze}
                            disabled={!batchFile || batchLoading}
                        >
                            {batchLoading ? "Analyzing..." : "Analyze Batch"}
                        </SpecularButton>
                        {batchError && (
                            <p>{batchError}</p>
                        )}

                        {batchResult && (
                            <div className="result-card">
                                <div 
                                    className="result-header" 
                                    onClick={() => setBatchResultOpen(!batchResultOpen)}
                                >
                                    <h3>Batch Analysis Completed</h3>
                                    <span className={`dropdown-arrow ${batchResultOpen ? 'open' : ''}`}>▼</span>
                                </div>

                                {batchResultOpen && (
                                    <div className="result-body batch-analysis-result">
                                        <p><strong>Batch ID:</strong> {batchResult.batch_id}</p>
                                        <p><strong>Total Transactions:</strong> {batchResult.analysis?.summary?.total_transactions}</p>
                                        <p><strong>Fraud Transactions:</strong> {batchResult.analysis?.summary?.fraud_transactions}</p>
                                        <p><strong>Legitimate Transactions:</strong> {batchResult.analysis?.summary?.legitimate_transactions}</p>
                                        <p><strong>Fraud Rate:</strong> {batchResult.analysis?.summary?.fraud_rate}%</p>
                                        <p>
                                            <strong>Average Fraud Probability:</strong>{" "}
                                            {(batchResult.analysis?.summary?.average_fraud_probability * 100).toFixed(2)}%
                                        </p>
                                        <p>
                                            <strong>Production Threshold:</strong>{" "}
                                            {(batchResult.analysis?.summary?.production_threshold * 100).toFixed(2)}%
                                        </p>
                                        
                                        <div className="batch-action-buttons">
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
                                                disabled={!resultDownloadUrl}
                                                onClick={() => window.open(resultDownloadUrl, "_blank")}
                                            >
                                                Download Results
                                            </SpecularButton>

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
                                                disabled={!reportDownloadUrl}
                                                onClick={() => window.open(reportDownloadUrl, "_blank")}
                                            >
                                                Download Report
                                            </SpecularButton>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </section>
        
    )
}
export default Evaluate;