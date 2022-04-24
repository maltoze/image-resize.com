import locales from '../i18n';
import { Link } from 'gatsby';
import useTheme from '../hooks/theme';
import MoonIcon from '../icons/MoonIcon';
import SunIcon from '../icons/SunIcon';
import TranslateIcon from '../icons/TranslateIcon';
import classNames from 'classnames';
import ChevronDownSolidIcon from '../icons/ChevronDownSolidIcon';
import { isBrowser } from '../utils/common';
import { Menu, Transition } from '@headlessui/react';

const Header = () => {
  const [theme, setTheme] = useTheme();

  return (
    <div className="mx-auto flex min-h-[4rem] w-full max-w-4xl items-center p-2">
      <div className="flex-1">
        <Link className="px-3 text-xl font-semibold normal-case" to="/">
          image-resize
        </Link>
      </div>
      <div className="flex flex-none items-center gap-2">
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="px-2 outline-none hover:opacity-60"
        >
          {theme === 'dark' ? <MoonIcon /> : <SunIcon />}
        </button>
        <Menu as="div" className="relative">
          <Menu.Button className="flex items-center px-2 outline-none hover:opacity-60">
            <TranslateIcon />
            <ChevronDownSolidIcon className="h-4 w-4" />
          </Menu.Button>
          <Transition
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Menu.Items
              className="absolute right-0 mt-2 w-32 rounded-md bg-white outline-none ring-1 ring-black ring-opacity-10 dark:bg-slate-900 dark:ring-slate-700"
              tabIndex={0}
            >
              {Object.entries(locales).map(([lang, { path, label }]) => (
                <Menu.Item
                  as={Link}
                  to={`/${path}`}
                  activeClassName="bg-primary-600 dark:bg-primary-800 text-white rounded-md"
                  className="m-1 flex text-sm outline-none"
                  tabIndex={0}
                  key={lang}
                  disabled={
                    isBrowser && window.location.pathname === `/${path}/`
                  }
                >
                  {({ active, disabled }) => (
                    <span
                      className={classNames('w-full rounded-md p-2', {
                        'bg-slate-200 dark:bg-slate-800': active && !disabled,
                      })}
                    >
                      {label}
                    </span>
                  )}
                </Menu.Item>
              ))}
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  );
};

export default Header;
