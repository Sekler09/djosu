'use client';
import { FC, memo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { RoutePath } from '@/routes';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';

interface LinkItem {
  title: string;
  href: string;
}

const linkItems: LinkItem[] = [
  {
    title: 'Deeds',
    href: RoutePath.Deeds,
  },
  {
    title: 'Friends',
    href: RoutePath.Friends,
  },
  {
    title: 'Profile',
    href: RoutePath.Profile,
  },
];

interface NavbarProps {}

const Navbar: FC<NavbarProps> = () => {
  const pathname = usePathname();

  return (
    <NavigationMenu className="order-1 sm:order-none">
      <NavigationMenuList className="gap-4">
        {linkItems.map(({ title, href }) => (
          <NavigationMenuItem key={title}>
            <NavigationMenuLink asChild active={pathname.startsWith(href)}>
              <Link href={href} className={navigationMenuTriggerStyle()}>
                {title}
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default memo(Navbar);
