import React from 'react';
import locales from '../i18n';
import { Link } from 'gatsby';
import useTheme from '../hooks/theme';
import { useIntl } from 'react-intl';
import MoonIcon from '../icons/MoonIcon';
import SunIcon from '../icons/SunIcon';
import TranslateIcon from '../icons/TranslateIcon';
import ChevronDownIcon from '../icons/ChevronDownIcon';

const Header = () => {
  const [theme, setTheme] = useTheme();
  const { locale } = useIntl();

  return (
    <div className="navbar w-full max-w-4xl mx-auto">
      <div className="flex-1">
        <Link
          className="btn btn-ghost hover:bg-transparent normal-case text-xl"
          to="/"
        >
          image-resize
        </Link>
      </div>
      <div className="flex-none">
        <label className="swap swap-rotate px-2">
          <input
            type="checkbox"
            checked={theme === 'dark'}
            onChange={(e) => {
              setTheme(e.target.checked ? 'dark' : 'light');
            }}
          />
          <MoonIcon className="w-6 h-6 swap-on" />
          <SunIcon className="w-6 h-6 swap-off" />
        </label>
        <div className="dropdown dropdown-end dropdown-hover">
          <div
            tabIndex={0}
            className="btn btn-ghost gap-1 normal-case hover:bg-transparent"
          >
            <TranslateIcon className="w-6 h-6" />
            <ChevronDownIcon className="w-3 h-3" />
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu-compact menu p-2 border-base-300 bg-base-100 border rounded-box w-32 gap-2"
          >
            {Object.entries(locales).map(([lang, { path, label }]) => (
              <li key={lang}>
                <Link activeClassName="active" to={`/${path}`}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
