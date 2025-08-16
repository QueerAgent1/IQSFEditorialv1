import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

export function MembershipTiers() {
  const tiers = [
    {
      name: "Community",
      price: "$0",
      period: "Forever free",
      description: "Perfect for individuals starting their advocacy journey",
      features: [
        "Map access (basic)",
        "Newsletter & alerts",
        "Community resources",
        "Basic safety data"
      ],
      buttonText: "Join Free",
      buttonVariant: "outline" as const,
      popular: false
    },
    {
      name: "Advocate",
      price: "$12",
      period: "per month",
      description: "For active advocates and small organizations",
      features: [
        "Historical trends",
        "Local alerts",
        "Member webinars",
        "Download reports",
        "Priority email support"
      ],
      buttonText: "Start 14-Day Trial",
      buttonVariant: "default" as const,
      popular: true
    },
    {
      name: "Partner",
      price: "$129",
      period: "per month",
      description: "For organizations making systematic change",
      features: [
        "Org dashboards",
        "Benchmark dataset",
        "Priority support",
        "White-label reports",
        "API access (limited)"
      ],
      buttonText: "Get Started",
      buttonVariant: "secondary" as const,
      popular: false
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "Contact sales",
      description: "For large organizations and government agencies",
      features: [
        "API + SSO access",
        "Training & audits",
        "SLA support",
        "Custom integrations",
        "Dedicated success manager"
      ],
      buttonText: "Contact Sales",
      buttonVariant: "secondary" as const,
      popular: false
    }
  ];

  return (
    <section id="membership" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display font-bold text-4xl lg:text-5xl text-gray-900 mb-6">
            Membership & Data Access
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Choose the plan that fits your impact goals — powered by comprehensive safety data.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {tiers.map((tier, index) => (
            <Card 
              key={tier.name}
              className={`relative ${tier.popular ? 'ring-2 ring-pride-pink' : ''}`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-pride-pink text-white px-4 py-1">
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{tier.name}</h3>
                <div className="text-4xl font-bold text-gray-900 mb-1">{tier.price}</div>
                <div className="text-gray-600 mb-6">{tier.period}</div>
                <p className="text-sm text-gray-600 mb-6">{tier.description}</p>
                
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-pride-green flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button
                  variant={tier.buttonVariant}
                  className={`w-full ${
                    tier.popular 
                      ? 'bg-pride-pink text-white hover:bg-pink-600 glow-effect' 
                      : tier.buttonVariant === 'outline' 
                        ? 'border-gray-300 hover:bg-gray-100' 
                        : 'bg-platinum text-gray-900 hover:bg-gray-300'
                  }`}
                >
                  {tier.buttonText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Member Actions */}
        <div className="text-center mt-12">
          <div className="inline-flex gap-8 text-sm">
            <button className="text-gray-700 hover:text-pride-pink transition-colors font-medium">
              Already a member? Sign in
            </button>
            <button className="text-gray-700 hover:text-pride-pink transition-colors font-medium">
              Manage account
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
