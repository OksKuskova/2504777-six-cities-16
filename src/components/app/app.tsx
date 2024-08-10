import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from '../../pages/main-page/main-page';
import { CardOffer } from '../../types/offers';
import { AppRoute, AuthorizationStatus } from '../../const';
import Layout from '../layout/layout';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import LoginPage from '../../pages/login-page/login-page';
import OfferPage from '../../pages/offer-page/offer-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import PrivateRoute from '../private-route/private-route';
import { HelmetProvider } from 'react-helmet-async';
import LoadingPage from '../../pages/loading-page/loading-page';
import { useAppSelector } from '../../hooks';

type AppProps = {
	cardOffers: CardOffer[];
}

function App({ cardOffers }: AppProps): JSX.Element {
  const favoritesOffers = cardOffers.filter((offer) => offer.isFavorite);

  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const isOffersLoading = useAppSelector((state) => state.isOffersLoading);

  if (authorizationStatus === AuthorizationStatus.Unknown || isOffersLoading) {
    return (
      <LoadingPage />
    );
  }

  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path={AppRoute.Root}
            element={<Layout favoriteOffersCount={favoritesOffers.length}/>}
          >
            <Route
              index
              element={<MainPage />}
            />
            <Route
              path={AppRoute.Favorites}
              element={
                <PrivateRoute>
                  <FavoritesPage favoritesOffers={favoritesOffers} />
                </PrivateRoute>
              }
            />
            <Route
              path={AppRoute.Login}
              element={
                <PrivateRoute onlyUnAuth>
                  <LoginPage />
                </PrivateRoute>
              }
            />
            <Route
              path={AppRoute.Offer}
              element={<OfferPage/>}
            />
            <Route
              path={AppRoute.Error}
              element={<NotFoundPage />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;

