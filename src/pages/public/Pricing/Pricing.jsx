import React, { useState } from 'react';
import { Users, Calendar, Check, AlertCircle } from 'lucide-react';
import { usePricingPlans } from '@/hooks/usePricingPlans';
import { useUserPricingPlans } from '@/hooks/useUserPricingPlans';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/auth.store';


function Pricing() {
    const { pricingPlans, isLoadingPricingPlans } = usePricingPlans();
    const { createUserPricingPlan, isCreating } = useUserPricingPlans();
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const navigate = useNavigate();
    const dots = Array.from({ length: 16 });
    
    // Function to handle plan purchase
    const handlePurchasePlan = (planId, price) => {
        if (!isAuthenticated) {
            // Redirect to login if not logged in
            navigate('/login', { state: { returnUrl: '/pricing' } });
            return;
        }

        // Create user pricing plan
        createUserPricingPlan({
            pricing_plan_id: planId,
            paid_amount: price
        });
    };

    // Function to render features based on plan properties
    const getPlanFeatures = (plan) => {
        const features = [];
        
        // Add standard features based on plan data
        features.push(`${plan.allowed_courses} Course(s)`);
        features.push(`${plan.duration_days} Days`);
        
        // Add additional features from description if available
        if (plan.description) {
            const descriptionFeatures = plan.description.split(',').map(item => item.trim());
            features.push(...descriptionFeatures);
        }
        
        return features;
    };

    return (
        <div className="relative overflow-hidden">
            {/* Header Section with curved bottom */}
            <section className="bg-blue-900 text-white rounded-b-[40%] pb-64 pt-16 px-6 relative">
                <h2 className="text-3xl font-bold mb-8 text-center">
                    Our <span className="text-orange-400">Pricing</span>
                </h2>

                {/* Left decorative dots */}
                <div className="absolute left-6 top-1/3">
                    <div className="grid grid-cols-4 gap-1">
                        {dots.map((_, i) => (
                            <div key={`left-dot-${i}`} className="w-1.5 h-1.5 bg-orange-400 rounded-full"></div>
                        ))}
                    </div>
                </div>

                {/* Right decorative dots */}
                <div className="absolute right-6 top-1/3">
                    <div className="grid grid-cols-4 gap-1">
                        {dots.map((_, i) => (
                            <div key={`right-dot-${i}`} className="w-1.5 h-1.5 bg-orange-400 rounded-full"></div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Cards Container - positioned to overlap the curved section */}
            <div className="max-w-6xl mx-auto px-4 -mt-48 relative z-10">
                {isLoadingPricingPlans ? (
                    <div className="flex justify-center items-center">
                        <div className="bg-white p-8 rounded-lg shadow-lg">
                            <div className="flex items-center space-x-2">
                                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-orange-400"></div>
                                <p className="text-gray-700">Loading pricing plans...</p>
                            </div>
                        </div>
                    </div>
                ) : pricingPlans && pricingPlans.length > 0 ? (
                    <div className="flex flex-col md:flex-row justify-center items-center gap-8">
                        {pricingPlans.filter(plan => plan.is_active).map((plan) => (
                            <PricingCard 
                                key={plan.id}
                                planId={plan.id}
                                title={plan.name}
                                price={plan.price}
                                features={getPlanFeatures(plan)}
                                onPurchase={handlePurchasePlan}
                                isProcessing={isCreating}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="flex justify-center items-center">
                        <div className="bg-white p-8 rounded-lg shadow-lg">
                            <div className="flex items-center space-x-2 text-gray-700">
                                <AlertCircle size={24} className="text-orange-400" />
                                <p>No pricing plans available at the moment.</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            
            {/* Spacer to ensure proper layout below cards */}
            <div className="mt-24"></div>
        </div>
    );
}

function PricingCard({ planId, title, price, features, onPurchase, isProcessing }) {
    // Function to get the appropriate icon for a feature
    const getFeatureIcon = (feature, index) => {
        if (feature.toLowerCase().includes('course')) return <Users size={20} className="text-gray-500" />;
        if (feature.toLowerCase().includes('day')) return <Calendar size={20} className="text-gray-500" />;
        return <Check size={20} className="text-gray-500" />;
    };

    return (
        <div className="w-full max-w-sm rounded-3xl shadow-lg">
            {/* Top orange section */}
            <div className="bg-orange-400 p-6 pb-10 relative rounded-t-3xl">
                {/* White header box */}
                <div className="bg-white rounded-xl px-6 py-2 shadow-md -mt-10 mx-auto w-fit">
                    <h2 className="text-orange-400 text-lg font-medium">{title}</h2>
                </div>

                {/* Price section */}
                <div className="text-center mt-8 text-white">
                    <h1 className="text-4xl font-bold">₹ {price} <span className="text-lg font-normal">+ Tax</span></h1>
                    <p className="text-sm mt-1">(Exclusive of GST & Taxes)</p>
                </div>
            </div>

            {/* Bottom white section */}
            <div className="bg-white p-6 rounded-b-3xl">
                {/* Features list */}
                <div className="space-y-4">
                    {features.map((feature, index) => (
                        <div key={index} className="flex items-center">
                            <div className="bg-gray-100 p-2 rounded-full mr-3">
                                {getFeatureIcon(feature, index)}
                            </div>
                            <span className="text-gray-600">{feature}</span>
                        </div>
                    ))}
                </div>

                {/* Button */}
                <div className="mt-6">
                    <button 
                        className="w-full border-2 border-orange-400 text-orange-400 py-2 px-4 rounded-lg font-medium transition-colors hover:bg-orange-500 hover:text-white hover:border-orange-500 flex justify-center items-center"
                        onClick={() => onPurchase(planId, price)}
                        disabled={isProcessing}
                    >
                        {isProcessing ? (
                            <>
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
                                Processing...
                            </>
                        ) : (
                            'Choose Plan'
                        )}
                    </button>
                </div>

                {/* Razorpay logo */}
                <div className="text-center mt-4">
                    <div className="inline-flex items-center">
                        <span className="text-blue-900 font-bold">Razorpay</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Pricing;