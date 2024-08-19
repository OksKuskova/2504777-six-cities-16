import { Helmet } from 'react-helmet-async';
import { Title } from '../../const';
import LoadingPage from '../loading-page/loading-page';
import NotFoundPage from '../not-found-page/not-found-page';
import FavoritesSectionEmpty from '../../components/favorites-section/favorites-section-empty';
import FavoritesSection from '../../components/favorites-section/favorites-section';
import { useFavorites } from '../../hooks/use-favorites';

function FavoritesPage(): JSX.Element {
  const { favorites, hasFavorites, isLoading, isFailed } = useFavorites();

  if (isLoading) {
    return <LoadingPage />;
  }

  if (isFailed) {
    return <NotFoundPage />;
  }

  return (
    <>
      <Helmet>
        <title>{Title.Favorites}</title>
      </Helmet>

      <main className={`page__main page__main--favorites ${hasFavorites ? '' : 'page__main--favorites-empty'}`}>
        <div className="page__favorites-container container">
          {hasFavorites ? <FavoritesSection favorites={favorites} /> : <FavoritesSectionEmpty />}
        </div>
      </main>
    </>
  );
}

export default FavoritesPage;
