import React,{useEffect} from 'react';

function Feedback() {
    useEffect(() => {
      document.title = 'Feedback / ChefAssist';
    }, []);
  return (
    <div className="flex items-center justify-center min-h-screen bg-[var(--color-chef-cream)] p-4">
  <div className="w-full max-w-md p-6 rounded-2xl shadow-xl bg-white border border-[var(--color-chef-peach)] space-y-5">
    <h2 className="text-2xl font-semibold text-[var(--color-chef-orange-dark)] text-center">
      Your Feedback Matters
    </h2>
    <p className="text-sm text-gray-600 text-center">
      Help us improve ChefAssist in less than a minute.
    </p>

    <div>
      <label className="block text-[var(--color-chef-orange-dark)] font-medium mb-2">How was your overall experience?</label>
      <div className="flex justify-between text-2xl">
        {['😠','😞','😐','😊','😍'].map((emoji, index) => (
          <button key={index} className="hover:scale-110 transition">{emoji}</button>
        ))}
      </div>
    </div>

    <div>
      <label className="block text-[var(--color-chef-orange-dark)] font-medium mb-2">What did you think?</label>
      <div className="flex flex-wrap gap-2">
        {[
          'Easy to follow recipe',
          'Loved the UI',
          'Accurate ingredient suggestions',
          'Useful nutritional info',
          'Time-saving tips',
          'Customizable portions',
          'Loved cooking with AI!'
        ].map((tag, index) => (
          <span
            key={index}
            className="px-3 py-1 rounded-full text-sm cursor-pointer bg-[var(--color-chef-peach)] text-[var(--color-chef-orange-dark)] hover:bg-[var(--color-chef-orange-light)] transition"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>

    <div>
      <label className="block text-[var(--color-chef-orange-dark)] font-medium mb-2">What could we improve?</label>
      <textarea
        placeholder="One small suggestion, maybe..."
        className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-chef-orange-light)]"
        rows="3"
      ></textarea>
    </div>

    <div>
      <p className="text-sm text-gray-500 text-center">Submit feedback for a chance to win a free recipe eBook!</p>
      <button className="w-full mt-3 bg-[var(--color-chef-orange)] text-white font-semibold py-2 px-4 rounded-lg hover:bg-[var(--color-chef-orange-dark)] transition">
        Submit Feedback
      </button>
      <button className="w-full mt-2 text-[var(--color-chef-orange-dark)] underline text-sm hover:text-[var(--color-chef-orange)]">
        Skip
      </button>
    </div>
  </div>
</div>



  )
}

export default Feedback;
