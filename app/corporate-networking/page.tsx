import TopSection from "@/components/TopSection";
import ParagraphSection from "@/components/Networking/ParagraphSection";
import { Paragraph } from "@/types/blogs.types";
import { CarouselItem, InfiniteCarouselProps } from '@/types/carosual.types';
import InfiniteCarousel from "@/components/Carousal";
const Paragraph_1: Partial<Paragraph> = {
    //   title: "Expand Your Horizons with Travel Networking",
    contentTop: "By BizCivitas",
    listItems: [
        "For entrepreneurs, networking isn’t just a luxury—it’s the lifeline of growth. Just like sunlight fuels plants, the right connections fuel business success, opening doors to new opportunities, markets, and collaborations.",
        "But here’s the kicker: face-to-face travel networking is the real game-changer. While the world is going all-in on digital, nothing beats the power of real, in-person connections.",
        "Think about it—when was the last time a Zoom call truly inspired you? Travel networking brings back the human touch, fuels innovation, and turns routine meetings into meaningful experiences. In a world trapped behind screens, this is the fresh air entrepreneurs need to thrive",
    ],
};
const Paragraph_2: Partial<Paragraph> = {
    title: "Corporate Networking & Travel Groups for Entrepreneurs",
    contentTop: "Travel groups for entrepreneurs are what take corporate networking to the next level. With a smooth segway from robotic conversations to a spirited and animated conversation, corporate networking and travel groups bring two essential elements together. Authentic connections and Adventure.  ",
};
const Paragraph_3: Partial<Paragraph> = {
    title: "Why Travel Networking is Essential for Growth?",

    listItems: [
        "Global Market Access: Business corporate travel allows entrepreneurs to explore international markets. It helps them understand demand and establish a presence in new regions, accelerating business expansion.",
        "Cultural Insights: Immersing in different cultures helps entrepreneurs adapt products, refine marketing strategies, and build stronger connections.",
        "Relationship Building: In-person meetings create trust, strengthen business partnerships, and open doors to investment opportunities.",
        "Brand Expansion: A global presence enhances credibility, attracts new clients, and positions a brand as an industry leader, making it more competitive in international markets.",
    ],
    listItemIcon: "blogs/UL-icon-green.svg",
    contentBottom:
        "For instance, Starbucks’ global expansion was fuelled by travel networking. Through extensive networking with international suppliers, real estate developers, and local business leaders, Starbucks expanded globally",
};
const Paragraph_4: Partial<Paragraph> = {
    imageUrl_1: "/blogs/blogLeft.png",
    imageUrl_2: "/blogs/travelRight.svg",
    listItems: [
        "Remote Year: A global work-and-travel program connecting entrepreneurs and remote professionals across multiple cities.",
        "Startup Grind Global Chapters: Hosts networking events and international retreats for startup founders and business leaders.",
        "Nomad Cruise: A networking-focused cruise for digital nomads, entrepreneurs, and remote workers, fostering collaboration at sea.",
        "Endeavor Entrepreneurs: A global community supporting high-impact entrepreneurs through networking events and international programs.",
        "Founders Network: Organizes global meetups and retreats for tech startup founders to connect and share insights.",
        "Draper Startup House: A global ecosystem offering coworking, networking, and investment-focused travel.",
        "Wifi Tribe: A travel and coworking community for location-independent entrepreneurs and professionals.",
        "The Break: A curated retreat for founders to step back, strategize, and connect with other entrepreneurs.",
        "Coworking Safari: Adventure-based networking trips for entrepreneurs looking to mix work and leisure.",
    ],
    listItemIcon: "blogs/UL-icon-green.svg",
   };

const Paragraph_5: Partial<Paragraph> = {
    title: "Corporate Networking Meetups",

    
    listItems: [
        "Local Connections: Engage with influential business leaders, investors, and entrepreneurs in your city. Our Corporate networking meetups help you build strong, in-person relationships that drive collaborations and business growth.",
        "Themed Discussions: Each Corporate networking meetups are centered around industry-specific topics, emerging trends, and innovation. Whether it’s tech, finance, or sustainability, you’ll gain insights from expert panels and thought leaders.",
        "Resource Sharing: Access valuable tools, mentorship, and industry knowledge from a network of like-minded professionals. Share experiences, exchange strategies, and discover new opportunities to scale your business with a business travel planner."
    ],
    
    listItemIcon: "blogs/UL-icon-green.svg",
};
const Paragraph_6: Partial<Paragraph> = {
    title: "Our Corporate Travel Services",

    listItems: [
        "Tailored Business Trips: We curate customized travel experiences for entrepreneurs, ensuring access to key markets, industry events, and potential partners.",
        "Global Networking Events: Attend exclusive business summits, investor meetings, and corporate retreats in top business hubs worldwide.",
        "Seamless Travel Planning: From flights to accommodations, we handle all logistics, allowing you to focus on building valuable connections.",
        "Market Immersion Programs: Gain firsthand insights into new markets through guided visits, cultural experiences, and introductions to local business leaders.",
        "VIP Access & Partnerships: Get priority access to corporate lounges, coworking spaces, and high-profile business gatherings for maximum networking opportunities.",
        "Bizcivitas’ First-Ever Domestic Trip: Check out Bizcivitas’ high-spirited, successful first domestic trip!"
    ],
    
    
    listItemIcon: "blogs/UL-icon-green.svg",
};

const Paragraph_7: Partial<Paragraph> = {
    title: "Join Our Corporate Networking & Travel Groups Today",
    

    listItems: [
        "Exclusive Networking Events: Attend high-profile summits, investor meetups, and business retreats in key global cities like our first-ever domestic trip to Coorg.",
        "Market Expansion Opportunities: Gain firsthand insights into international markets, meet local business leaders, explore new ventures, and expand your business.",
        "Customized Business Travel Experiences: Tailored trips to major business hubs, ensuring maximum value from every journey, leaving you with a bag full of memories, smiles, inspiration, and newfound energy.",
        "Strategic Partnerships & Collaborations: Connect with like-minded professionals, industry disruptors, and potential business partners through our platform.",
        "VIP Access & Perks: Enjoy priority entry to coworking spaces, business lounges, and exclusive networking clubs worldwide.",
        "Continuous Support & Resources: Leverage expert insights, mentorship, and post-event follow-ups to make every connection count."
    ],
    
    
    listItemIcon: "blogs/UL-icon-green.svg",
};
const carouselItems: CarouselItem[] = [
    {
        id: 1,
        title: "CouchSurfing",
        subtitle: "A Community Built on Travel Connections",
        description: "Casey Fenton's spontaneous trip to Iceland sparked the idea for CouchSurfing, where travellers connect, share homes, and experience cultures authentically."
    },
    {
        id: 2,
        title: "Lonely Planet",
        subtitle: "Travel-Fuelled Networking Turns into a Global Brand",
        description: "Tony and Maureen Wheeler's backpacking adventures inspired them to share travel tips. Through word-of-mouth and travel networks, Lonely Planet became a global guidebook giant."
    },
    {
        id: 3,
        title: "Remote Year",
        subtitle: "Building Professional Networks While Traveling",
        description: "By connecting digital nomads, Remote Year created a movement where professionals work remotely while traveling, forming lifelong business and personal relationships."
    },
    {
        id: 4,
        title: "Selina",
        subtitle: "Travel-Driven Co-working & Hospitality",
        description: "By staying in hostels and meeting digital nomads, Selina founders saw the need for work-friendly accommodations, leading to a network of co-living and co-working spaces."
    },
    {
        id: 5,
        title: "Nomad List",
        subtitle: "Digital Nomads Connecting Through Tech",
        description: "Pieter Levels travelled while working remotely and saw the need for a resource to connect nomads. Nomad List now helps thousands find work-friendly cities and communities."
    }
];
import Accordion from "@/components/Accordian";

const faqs = [
  {
    question: "What is travel networking?",
    answer:
      "It involves blending professional networking with the excitement of exploring new destinations, fostering authentic connections through shared experiences.",
  },
  {
    question: "How can corporate networking help my business?",
    answer: "By building authentic relationships, expanding your global reach, and uncovering unique collaboration opportunities.",
  },
  {
    question: "What types of events are available?",
    answer: "Business summits, immersive travel experiences, entrepreneur meetups, and cultural exchange trips.",
  },
  {
    question: "How can entrepreneurs benefit from travel groups?",
    answer: "They gain exposure to diverse perspectives, form trusted partnerships, and expand their professional influence.",
  },
  {
    question: "How do I join your corporate networking platform?",
    answer: "Visit our platform and sign up to access curated trips, premium events, and professional resources.",
  },
];

export default function CorporateNetworkingPage() {
    return (
        <main className="flex flex-col items-start justify-center">
            <TopSection
                heading="Corporate Networking"
                subheading="Connect with like-minded professionals while exploring the world. Our travel networking events offer unique opportunities to build relationships, share experiences, and create lasting connections."
                backgroundImage="/blogs/greenSection.svg"
            />
            <div className="py-6"></div>
            <h1 className="text-4xl font-bold px-4 sm:px-10 lg:px-14 pt-14 text-green-500"> Elevate Your Business with Corporate Networking & Travel Groups </h1>
            <ParagraphSection paragraph={Paragraph_1} className="text-green-500 " />
            <ParagraphSection paragraph={Paragraph_2} className="" />
            <ParagraphSection paragraph={Paragraph_3} className="text-green-500" />

            <div className="py-6"></div>
            <div className="w-screen py-14 bg-[#BBE7C7]">
                <ParagraphSection paragraph={Paragraph_4} className="text-green-500" />

            </div>

            <div className="py-6"></div>
            <ParagraphSection paragraph={Paragraph_5} className="" />
            <ParagraphSection paragraph={Paragraph_6} className="" />
            <InfiniteCarousel
                items={carouselItems}
                title="Success Stories that Go with Our Motto"
                speed={25}
                pauseOnHover={true}
                backgroundColor="bg-green-100"
                cardBackgroundColor="bg-white"
                titleColor="text-green-500"
                textColor="text-gray-700"
                mainTitleColor="text-green-500"
                gap={6}
            />
            
            <div className="py-6"></div>
            <ParagraphSection paragraph={Paragraph_7} className="" />

            <h1 className="text-4xl font-bold px-4 sm:px-10 lg:px-14 pt-14 text-green-500"> FAQ's  </h1>
            <Accordion items={faqs} />
            
            <div className="py-6"></div>
        </main>
    );
}