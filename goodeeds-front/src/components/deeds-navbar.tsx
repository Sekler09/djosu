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
    title: 'Friends',
    href: RoutePath.Deeds,
  },
  {
    title: 'My',
    href: RoutePath.MyDeeds,
  },
];

interface DeedsNavbarProps {}

const DeedsNavbar: FC<DeedsNavbarProps> = () => {
  const pathname = usePathname();

  return (
    <NavigationMenu className="z-0 flex-grow-0 flex-shrink-0">
      <NavigationMenuList className="gap-4">
        {linkItems.map(({ title, href }) => (
          <NavigationMenuItem key={title}>
            <NavigationMenuLink asChild active={pathname === href}>
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

export default memo(DeedsNavbar);
