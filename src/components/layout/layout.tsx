import { Outlet, useLocation } from 'react-router-dom';
import Logo from '../logo/logo';
import { AppRoute } from '../../const';

function Layout(): JSX.Element {
  const location = useLocation();

  const getExtraClassName = () => {
    switch (location.pathname) {
      case AppRoute.Login as string:
        return 'page--gray page--login';
      case AppRoute.Root as string:
        return 'page--gray page--main';
      default:
        return '';
    }
  };

  return (
    <div className={`page ${getExtraClassName()}`}>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo/>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="#">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                    <span className="header__favorite-count">3</span>
                  </a>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <Outlet />
    </div>
  );
}

export default Layout;
