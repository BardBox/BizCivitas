import { MembershipPlan } from "@/lib/memberships";
import PaymentDialogButton from "@/components/PaymentButton";
import Link from "next/link";
export default function StickyBottomCTA({ membership, paymentUrl }: { membership: MembershipPlan, paymentUrl?: string }) {
    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg shadow-2xl border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <div className="hidden md:block">
                        <div className="font-bold text-gray-800 text-lg">Ready to Start Your Digital Journey?</div>
                        <div className="text-gray-600 text-sm">{membership.tagline}</div>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="text-right">
                            <div className="text-3xl font-black" style={{ color: membership.color.primary }}>
                                ₹{membership.plans?.[0]?.price.toLocaleString() || membership.price.amount.toLocaleString()}
                            </div>
                            <div className="text-gray-500 text-xs">including GST</div>
                        </div>
                        <Link
                            href={'/digital-membership-payment'}
                            className="text-white px-8 py-4 rounded-2xl font-bold hover:opacity-90 transition-all duration-300 transform hover:scale-105 text-center"
                            style={{
                                backgroundColor: membership.color.primary,
                                color: "white"
                            }}
                        >
                            Start Your Journey →
                        </Link>

                    </div>
                </div>
            </div>
        </div>
    );
}