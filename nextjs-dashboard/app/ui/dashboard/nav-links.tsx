'use client';

import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
  WrenchScrewdriverIcon,
  AcademicCapIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { NavLink } from '../types';
import { IS_CHILD } from '../constants';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links: NavLink[] = [
  { name: 'Tutorial',
    href: '/dashboard', 
    icon: AcademicCapIcon,
    children: [
      { name: 'Home', href: '/dashboard/tutorial', icon: HomeIcon },
      {
        name: 'Invoices',
        href: '/dashboard/tutorial/invoices',
        icon: DocumentDuplicateIcon,
      },
      { name: 'Customers', href: '/dashboard/tutorial/customers', icon: UserGroupIcon },
    ]
  },
  { name: 'Home Improvement', href: '/home-improvement', icon: WrenchScrewdriverIcon}
];

function checkIsSelected(pathname: string, href: string) {
  const pathnameSplit = pathname.split('/').slice(1);
  const hrefSplit = href.split('/').slice(1);
  
  console.log('ISHAAQ :: pathnameSplit: ', pathnameSplit);
  console.log('ISHAAQ :: hrefSplit: ', hrefSplit);
  // pathname is the path the user is on
  // href is the link of the element

  let isOnTheSamePath = true;
  pathnameSplit.forEach(pathName => {
    if (!hrefSplit.includes(pathName))
      isOnTheSamePath = false;
  });
  console.log('ISHAAQ :: isOnTheSamePath: ', isOnTheSamePath);
  console.log('');
  return isOnTheSamePath;
}

function createLink(link: NavLink, pathname: string, isChild: boolean = false) {
  const LinkIcon = link.icon;
  return (
    <Link
      key={link.name}
      href={link.href}
      
      className={clsx(
        'flex grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
        {
          'bg-sky-100 text-blue-600': checkIsSelected(pathname, link.href),
        },
        {
          'h-[48px]': !isChild
        },
        {
          'h-[35px]': isChild
        }

      )}
    >
      <LinkIcon className={clsx(
        {"w-6": !isChild},
        {"w-4": isChild}
      )} />
      <p className="hidden md:block">{link.name}</p>
    </Link>
  )
}

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        return (
          <div key={link.name}>
            {createLink(link, pathname)}
            {pathname.startsWith(link.href) && link.children && (
              <div className='ml-4'>
                {link.children.map((childLink) => {
                  return (
                    createLink(childLink, pathname, IS_CHILD)
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </>
  );
}
