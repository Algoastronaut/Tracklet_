import {
  BarChart3,
  Receipt,
  PieChart,
  CreditCard,
  Globe,
  Zap,
} from "lucide-react";

// Stats Data
export const statsData = [
  {
    value: "50K+",
    label: "Active Users",
  },
  {
    value: "$2B+",
    label: "Transactions Tracked",
  },
  {
    value: "99.9%",
    label: "Uptime",
  },
  {
    value: "4.9/5",
    label: "User Rating",
  },
];

// Features Data
export const featuresData = [
  {
    icon: <BarChart3 className="h-8 w-8 text-blue-600" />,
    title: "Advanced Analytics",
    description:
      "Get detailed insights into your spending patterns with AI-powered analytics",
  },
  {
    icon: <Receipt className="h-8 w-8 text-blue-600" />,
    title: "Smart Receipt Scanner",
    description:
      "Extract data automatically from receipts using advanced AI technology",
  },
  {
    icon: <PieChart className="h-8 w-8 text-blue-600" />,
    title: "Budget Planning",
    description: "Create and manage budgets with intelligent recommendations",
  },
  {
    icon: <CreditCard className="h-8 w-8 text-blue-600" />,
    title: "Multi-Account Support",
    description: "Manage multiple accounts and credit cards in one place",
  },
  {
    icon: <Globe className="h-8 w-8 text-blue-600" />,
    title: "Multi-Currency",
    description: "Support for multiple currencies with real-time conversion",
  },
  {
    icon: <Zap className="h-8 w-8 text-blue-600" />,
    title: "Automated Insights",
    description: "Get automated financial insights and recommendations",
  },
];

// How It Works Data
// How It Works Data
export const howItWorksData = {
  inputs: [
    {
      icon: <CreditCard className="h-6 w-6 text-blue-600" />,
      title: "Bank Accounts",
      description: "Connect your bank accounts for automatic tracking",
    },
    {
      icon: <Receipt className="h-6 w-6 text-blue-600" />,
      title: "Receipts",
      description: "Scan and extract data from your receipts",
    },
    {
      icon: <BarChart3 className="h-6 w-6 text-blue-600" />,
      title: "Manual Entry",
      description: "Log cash expenses and custom transactions",
    },
  ],
  center: {
    icon: <Zap className="h-8 w-8 text-white" />,
    title: "Tracklet AI",
  },
  outputs: [
    {
      icon: <PieChart className="h-6 w-6 text-blue-600" />,
      title: "Smart Budget",
      description: "Automated budgeting based on spending habits",
    },
    {
      icon: <BarChart3 className="h-6 w-6 text-blue-600" />,
      title: "Monthly Reports",
      description: "Detailed breakdown of your financial health",
    },
    {
      icon: <Globe className="h-6 w-6 text-blue-600" />,
      title: "Investment Insights",
      description: "AI-powered recommendations for growth",
    },
  ],
};

// Testimonials Data
export const testimonialsData = [
  {
    name: "Sarah Johnson",
    role: "Small Business Owner",
    image: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    quote:
      "Tracklet has transformed how I manage my business finances. The AI insights have helped me identify cost-saving opportunities I never knew existed.",
  },
  {
    name: "Michael Chen",
    role: "Freelancer",
    image: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    quote:
      "The receipt scanning feature saves me hours each month. Now I can focus on my work instead of manual data entry and expense tracking.",
  },
  {
    name: "Emily Rodriguez",
    role: "Financial Advisor",
    image: "https://i.pravatar.cc/150?u=a04258114e29026302d",
    quote:
      "I recommend Tracklet to all my clients. The multi-currency support and detailed analytics make it perfect for international investors.",
  },
  {
    name: "David Kim",
    role: "Software Engineer",
    image: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    quote:
      "The dashboard is incredibly intuitive. I love how I can see all my accounts in one place and track my net worth growth over time.",
  },
  {
    name: "Lisa Patel",
    role: "Marketing Director",
    image: "https://i.pravatar.cc/150?u=a04258a2462d826712d",
    quote:
      "Budgeting used to be a chore, but Tracklet makes it fun. The visual breakdowns help me understand exactly where my money is going.",
  },
];
