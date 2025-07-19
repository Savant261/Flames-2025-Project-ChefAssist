import React,{useEffect} from 'react'

const Subscription = () => {
   useEffect(() => {
      document.title = 'Subscription / ChefAssit';
    }, []);
    return (
        <>
                  <section className="bg-gradient-to-br from-orange-600 to-orange-300 min-h-[60vh] flex items-center relative overflow-hidden animate-section-fade-in">
  <div className="absolute inset-0 pointer-events-none">
    {/* Animated SVG background blobs */}
    <svg className="w-full h-full animate-bg-blob" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
      <circle cx="20" cy="20" r="2" fill="rgba(255,255,255,0.1)" />
      <circle cx="80" cy="40" r="1.5" fill="rgba(255,255,255,0.1)" />
      <circle cx="40" cy="80" r="1" fill="rgba(255,255,255,0.1)" />
    </svg>
  </div>
  <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center relative z-10">
    <div className="animate-fade-in-up">
      <h1 className="text-white text-4xl md:text-6xl font-bold mb-4 drop-shadow-md animate-pop-in">Unlock Premium Cooking Experiences!</h1>
      <p className="text-yellow-100 text-lg mb-6 animate-fade-in-up delay-200">Join thousands of home chefs who've elevated their cooking with ChefAssist Premium</p>
      <div className="flex gap-8 animate-fade-in-up delay-400">
        <div className="text-center">
          <span className="text-2xl font-bold text-white block">10,000+</span>
          <span className="text-sm text-yellow-100">Premium Recipes</span>
        </div>
        <div className="text-center">
          <span className="text-2xl font-bold text-white block">50,000+</span>
          <span className="text-sm text-yellow-100">Happy Chefs</span>
        </div>
        <div className="text-center">
          <span className="text-2xl font-bold text-white block">4.9★</span>
          <span className="text-sm text-yellow-100">Average Rating</span>
        </div>
      </div>
    </div>
    <div className="relative h-[300px] animate-fade-in-up delay-600">
      <div className="absolute top-[20%] left-[20%] text-5xl animate-floating delay-0">👨‍🍳</div>
      <div className="absolute top-[60%] right-[30%] text-5xl animate-floating delay-1000">🍴</div>
      <div className="absolute bottom-[20%] left-[40%] text-5xl animate-floating delay-2000">🍝</div>
    </div>
  </div>
</section>

            {/* <!-- Plan Cards --> */}
            <section className="py-20 bg-white">
  <div className="max-w-7xl mx-auto px-4">
    <h2 className="text-4xl font-semibold text-center text-gray-800 mb-12 relative after:absolute after:bottom-[-10px] after:left-1/2 after:translate-x-[-50%] after:w-16 after:h-[3px] after:bg-gradient-to-r after:from-orange-500 after:to-yellow-400 after:rounded"></h2>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
      {/* Basic Plan */}
      <div className="bg-white rounded-2xl p-8 shadow-md hover:-translate-y-2 transition border-2 border-transparent animate-card-pop-in">
        <div className="text-center mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Basic</h3>
          <div className="flex justify-center items-baseline space-x-1">
            <span className="text-lg font-medium text-orange-500">$</span>
            <span className="text-4xl font-bold text-orange-500">0</span>
            <span className="text-sm text-gray-600">/month</span>
          </div>
        </div>
        <ul className="mb-6 space-y-3 text-gray-700">
          <li className="flex items-center gap-2"><span>✓</span>100 recipes per month</li>
          <li className="flex items-center gap-2"><span>✓</span>Basic meal planning</li>
          <li className="flex items-center gap-2"><span>✓</span>Community access</li>
          <li className="flex items-center gap-2 text-red-500"><span>✗</span>Personalized recipe recommendations</li>
          <li className="flex items-center gap-2 text-red-500"><span>✗</span>Family sharing</li>
        </ul>
        <button className="w-full py-3 rounded-lg font-semibold border-2 border-gray-200 text-gray-800 hover:bg-gray-100 transition">Get Started</button>
      </div>

      {/* Pro Plan - Most Popular */}
      <div className="bg-gradient-to-br from-yellow-50 to-white rounded-2xl p-8 shadow-lg transform scale-105 border-2 border-orange-500 relative hover:-translate-y-2 transition animate-card-pop-in delay-200">
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-orange-500 to-yellow-400 text-white text-sm font-semibold px-6 py-2 rounded-full shadow-md">Most Popular</div>
        <div className="text-center mb-6 mt-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Pro</h3>
          <div className="flex justify-center items-baseline space-x-1">
            <span className="text-lg font-medium text-orange-500">$</span>
            <span className="text-4xl font-bold text-orange-500">9</span>
            <span className="text-sm text-gray-600">/month</span>
          </div>
          <div className="text-green-600 font-medium text-sm mt-2">Save 20% annually</div>
        </div>
        <ul className="mb-6 space-y-3 text-gray-700">
          <li className="flex items-center gap-2"><span>✓</span>Unlimited recipes</li>
          <li className="flex items-center gap-2"><span>✓</span>Advanced meal planning</li>
          <li className="flex items-center gap-2"><span>✓</span>Personalized recipe recommendations</li>
          <li className="flex items-center gap-2"><span>✓</span>Priority support</li>
          <li className="flex items-center gap-2"><span>✓</span>Exclusive chef content</li>
        </ul>
        <button className="w-full py-3 rounded-lg font-semibold bg-gradient-to-r from-orange-500 to-yellow-400 text-white shadow-md hover:shadow-lg transition">Start Free Trial</button>
      </div>

      {/* Family Plan */}
      <div className="bg-white rounded-2xl p-8 shadow-md hover:-translate-y-2 transition border-2 border-transparent animate-card-pop-in delay-400">
        <div className="text-center mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Family</h3>
          <div className="flex justify-center items-baseline space-x-1">
            <span className="text-lg font-medium text-orange-500">$</span>
            <span className="text-4xl font-bold text-orange-500">15</span>
            <span className="text-sm text-gray-600">/month</span>
          </div>
        </div>
        <ul className="mb-6 space-y-3 text-gray-700">
          <li className="flex items-center gap-2"><span>✓</span>Everything in Pro</li>
          <li className="flex items-center gap-2"><span>✓</span>Up to 6 family members</li>
          <li className="flex items-center gap-2"><span>✓</span>Kids' recipes</li>
          <li className="flex items-center gap-2"><span>✓</span>Grocery list sharing</li>
          <li className="flex items-center gap-2"><span>✓</span>Family meal planning</li>
        </ul>
        <button className="w-full py-3 rounded-lg font-semibold bg-gradient-to-r from-gray-600 to-gray-800 text-white hover:shadow-md transition">Choose Family</button>
      </div>
    </div>
  </div>
</section>


            {/* <!-- Comparison Table --> */}
<section className="py-20 bg-white animate-section-fade-in delay-600">
  <div className="max-w-7xl mx-auto px-4">
    <div className="overflow-x-auto rounded-xl shadow-md">
      <table className="w-full text-center text-sm border-collapse bg-white">
        <thead>
          <tr className="bg-gradient-to-r from-orange-500 to-yellow-400 text-white text-base font-semibold">
            <th className="text-left px-6 py-4">Features</th>
            <th className="px-6 py-4">Basic</th>
            <th className="px-6 py-4">Pro</th>
            <th className="px-6 py-4">Family</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          <tr className="border-b">
            <td className="text-left px-6 py-4 font-medium">Recipe Limit</td>
            <td className="px-6 py-4">100/month</td>
            <td className="px-6 py-4">Unlimited</td>
            <td className="px-6 py-4">Unlimited</td>
          </tr>
          <tr className="border-b">
            <td className="text-left px-6 py-4 font-medium">Meal Planner</td>
            <td className="px-6 py-4 text-green-600 font-semibold">✓</td>
            <td className="px-6 py-4 text-green-600 font-semibold">✓</td>
            <td className="px-6 py-4 text-green-600 font-semibold">✓</td>
          </tr>
          <tr className="border-b">
            <td className="text-left px-6 py-4 font-medium">Personalized Suggestions</td>
            <td className="px-6 py-4 text-red-500 font-semibold">✗</td>
            <td className="px-6 py-4 text-green-600 font-semibold">✓</td>
            <td className="px-6 py-4 text-green-600 font-semibold">✓</td>
          </tr>
          <tr className="border-b">
            <td className="text-left px-6 py-4 font-medium">Family Sharing</td>
            <td className="px-6 py-4 text-red-500 font-semibold">✗</td>
            <td className="px-6 py-4 text-red-500 font-semibold">✗</td>
            <td className="px-6 py-4 text-green-600 font-semibold">✓</td>
          </tr>
          <tr className="border-b">
            <td className="text-left px-6 py-4 font-medium">Grocery List</td>
            <td className="px-6 py-4 text-red-500 font-semibold">✗</td>
            <td className="px-6 py-4 text-green-600 font-semibold">✓</td>
            <td className="px-6 py-4 text-green-600 font-semibold">✓</td>
          </tr>
          <tr>
            <td className="text-left px-6 py-4 font-medium">Exclusive Content</td>
            <td className="px-6 py-4 text-red-500 font-semibold">✗</td>
            <td className="px-6 py-4 text-green-600 font-semibold">✓</td>
            <td className="px-6 py-4 text-green-600 font-semibold">✓</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</section>


            {/* <!-- Feature Highlights --> */}
            <section className="py-20 bg-yellow-100 animate-section-fade-in delay-800">
  <div className="max-w-7xl mx-auto px-4">
    <h2 className="text-center text-4xl font-semibold text-gray-800 mb-12 relative after:content-[''] after:absolute after:-bottom-2 after:left-1/2 after:-translate-x-1/2 after:w-16 after:h-1 after:bg-gradient-to-r from-orange-500 to-yellow-400 after:rounded"></h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-12">
      <div className="bg-white p-8 rounded-xl text-center shadow-md hover:shadow-xl transition-transform duration-300 hover:-translate-y-1">
        <div className="text-4xl mb-5 text-orange-500">🍽️</div>
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Smart Meal Planning</h3>
        <p className="text-gray-600 leading-relaxed">
          Automatically generate weekly meal plans that match your dietary preferences and health goals.
        </p>
      </div>

      <div className="bg-white p-8 rounded-xl text-center shadow-md hover:shadow-xl transition-transform duration-300 hover:-translate-y-1">
        <div className="text-4xl mb-5 text-orange-500">🛒</div>
        <h3 className="text-lg font-semibold text-gray-800 mb-3">One-Click Grocery List</h3>
        <p className="text-gray-600 leading-relaxed">
          Instantly turn your selected meals into a categorized grocery list, ready for shopping.
        </p>
      </div>

      <div className="bg-white p-8 rounded-xl text-center shadow-md hover:shadow-xl transition-transform duration-300 hover:-translate-y-1">
        <div className="text-4xl mb-5 text-orange-500">💡</div>
        <h3 className="text-lg font-semibold text-gray-800 mb-3">AI-Powered Suggestions</h3>
        <p className="text-gray-600 leading-relaxed">
          Discover new recipes based on your past preferences and what's in your pantry.
        </p>
      </div>

      <div className="bg-white p-8 rounded-xl text-center shadow-md hover:shadow-xl transition-transform duration-300 hover:-translate-y-1">
        <div className="text-4xl mb-5 text-orange-500">👨‍👩‍👧‍👦</div>
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Family Profiles</h3>
        <p className="text-gray-600 leading-relaxed">
          Personalize meals for each family member based on allergies, dislikes, or goals.
        </p>
      </div>

      <div className="bg-white p-8 rounded-xl text-center shadow-md hover:shadow-xl transition-transform duration-300 hover:-translate-y-1">
        <div className="text-4xl mb-5 text-orange-500">📅</div>
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Calendar Sync</h3>
        <p className="text-gray-600 leading-relaxed">
          Sync your meal plans with your Google or Apple calendar for easy access and reminders.
        </p>
      </div>

      <div className="bg-white p-8 rounded-xl text-center shadow-md hover:shadow-xl transition-transform duration-300 hover:-translate-y-1">
        <div className="text-4xl mb-5 text-orange-500">📱</div>
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Mobile Friendly</h3>
        <p className="text-gray-600 leading-relaxed">
          Access all your plans, lists, and recipes from any device with a seamless mobile experience.
        </p>
      </div>
    </div>
  </div>
</section>


            {/* <!-- Trust & Security --> */}
            <section className="py-20 bg-white animate-section-fade-in delay-1000">
  <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
    
    {/* Trust Badges */}
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4 p-5 bg-gray-100 rounded-xl border-l-4 border-orange-500">
        <div className="text-3xl text-orange-500">🔒</div>
        <div>
          <h4 className="text-gray-800 font-semibold mb-1">Secure Payments</h4>
          <p className="text-sm text-gray-600">Your data is encrypted and transactions are safe with us.</p>
        </div>
      </div>

      <div className="flex items-center gap-4 p-5 bg-gray-100 rounded-xl border-l-4 border-orange-500">
        <div className="text-3xl text-orange-500">✅</div>
        <div>
          <h4 className="text-gray-800 font-semibold mb-1">Trusted by Thousands</h4>
          <p className="text-sm text-gray-600">Over 50,000 users rely on us for daily meal planning.</p>
        </div>
      </div>

      <div className="flex items-center gap-4 p-5 bg-gray-100 rounded-xl border-l-4 border-orange-500">
        <div className="text-3xl text-orange-500">⚡</div>
        <div>
          <h4 className="text-gray-800 font-semibold mb-1">Fast & Reliable</h4>
          <p className="text-sm text-gray-600">Enjoy blazing fast responses powered by AI and cloud tech.</p>
        </div>
      </div>
    </div>

    {/* Testimonials */}
    <div className="flex flex-col gap-8">
      <div className="bg-yellow-100 p-6 rounded-xl relative">
        <span className="absolute text-6xl top-0 left-4 text-yellow-400 font-serif select-none">“</span>
        <p className="text-gray-800 italic mb-4">This platform made meal planning so simple. I save hours every week and eat healthier too!</p>
        <div className="text-sm text-gray-700">
          <strong className="text-orange-500">Aarav M.</strong> <span>– Fitness Coach</span>
        </div>
      </div>

      <div className="bg-yellow-100 p-6 rounded-xl relative">
        <span className="absolute text-6xl top-0 left-4 text-yellow-400 font-serif select-none">“</span>
        <p className="text-gray-800 italic mb-4">I love the intuitive design and the way it adapts to my family’s tastes. Highly recommend!</p>
        <div className="text-sm text-gray-700">
          <strong className="text-orange-500">Sneha R.</strong> <span>– Mom of 3</span>
        </div>
      </div>
    </div>
  </div>
</section>


            {/* <!-- FAQ Section --> */}
            <section className="py-20 bg-gray-100 animate-section-fade-in delay-1200">
  <div className="max-w-4xl mx-auto px-4">
    <h2 className="text-3xl font-semibold text-center text-gray-800 mb-12 relative inline-block after:content-[''] after:block after:w-16 after:h-1 after:mx-auto after:mt-2 after:bg-gradient-to-r after:from-orange-500 after:to-yellow-400"></h2>
    <div className="space-y-4">
      {[
        {
          q: "How does the free trial work?",
          a: "Your 14-day free trial gives you full access to all Pro features. No credit card required to start. You can cancel anytime during the trial period."
        },
        {
          q: "Can I cancel my subscription anytime?",
          a: "Yes! You can cancel your subscription at any time from your account settings. You'll continue to have access until the end of your current billing period."
        },
        {
          q: "What payment methods do you accept?",
          a: "We accept all major credit cards, debit cards, UPI, and net banking through our secure payment partner Razorpay."
        },
        {
          q: "Can I upgrade or downgrade my plan?",
          a: "Absolutely! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate the billing accordingly."
        },
        {
          q: "Is my data secure?",
          a: "Yes, we take security seriously. All data is encrypted and stored securely. We never share your personal information with third parties."
        }
      ].map((item, i) => (
        <div key={i} className="bg-white rounded-lg shadow animate-fade-in-up">
          <button className="w-full flex justify-between items-center px-6 py-4 text-left text-lg font-medium text-gray-800 hover:bg-gray-50 transition group" onClick={() => {
            const answer = document.getElementById(`faq-answer-${i}`);
            if (answer) answer.classList.toggle('faq-open');
          }}>
            <span>{item.q}</span>
            <span className="text-orange-500 text-xl group-hover:rotate-90 transition-transform duration-300">+</span>
          </button>
          <div id={`faq-answer-${i}`} className="px-6 pb-4 text-gray-600 faq-answer transition-all duration-500 max-h-0 overflow-hidden">
            <p>{item.a}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

            {/* <!-- Payment Modal --> */}
           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000] opacity-0 invisible transition-all duration-300 ease-in-out animate-modal-fade-in" id="paymentModal">
  <div className="bg-white w-[90%] max-w-lg rounded-2xl overflow-hidden shadow-2xl transform scale-90 transition-transform duration-300 ease-in-out animate-modal-pop-in">
    <div className="bg-gradient-to-r from-orange-500 to-yellow-400 text-white px-6 py-4 flex items-center justify-between">
      <h3 className="text-xl font-semibold">Complete Your Subscription</h3>
      <button id="closeModal" className="text-2xl leading-none">&times;</button>
    </div>
    <div className="p-6 space-y-6">
      <div className="bg-yellow-100 p-4 rounded-xl space-y-2">
        <h4 id="selectedPlan" className="text-orange-600 font-semibold text-lg">Pro Plan</h4>
        <p id="planPrice" className="text-gray-800 text-base font-medium">$9/month</p>
        <div className="flex gap-2 mt-3">
          <input
            type="text"
            id="couponInput"
            placeholder="Enter coupon code"
            className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <button
            id="applyCoupon"
            className="bg-orange-500 text-white rounded-md px-4 py-2 text-sm font-medium hover:bg-orange-600"
          >
            Apply
          </button>
        </div>
      </div>

      <form className="space-y-5">
        <div className="space-y-2">
          <label htmlFor="cardNumber" className="text-gray-700 font-medium">Card Number</label>
          <input
            type="text"
            id="cardNumber"
            placeholder="1234 5678 9012 3456"
            maxLength="19"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="expiry" className="text-gray-700 font-medium">Expiry Date</label>
            <input
              type="text"
              id="expiry"
              placeholder="MM/YY"
              maxLength="5"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="cvv" className="text-gray-700 font-medium">CVV</label>
            <input
              type="text"
              id="cvv"
              placeholder="123"
              maxLength="3"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="cardName" className="text-gray-700 font-medium">Name on Card</label>
          <input
            type="text"
            id="cardName"
            placeholder="John Doe"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-orange-500 to-yellow-400 text-white font-semibold py-3 rounded-lg hover:shadow-lg transition transform hover:-translate-y-1"
        >
          <span>Subscribe Now</span>
          <div className="text-xs opacity-80 mt-1">🔒 Powered by Razorpay</div>
        </button>
      </form>
    </div>
  </div>
</div>
            {/* <!-- Sticky CTA Button --> */}

            <div className="fixed bottom-5 right-5 z-[100] block md:hidden animate-fade-in-up">
  <button
    className="bg-gradient-to-r from-orange-500 to-yellow-400 text-white font-semibold py-3 px-6 rounded-full flex items-center gap-2 shadow-lg hover:-translate-y-1 transition-all duration-300 animate-bounce"
  >
    <span>Get Started</span>
    <span className="text-xl transform transition-transform duration-300 group-hover:translate-x-1">→</span>
  </button>
</div>

            {/* Animation Styles */}
<style dangerouslySetInnerHTML={{__html: `
  .animate-section-fade-in { animation: sectionFadeIn 1s ease-out; }
  @keyframes sectionFadeIn { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
  .animate-fade-in-up { animation: fadeInUp 0.8s ease-out; }
  @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
  .animate-pop-in { animation: popIn 0.7s cubic-bezier(.17,.67,.83,.67); }
  @keyframes popIn { 0% { transform: scale(0.95); opacity: 0; } 80% { transform: scale(1.05); opacity: 1; } 100% { transform: scale(1); } }
  .animate-card-pop-in { animation: cardPopIn 0.7s cubic-bezier(.17,.67,.83,.67); }
  @keyframes cardPopIn { 0% { transform: scale(0.95); opacity: 0; } 80% { transform: scale(1.05); opacity: 1; } 100% { transform: scale(1); } }
  .animate-bg-blob { animation: bgBlobMove 12s infinite alternate ease-in-out; }
  @keyframes bgBlobMove { 0% { transform: scale(1) translateY(0); } 50% { transform: scale(1.1) translateY(20px); } 100% { transform: scale(1) translateY(0); } }
  .animate-floating { animation: floatingIcon 3s infinite alternate ease-in-out; }
  @keyframes floatingIcon { 0% { transform: translateY(0); } 100% { transform: translateY(-18px); } }
  .animate-bounce { animation: bounceBtn 1.2s infinite alternate; }
  @keyframes bounceBtn { 0% { transform: translateY(0); } 100% { transform: translateY(-8px); } }
  .animate-modal-fade-in { animation: modalFadeIn 0.7s ease; }
  @keyframes modalFadeIn { from { opacity: 0; } to { opacity: 1; } }
  .animate-modal-pop-in { animation: modalPopIn 0.7s cubic-bezier(.17,.67,.83,.67); }
  @keyframes modalPopIn { 0% { transform: scale(0.95); opacity: 0; } 80% { transform: scale(1.05); opacity: 1; } 100% { transform: scale(1); } }
  .faq-answer { max-height: 0; opacity: 0; transition: max-height 0.5s, opacity 0.5s; }
  .faq-open { max-height: 200px; opacity: 1; }
`}} />
        </>
    )
}

export default Subscription