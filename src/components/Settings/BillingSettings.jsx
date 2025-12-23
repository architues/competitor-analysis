import React, { useState } from 'react';
import { Check, CreditCard, Zap } from 'lucide-react';

const BillingSettings = () => {
    const [currentPlan, setCurrentPlan] = useState('pro');

    const PlanCard = ({ id, name, price, features, recommended }) => (
        <div
            className={`pricing-card ${currentPlan === id ? 'current' : ''}`}
            onClick={() => setCurrentPlan(id)}
        >
            {recommended && (
                <div style={{
                    color: 'var(--blue-600)',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    marginBottom: 8,
                    textTransform: 'uppercase'
                }}>Recommended</div>
            )}
            <h3 style={{ margin: 0 }}>{name}</h3>
            <div className="price">${price}<span>/mo</span></div>
            <ul style={{
                listStyle: 'none',
                padding: 0,
                textAlign: 'left',
                margin: '20px 0',
                fontSize: '0.9rem',
                color: 'var(--text-secondary)'
            }}>
                {features.map((f, i) => (
                    <li key={i} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                        <Check size={16} color="var(--blue-500)" /> {f}
                    </li>
                ))}
            </ul>
            <button className={`btn-${currentPlan === id ? 'secondary' : 'primary'}`} style={{ width: '100%', justifyContent: 'center' }}>
                {currentPlan === id ? 'Current Plan' : 'Upgrade'}
            </button>
        </div>
    );

    return (
        <div className="billing-settings">
            <div className="settings-section">
                <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <h3 className="section-title">Current Plan</h3>
                        <p className="section-desc">You are currently on the <span className="plan-badge pro">Pro</span> plan.</p>
                    </div>
                    <button className="btn-secondary">Manage Payment Method</button>
                </div>

                <div className="usage-stats">
                    <div className="usage-item">
                        <div className="usage-label">
                            <span>Competitors Tracked</span>
                            <span>8 / 20</span>
                        </div>
                        <div className="progress-bar">
                            <div className="progress-fill" style={{ width: '40%' }}></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="settings-section">
                <div className="section-header">
                    <h3 className="section-title">Available Plans</h3>
                    <p className="section-desc">Choose the plan that fits your needs.</p>
                </div>

                <div className="pricing-grid">
                    <PlanCard
                        id="free"
                        name="Free"
                        price="0"
                        features={['3 Competitors', 'Basic Analytics', '1 User']}
                    />
                    <PlanCard
                        id="pro"
                        name="Pro"
                        price="49"
                        features={['20 Competitors', 'Advanced Analytics', '5 Users', 'AI Insights']}
                        recommended
                    />
                    <PlanCard
                        id="enterprise"
                        name="Enterprise"
                        price="199"
                        features={['Unlimited', 'Custom Reports', 'SSO', 'Dedicated Support']}
                    />
                </div>
            </div>
        </div>
    );
};

export default BillingSettings;
