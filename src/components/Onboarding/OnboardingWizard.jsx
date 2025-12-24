import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WelcomeStep from './WelcomeStep';
import CompetitorStep from './CompetitorStep';
import '../../styles/Onboarding.css';

const OnboardingWizard = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const navigate = useNavigate();

    const handleWelcomeContinue = () => {
        setCurrentStep(2);
    };

    const handleComplete = () => {
        navigate('/');
    };

    const handleSkip = () => {
        navigate('/');
    };

    return (
        <div className="onboarding-container">
            <div className="onboarding-card">
                <div className="progress-indicator">
                    <span className={currentStep === 1 ? 'active' : 'completed'}>1</span>
                    <div className="progress-line"></div>
                    <span className={currentStep === 2 ? 'active' : ''}>2</span>
                </div>

                {currentStep === 1 && (
                    <WelcomeStep onContinue={handleWelcomeContinue} />
                )}

                {currentStep === 2 && (
                    <CompetitorStep
                        onComplete={handleComplete}
                        onSkip={handleSkip}
                    />
                )}
            </div>
        </div>
    );
};

export default OnboardingWizard;
