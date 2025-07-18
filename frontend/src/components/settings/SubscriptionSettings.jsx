import { CreditCard, Calendar } from 'lucide-react'

const SubscriptionSettings = () => {
    // Dummy data for the current plan
    const currentPlan = {
        name: "Pro Plan",
        price: "$9/month",
        nextBillingDate: "August 18, 2025",
        paymentMethod: "Visa ending in 1234"
    };

    return (
        <div className="space-y-8">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-[var(--color-chef-orange-dark)] dark:text-[var(--color-chef-orange-light)] mb-2">Current Plan</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">You are currently on the {currentPlan.name}.</p>

                <div className="bg-gradient-to-r from-[var(--color-chef-orange-light)] to-[var(--color-chef-orange)] p-6 rounded-xl text-white shadow-lg">
                    <div className="flex justify-between items-start">
                        <div>
                            <div className="text-sm opacity-80">PLAN</div>
                            <div className="text-2xl font-bold">{currentPlan.name}</div>
                        </div>
                        <div className="text-right">
                            <div className="text-sm opacity-80">PRICE</div>
                            <div className="text-2xl font-bold">{currentPlan.price}</div>
                        </div>
                    </div>
                    <div className="mt-6 text-sm">
                        Next billing date is on {currentPlan.nextBillingDate}.
                    </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-4">
                    <button className="bg-[var(--color-chef-orange)] text-white px-5 py-2 rounded-lg hover:bg-[var(--color-chef-orange-dark)] transition-colors font-semibold">Change Plan</button>
                    <button className="text-red-600 dark:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 px-5 py-2 rounded-lg transition-colors font-semibold">Cancel Subscription</button>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-[var(--color-chef-orange-dark)] dark:text-[var(--color-chef-orange-light)] mb-6">Billing Information</h2>
                <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                        <div className="flex items-center gap-3">
                            <CreditCard className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                            <div>
                                <h3 className="font-medium text-gray-900 dark:text-gray-100">Payment Method</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{currentPlan.paymentMethod}</p>
                            </div>
                        </div>
                        <button className="border border-gray-300 text-gray-700 dark:text-gray-300 dark:border-gray-600 px-4 py-2 rounded-lg hover:border-[var(--color-chef-orange)] hover:text-[var(--color-chef-orange)] transition-colors text-sm font-semibold">Update</button>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                        <div className="flex items-center gap-3">
                            <Calendar className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                            <div>
                                <h3 className="font-medium text-gray-900 dark:text-gray-100">Billing History</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">View and download your past invoices.</p>
                            </div>
                        </div>
                        <button className="border border-gray-300 text-gray-700 dark:text-gray-300 dark:border-gray-600 px-4 py-2 rounded-lg hover:border-[var(--color-chef-orange)] hover:text-[var(--color-chef-orange)] transition-colors text-sm font-semibold">View History</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SubscriptionSettings