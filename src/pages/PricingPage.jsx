import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { Check, ShieldCheck, Heart, Zap, Award } from 'lucide-react';

export default function PricingPage() {
  const { currentUser, updatePlan } = useContext(AppContext);
  const [billingPeriod, setBillingPeriod] = useState('monthly'); // 'monthly' or 'annual'

  const talentPlans = [
    {
      name: 'Free',
      price: 0,
      description: 'Test the waters, share your initial voice.',
      icon: <Heart className="text-neutral-500" size={24} />,
      features: [
        '1 submission per month',
        'Basic public artist profile',
        'Standard review queue routing',
        'Community forum access',
      ],
      popular: false,
    },
    {
      name: 'Rising Star',
      price: 99,
      description: 'For committed students refining their craft.',
      icon: <Zap className="text-saffron" size={24} />,
      features: [
        '5 submissions per month',
        'Priority review queue (under 7 days)',
        'Choose specific mentors for review',
        'Detailed audio pitch/tempo feedback',
        'Ad-free profile page',
      ],
      popular: true,
    },
    {
      name: 'Pro Artist',
      price: 249,
      description: 'For prolific creators preparing for professional release.',
      icon: <Award className="text-gold" size={24} />,
      features: [
        'Unlimited submissions',
        'Express review (under 72 hours)',
        'Direct chat messages with mentors',
        'Featured artist spotlight on Explore page',
        'Exclusive Masterclass invitations',
      ],
      popular: false,
    },
  ];

  const guruPlans = [
    {
      name: 'Verified Guru',
      price: 199,
      description: 'Contribute to the culture and review submissions.',
      icon: <ShieldCheck className="text-saffron" size={24} />,
      features: [
        'Official Mudra verified profile badge',
        'Review up to 10 submissions per month',
        'Detailed analytics of mentee progress',
        'Set custom review schedules',
      ],
      popular: false,
    },
    {
      name: 'Master',
      price: 499,
      description: 'Build an academy, mentor unlimited talents, earn payouts.',
      icon: <Award className="text-gold" size={24} />,
      features: [
        'Unlimited review capacity',
        'Priority listing on mentor search results',
        'Earn commission from premium student reviews',
        'Host group masterclasses directly on SANGAM',
        'Custom billing & dashboard branding',
      ],
      popular: true,
    },
  ];

  const getPriceDisplay = (basePrice) => {
    if (basePrice === 0) return '₹0';
    const finalPrice = billingPeriod === 'annual' ? Math.floor(basePrice * 0.8 * 12) : basePrice;
    return `₹${finalPrice}`;
  };

  const handleSelectPlan = (role, planName) => {
    updatePlan(role, planName);
    alert(`Shubhaarambh! Plan successfully updated to ${planName} (${billingPeriod}).`);
  };

  return (
    <div className="bg-dark-paper-texture min-h-screen py-16 px-4 fade-in-up">
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="font-display text-4xl md:text-5xl text-cream font-bold mb-4">Choose Your Sadhana Plan</h1>
        <p className="text-base text-cream-dark font-poetic max-w-2xl mx-auto leading-relaxed">
          Support classical arts conservation. Whether you are polishing your metrical lines or grading the next generation, we have a plan suited for your journey.
        </p>

        {/* Toggle Billing Period */}
        <div className="inline-flex items-center gap-3 bg-ink-light border border-brown-light/30 rounded-full p-1.5 mt-8">
          <button
            onClick={() => setBillingPeriod('monthly')}
            className={`px-6 py-2 rounded-full font-sans text-xs md:text-sm font-semibold transition-all ${
              billingPeriod === 'monthly'
                ? 'bg-saffron text-cream shadow-md shadow-saffron/20'
                : 'text-cream-dark hover:text-cream'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingPeriod('annual')}
            className={`px-6 py-2 rounded-full font-sans text-xs md:text-sm font-semibold transition-all flex items-center gap-1.5 ${
              billingPeriod === 'annual'
                ? 'bg-saffron text-cream shadow-md shadow-saffron/20'
                : 'text-cream-dark hover:text-cream'
            }`}
          >
            Annual <span className="bg-gold/20 text-gold text-[10px] font-bold px-2 py-0.5 rounded-full border border-gold/30">Save 20%</span>
          </button>
        </div>
      </div>

      {/* Plans Split Section */}
      <div className="max-w-6xl mx-auto flex flex-col gap-16">
        {/* SECTION 1: YOUNG TALENT PLANS */}
        <div>
          <div className="flex items-center gap-3 mb-8 border-b border-brown-light/10 pb-4">
            <span className="font-devanagari text-2xl text-saffron">कलाकार</span>
            <h2 className="font-display text-2xl text-gold-light font-bold">Young Talent Plans</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {talentPlans.map((plan) => {
              const isCurrent = currentUser && currentUser.plan === plan.name;
              return (
                <div
                  key={plan.name}
                  className={`bg-ink-light border rounded-2xl p-6 shadow-xl flex flex-col justify-between relative transition-all duration-300 ${
                    plan.popular
                      ? 'border-saffron shadow-saffron/5 md:-translate-y-2'
                      : 'border-brown-light/20 hover:border-gold/30'
                  }`}
                >
                  {plan.popular && (
                    <span className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 bg-saffron text-cream text-[10px] font-bold tracking-wider uppercase px-3 py-1 rounded-full border border-saffron-light/30">
                      Most Popular
                    </span>
                  )}

                  <div>
                    {/* Header */}
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-display text-2xl text-cream font-bold">{plan.name}</h3>
                        <p className="text-xs text-cream-dark mt-1 font-sans leading-normal h-8">{plan.description}</p>
                      </div>
                      <div className="p-2 rounded-xl bg-ink/60 border border-brown-light/10">{plan.icon}</div>
                    </div>

                    {/* Price */}
                    <div className="my-6">
                      <span className="font-display text-4xl text-gold-light font-bold">
                        {getPriceDisplay(plan.price)}
                      </span>
                      {plan.price > 0 && (
                        <span className="text-xs text-cream-dark font-sans ml-1">
                          / {billingPeriod === 'annual' ? 'yr' : 'mo'}
                        </span>
                      )}
                    </div>

                    {/* Features list */}
                    <ul className="space-y-3 mb-8 text-xs md:text-sm text-cream-dark border-t border-brown-light/10 pt-5">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <Check size={16} className="text-saffron shrink-0 mt-0.5" />
                          <span className="font-poetic">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA button */}
                  <button
                    onClick={() => handleSelectPlan('talent', plan.name)}
                    className={`w-full py-3 rounded-xl font-sans text-xs md:text-sm font-bold tracking-wide transition-all active:scale-98 ${
                      isCurrent
                        ? 'bg-neutral-800 text-neutral-400 border border-neutral-700 cursor-default'
                        : plan.popular
                        ? 'bg-saffron hover:bg-saffron-light text-cream shadow-md shadow-saffron/20 border border-saffron-light/20'
                        : 'bg-transparent border border-cream/30 hover:border-gold text-cream hover:bg-cream/5'
                    }`}
                    disabled={isCurrent}
                  >
                    {isCurrent ? 'Your Current Plan' : 'Select Plan'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* SECTION 2: GURU / EXPERT PLANS */}
        <div>
          <div className="flex items-center gap-3 mb-8 border-b border-brown-light/10 pb-4">
            <span className="font-devanagari text-2xl text-gold-light">गुरु</span>
            <h2 className="font-display text-2xl text-gold-light font-bold">Guru & Expert Plans</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {guruPlans.map((plan) => {
              const isCurrent = currentUser && currentUser.plan === plan.name;
              return (
                <div
                  key={plan.name}
                  className={`bg-ink-light border rounded-2xl p-6 shadow-xl flex flex-col justify-between relative transition-all duration-300 ${
                    plan.popular
                      ? 'border-gold shadow-gold-glow/5 md:-translate-y-2'
                      : 'border-brown-light/20 hover:border-gold/30'
                  }`}
                >
                  {plan.popular && (
                    <span className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 bg-gold text-brown text-[10px] font-bold tracking-wider uppercase px-4 py-1 rounded-full border border-gold-dark shadow-sm">
                      Recommended
                    </span>
                  )}

                  <div>
                    {/* Header */}
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-display text-2xl text-cream font-bold">{plan.name}</h3>
                        <p className="text-xs text-cream-dark mt-1 font-sans leading-normal h-8">{plan.description}</p>
                      </div>
                      <div className="p-2 rounded-xl bg-ink/60 border border-brown-light/10">{plan.icon}</div>
                    </div>

                    {/* Price */}
                    <div className="my-6">
                      <span className="font-display text-4xl text-gold-light font-bold">
                        {getPriceDisplay(plan.price)}
                      </span>
                      {plan.price > 0 && (
                        <span className="text-xs text-cream-dark font-sans ml-1">
                          / {billingPeriod === 'annual' ? 'yr' : 'mo'}
                        </span>
                      )}
                    </div>

                    {/* Features list */}
                    <ul className="space-y-3 mb-8 text-xs md:text-sm text-cream-dark border-t border-brown-light/10 pt-5">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <Check size={16} className="text-gold shrink-0 mt-0.5" />
                          <span className="font-poetic">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA button */}
                  <button
                    onClick={() => handleSelectPlan('guru', plan.name)}
                    className={`w-full py-3 rounded-xl font-sans text-xs md:text-sm font-bold tracking-wide transition-all active:scale-98 ${
                      isCurrent
                        ? 'bg-neutral-800 text-neutral-400 border border-neutral-700 cursor-default'
                        : plan.popular
                        ? 'bg-gold hover:bg-gold-light text-brown shadow-md shadow-gold/20 border border-gold-dark/40'
                        : 'bg-transparent border border-cream/30 hover:border-gold text-cream hover:bg-cream/5'
                    }`}
                    disabled={isCurrent}
                  >
                    {isCurrent ? 'Your Current Plan' : 'Select Plan'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
