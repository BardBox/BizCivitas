import Link from 'next/link';

interface EventNavigationProps {
  currentPath?: string;
}

export default function EventNavigation({ currentPath }: EventNavigationProps) {
  const navItems = [
    { href: '/events', label: 'All Events' },
    { href: '/events?type=upcoming', label: 'Upcoming' },
    { href: '/events?type=past', label: 'Past Events' },
  ];

  return (
    <nav className="flex space-x-4 mb-6">
      {navItems.map((item) => {
        const isActive = currentPath === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              isActive
                ? 'bg-blue-600 text-white'
                : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}