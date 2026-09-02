import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import './feedback.css';
import SpecularButton from "../components/SpecularButton";
import FoldText from "../components/FoldText";
import GradientText from "../components/GradientText";


const CustomSelect = ({ name, value, onChange, options, placeholder, required }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = (optionValue) => {
        onChange({ target: { name, value: optionValue } });
        setIsOpen(false);
    };

    const selectedLabel = options.find(opt => opt.value === value)?.label;

    return (
        <div className="custom-select-container" ref={dropdownRef}>
            <input 
                type="text" 
                name={name} 
                value={value} 
                required={required} 
                onChange={() => {}} 
                className="hidden-validation-input"
            />
            
            <div 
                className={`custom-select-header ${isOpen ? 'open' : ''} ${!value ? 'placeholder-active' : ''}`}
                onClick={() => setIsOpen(!isOpen)}
            >
                {value ? selectedLabel : placeholder}
                <span className="arrow">{isOpen ? '▲' : '▼'}</span>
            </div>
            
            {isOpen && (
                <ul className="custom-select-list">
                    {options.map((option) => (
                        <li 
                            key={option.value}
                            className={`custom-select-item ${value === option.value ? 'selected' : ''}`}
                            onClick={() => handleSelect(option.value)}
                        >
                            {option.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

function FeedBack(){
    const [formData, setFormData] = useState({
        transaction_id: "",
        customer_id: "",
        original_prediction: "",
        actual_outcome: "",
        feedback_type: "",
        reviewer_decision: "",
        reason: ""
    });
    const [feedbackLoading, setFeedbackLoading] = useState(false);
    const [feedbackSuccess, setFeedbackSuccess] = useState("");
    const [feedbackError, setFeedbackError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setFeedbackLoading(true);
        setFeedbackSuccess("");
        setFeedbackError("");

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/v1/feedback`,
                {
                    transaction_id: formData.transaction_id,
                    customer_id: formData.customer_id,
                    original_prediction: formData.original_prediction,
                    actual_outcome: formData.actual_outcome,
                    feedback_type: formData.feedback_type,
                    reviewer_decision: formData.reviewer_decision || null,
                    reason: formData.reason || null
                }
            );

            console.log("Feedback response:", response.data);

            setFeedbackSuccess("Feedback submitted successfully.");

            setFormData({
                transaction_id: "",
                customer_id: "",
                original_prediction: "",
                actual_outcome: "",
                feedback_type: "",
                reviewer_decision: "",
                reason: ""
            });

        } catch (error) {
            console.error("Feedback submission error:", error);

            setFeedbackError(
                error.response?.data?.detail ||
                "Failed to submit feedback."
            );

        } finally {
            setFeedbackLoading(false);
        }
    };

    const predictionOptions = [
        { value: "Approve", label: "Approve" },
        { value: "Reject", label: "Reject" }
    ];
    const outcomeOptions = [
        { value: "Fraud", label: "Fraud" },
        { value: "Not Fraud", label: "Not Fraud" }
    ];
    const feedbackOptions = [
        { value: "True Positive", label: "True Positive" },
        { value: "True Negative", label: "True Negative" },
        { value: "False Positive", label: "False Positive" },
        { value: "False Negative", label: "False Negative" }
    ];
    const decisionOptions = [
        { value: "Approve", label: "Approve" },
        { value: "Reject", label: "Reject" }
    ];

    return (
        <section className="FeedBack">
            <section className="FeedBack-Intro">
                <div className="FeedBack-Intro-Heading">
                    <FoldText
                        text="Evaluation Insights"
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
                <div className="FeedBack-Intro-SubHeading">
                    <GradientText
                        colors={["#ca1717", "#F26A4B"]}
                        animationSpeed={45}
                        showBorder={false}
                        className="custom-class"
                    >
                        Your insights drive our next iteration
                    </GradientText>
                </div>
            </section>
            
            <section className="FeedBack-Content">
                <div className="FeedBack-Content-Form">
                    <form className="Styled-Form" onSubmit={handleSubmit}>
                        
                        <div className="form-group">
                            <label>Transaction ID</label>
                            <input type="text" name="transaction_id" value={formData.transaction_id} onChange={handleChange} required />
                        </div>

                        <div className="form-group">
                            <label>Customer ID</label>
                            <input type="text" name="customer_id" value={formData.customer_id} onChange={handleChange} required />
                        </div>

                        <div className="form-group">
                            <label>Original Selection (Prediction)</label>
                            <CustomSelect 
                                name="original_prediction" 
                                value={formData.original_prediction} 
                                onChange={handleChange} 
                                options={predictionOptions}
                                placeholder="Select Original Prediction"
                                required={true}
                            />
                        </div>

                        <div className="form-group">
                            <label>Actual Outcome</label>
                            <CustomSelect 
                                name="actual_outcome" 
                                value={formData.actual_outcome} 
                                onChange={handleChange} 
                                options={outcomeOptions}
                                placeholder="Select Actual Outcome"
                                required={true}
                            />
                        </div>

                        <div className="form-group">
                            <label>Feedback Type</label>
                            <CustomSelect 
                                name="feedback_type" 
                                value={formData.feedback_type} 
                                onChange={handleChange} 
                                options={feedbackOptions}
                                placeholder="Select Feedback Type"
                                required={true}
                            />
                        </div>

                        <div className="form-group">
                            <label>Reviewer Decision</label>
                            <CustomSelect 
                                name="reviewer_decision" 
                                value={formData.reviewer_decision} 
                                onChange={handleChange} 
                                options={decisionOptions}
                                placeholder="Select Reviewer Decision"
                                required={false}
                            />
                        </div>

                        <div className="form-group">
                            <label>Reason</label>
                            <textarea 
                                name="reason" 
                                value={formData.reason} 
                                onChange={handleChange} 
                                rows="4"
                            />
                        </div>

                        <div className="form-submit-container">
                            <SpecularButton
                                type="submit"
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
                                disabled={feedbackLoading}
                            >
                                {feedbackLoading ? "Submitting..." : "Submit Feedback"}
                            </SpecularButton>
                        </div>
                        {feedbackSuccess && (
                            <p className="feedback-success">
                                {feedbackSuccess}
                            </p>
                        )}

                        {feedbackError && (
                            <p className="feedback-error">
                                {feedbackError}
                            </p>
                        )}
                    </form>
                </div>
            </section>
        </section>
    );
}

export default FeedBack;