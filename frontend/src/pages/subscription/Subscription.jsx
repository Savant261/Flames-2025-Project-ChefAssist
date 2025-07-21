import React from 'react'
import "./subscriptionsstyles.css"
const Subscription = () => {
    return (
        <>
            <section className="hero-section">
                <div className="hero-content">
                    <div className="hero-text">
                        <h1 className="hero-title">Unlock Premium Cooking Experiences!</h1>
                        <p className="hero-subtitle">Join thousands of home chefs who've elevated their cooking with ChefAssist Premium</p>
                        <div className="hero-stats">
                            <div className="stat">
                                <span className="stat-number">10,000+</span>
                                <span className="stat-label">Premium Recipes</span>
                            </div>
                            <div className="stat">
                                <span className="stat-number">50,000+</span>
                                <span className="stat-label">Happy Chefs</span>
                            </div>
                            <div className="stat">
                                <span className="stat-number">4.9★</span>
                                <span className="stat-label">Average Rating</span>
                            </div>
                        </div>
                    </div>
                    <div className="hero-visual">
                        <div className="floating-icon chef-hat">👨‍🍳</div>
                        <div className="floating-icon utensils">🍴</div>
                        <div className="floating-icon food">🍝</div>
                    </div>
                </div>
            </section>

            {/* <!-- Plan Cards --> */}
            <section className="plans-section">
                <div className="container">
                    <h2 className="section-title">Choose Your Perfect Plan</h2>
                    <div className="plans-grid">
                        {/* <!-- Basic Plan --> */}
                        <div className="plan-card">
                            <div className="plan-header">
                                <h3 className="plan-name">Basic</h3>
                                <div className="plan-price">
                                    <span className="currency">$</span>
                                    <span className="amount">0</span>
                                    <span className="period">/month</span>
                                </div>
                            </div>
                            <ul className="plan-features">
                                <li><span className="icon">✓</span> 100 recipes per month</li>
                                <li><span className="icon">✓</span> Basic meal planning</li>
                                <li><span className="icon">✓</span> Community access</li>
                                <li><span className="icon">✗</span> Personalized recipe recommendations</li>
                                <li><span className="icon">✗</span> Family sharing</li>
                            </ul>
                            <button className="plan-button plan-button-basic">Get Started</button>
                        </div>

                        {/* <!-- Pro Plan (Most Popular) --> */}
                        <div className="plan-card plan-card-popular">
                            <div className="popular-badge">Most Popular</div>
                            <div className="plan-header">
                                <h3 className="plan-name">Pro</h3>
                                <div className="plan-price">
                                    <span className="currency">$</span>
                                    <span className="amount">9</span>
                                    <span className="period">/month</span>
                                </div>
                                <div className="plan-discount">Save 20% annually</div>
                            </div>
                            <ul className="plan-features">
                                <li><span className="icon">✓</span> Unlimited recipes</li>
                                <li><span className="icon">✓</span> Advanced meal planning</li>
                                <li><span className="icon">✓</span> Personalized recipe recommendations</li>
                                <li><span className="icon">✓</span> Priority support</li>
                                <li><span className="icon">✓</span> Exclusive chef content</li>
                            </ul>
                            <button className="plan-button plan-button-pro">Start Free Trial</button>
                        </div>

                        {/* <!-- Family Plan --> */}
                        <div className="plan-card">
                            <div className="plan-header">
                                <h3 className="plan-name">Family</h3>
                                <div className="plan-price">
                                    <span className="currency">$</span>
                                    <span className="amount">15</span>
                                    <span className="period">/month</span>
                                </div>
                            </div>
                            <ul className="plan-features">
                                <li><span className="icon">✓</span> Everything in Pro</li>
                                <li><span className="icon">✓</span> Up to 6 family members</li>
                                <li><span className="icon">✓</span> Kids' recipes</li>
                                <li><span className="icon">✓</span> Grocery list sharing</li>
                                <li><span className="icon">✓</span> Family meal planning</li>
                            </ul>
                            <button className="plan-button plan-button-family">Choose Family</button>
                        </div>
                    </div>
                </div>
            </section>

            {/* <!-- Comparison Table --> */}
            <section className="comparison-section">
                <div className="container">
                    <h2 className="section-title">Compare All Features</h2>
                    <div className="comparison-table-wrapper">
                        <table className="comparison-table">
                            <thead>
                                <tr>
                                    <th>Features</th>
                                    <th>Basic</th>
                                    <th>Pro</th>
                                    <th>Family</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Monthly Recipes</td>
                                    <td>100</td>
                                    <td>Unlimited</td>
                                    <td>Unlimited</td>
                                </tr>
                                <tr>
                                    <td>Meal Planning</td>
                                    <td>Basic</td>
                                    <td>Advanced</td>
                                    <td>Advanced</td>
                                </tr>
                                <tr>
                                    <td>Personalized Recipe Recommendations</td>
                                    <td>✗</td>
                                    <td>✓</td>
                                    <td>✓</td>
                                </tr>
                                <tr>
                                    <td>Priority Support</td>
                                    <td>✗</td>
                                    <td>✓</td>
                                    <td>✓</td>
                                </tr>
                                <tr>
                                    <td>Family Sharing</td>
                                    <td>✗</td>
                                    <td>✗</td>
                                    <td>Up to 6 members</td>
                                </tr>
                                <tr>
                                    <td>Exclusive Content</td>
                                    <td>✗</td>
                                    <td>✓</td>
                                    <td>✓</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* <!-- Feature Highlights --> */}
            <section className="features-section">
                <div className="container">
                    <h2 className="section-title">Why Go Premium?</h2>
                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon">🚀</div>
                            <h3>Faster Support</h3>
                            <p>Get priority support from our culinary experts within 24 hours</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">👨‍🍳</div>
                            <h3>Exclusive Recipes</h3>
                            <p>Access chef-curated recipes not available anywhere else</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">📅</div>
                            <h3>Smart Meal Planner</h3>
                            <p>AI-powered meal planning that adapts to your preferences</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">🛒</div>
                            <h3>Auto Shopping Lists</h3>
                            <p>Automatically generate grocery lists from your meal plans</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* <!-- Trust & Security --> */}
            <section className="trust-section">
                <div className="container">
                    <h2 className="section-title">Trusted by Thousands</h2>
                    <div className="trust-content">
                        <div className="trust-badges">
                            <div className="trust-badge">
                                <div className="trust-icon">🔒</div>
                                <div className="trust-text">
                                    <h4>Secure Payment</h4>
                                    <p>Powered by Razorpay</p>
                                </div>
                            </div>
                            <div className="trust-badge">
                                <div className="trust-icon">💰</div>
                                <div className="trust-text">
                                    <h4>Money-back Guarantee</h4>
                                    <p>30-day no questions asked</p>
                                </div>
                            </div>
                            <div className="trust-badge">
                                <div className="trust-icon">🚫</div>
                                <div className="trust-text">
                                    <h4>No Hidden Fees</h4>
                                    <p>What you see is what you pay</p>
                                </div>
                            </div>
                        </div>
                        <div className="testimonials">
                            <div className="testimonial">
                                <p>"ChefAssist Pro has completely transformed my cooking! The exclusive recipes are amazing."</p>
                                <div className="testimonial-author">
                                    <strong>Sarah Johnson</strong>
                                    <span>Home Chef</span>
                                </div>
                            </div>
                            <div className="testimonial">
                                <p>"The meal planning feature saves me hours every week. Best investment for my kitchen!"</p>
                                <div className="testimonial-author">
                                    <strong>Mike Chen</strong>
                                    <span>Food Blogger</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* <!-- FAQ Section --> */}
            <section className="faq-section">
                <div className="container">
                    <h2 className="section-title">Frequently Asked Questions</h2>
                    <div className="faq-list">
                        <div className="faq-item">
                            <button className="faq-question">
                                <span>How does the free trial work?</span>
                                <span className="faq-icon">+</span>
                            </button>
                            <div className="faq-answer">
                                <p>Your 14-day free trial gives you full access to all Pro features. No credit card required to start. You can cancel anytime during the trial period.</p>
                            </div>
                        </div>
                        <div className="faq-item">
                            <button className="faq-question">
                                <span>Can I cancel my subscription anytime?</span>
                                <span className="faq-icon">+</span>
                            </button>
                            <div className="faq-answer">
                                <p>Yes! You can cancel your subscription at any time from your account settings. You'll continue to have access until the end of your current billing period.</p>
                            </div>
                        </div>
                        <div className="faq-item">
                            <button className="faq-question">
                                <span>What payment methods do you accept?</span>
                                <span className="faq-icon">+</span>
                            </button>
                            <div className="faq-answer">
                                <p>We accept all major credit cards, debit cards, UPI, and net banking through our secure payment partner Razorpay.</p>
                            </div>
                        </div>
                        <div className="faq-item">
                            <button className="faq-question">
                                <span>Can I upgrade or downgrade my plan?</span>
                                <span className="faq-icon">+</span>
                            </button>
                            <div className="faq-answer">
                                <p>Absolutely! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate the billing accordingly.</p>
                            </div>
                        </div>
                        <div className="faq-item">
                            <button className="faq-question">
                                <span>Is my data secure?</span>
                                <span className="faq-icon">+</span>
                            </button>
                            <div className="faq-answer">
                                <p>Yes, we take security seriously. All data is encrypted and stored securely. We never share your personal information with third parties.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* <!-- Payment Modal --> */}
            <div className="modal-overlay" id="paymentModal">
                <div className="modal-content">
                    <div className="modal-header">
                        <h3>Complete Your Subscription</h3>
                        <button className="modal-close" id="closeModal">&times;</button>
                    </div>
                    <div className="modal-body">
                        <div className="plan-summary">
                            <h4 id="selectedPlan">Pro Plan</h4>
                            <p id="planPrice">$9/month</p>
                            <div className="coupon-section">
                                <input type="text" id="couponInput" placeholder="Enter coupon code" />
                                <button id="applyCoupon">Apply</button>
                            </div>
                        </div>
                        <form className="payment-form">
                            <div className="form-group">
                                <label for="cardNumber">Card Number</label>
                                <input type="text" id="cardNumber" placeholder="1234 5678 9012 3456" maxlength="19" />
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label for="expiry">Expiry Date</label>
                                    <input type="text" id="expiry" placeholder="MM/YY" maxlength="5" />
                                </div>
                                <div className="form-group">
                                    <label for="cvv">CVV</label>
                                    <input type="text" id="cvv" placeholder="123" maxlength="3" />
                                </div>
                            </div>
                            <div className="form-group">
                                <label for="cardName">Name on Card</label>
                                <input type="text" id="cardName" placeholder="John Doe" />
                            </div>
                            <button type="submit" className="payment-button">
                                <span>Subscribe Now</span>
                                <div className="payment-secure">
                                    <span>🔒 Powered by Razorpay</span>
                                </div>
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            <div className="sticky-cta">
                <button className="sticky-cta-button">
                    <span>Subscribe Now</span>
                    <span className="cta-arrow">→</span>
                </button>
            </div>
        </>
    )
}

export default Subscription