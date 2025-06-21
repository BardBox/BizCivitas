import PaymentDialog, { MembershipPaymentButton } from "@/components/PaymentButton";
import { Users, Globe, BookOpen, MessageSquare, Zap } from "lucide-react";

export default function PaymentPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Zap className="w-4 h-4" />
              Perfect Starting Point
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              BizCivitas Digital
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600"> Membership</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Your First Step Into a Smarter Business World. Join emerging entrepreneurs and growing businesses in our digital ecosystem.
            </p>
          </div>

          {/* Main Payment Card */}
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-8 py-12 text-center">
              <div className="text-white/90 text-lg font-medium mb-2">Bizcivitas Digital Membership</div>
              <div className="text-5xl font-black text-white mb-2">₹8,259</div>
              <div className="text-green-100 text-sm">₹6,999 + ₹1,260 (18% GST) • One-time Registration</div>
            </div>

            <div className="p-8 md:p-12">
              {/* Features Grid */}
              <div className="grid md:grid-cols-2 gap-6 mb-12">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Users className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Exclusive Networking Events</h3>
                    <p className="text-gray-600 text-sm">Access to online networking events and member connections</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Globe className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Digital Business Directory</h3>
                    <p className="text-gray-600 text-sm">Connect with like-minded entrepreneurs worldwide</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Monthly Workshops</h3>
                    <p className="text-gray-600 text-sm">Virtual workshops, webinars and business growth resources</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Community Forum</h3>
                    <p className="text-gray-600 text-sm">Peer-to-peer learning and business consultation support</p>
                  </div>
                </div>
              </div>

              {/* Payment Button */}
              <div className="text-center">
                <MembershipPaymentButton
                  paymentData={{
                    color: "#22c55e",
                    amount: 8259,
                    paidFor: "Bizcivitas Digital Membership",
                    isEvent: false,
                  }}
                  buttonText="Purchase Digital Membership"
                  size="lg"
                  fullWidth={false}
                  animateIcon={true}
                />
                
                <div className="mt-6 flex items-center justify-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    <span>Fully Digital Access</span>
                  </div>
                  <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>Instant Community Access</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 text-center">
            <p className="text-gray-500 text-sm mb-8">Cost-effective entry into BizCivitas community</p>
            <div className="flex items-center justify-center gap-8 opacity-60">
              <div className="text-sm text-gray-500">Perfect for New Entrepreneurs</div>
              <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
              <div className="text-sm text-gray-500">Pathway to Premium Memberships</div>
              <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
              <div className="text-sm text-gray-500">Community-Driven Growth</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}