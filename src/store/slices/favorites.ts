import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ServerOffer } from '../../types/offers';
import { RequestStatus } from '../../const';
import { SliceName, FavoriteStatus } from '../const';
import { fetchFavorites, fetchFavoritesOnLogin, changeFavorites } from '../thunk-action/favorites';
import { ChangeResponse } from '../types';

type FavoritesState = {
  favorites: ServerOffer[];
  requestStatus: RequestStatus;
}

const initialState: FavoritesState = {
  favorites: [],
  requestStatus: RequestStatus.Idle,
};

const favoritesSlice = createSlice({
  name: SliceName.Favorites,
  initialState,
  reducers: {
    resetFavorites(state) {
      state.favorites = [];
    },
    resetStatus(state) {
      state.requestStatus = RequestStatus.Idle;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchFavorites.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(fetchFavorites.fulfilled, (state, action: PayloadAction<ServerOffer[]>) => {
        state.requestStatus = RequestStatus.Success;
        state.favorites = action.payload;
      })
      .addCase(fetchFavorites.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
      })

      .addCase(fetchFavoritesOnLogin.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(fetchFavoritesOnLogin.fulfilled, (state, action: PayloadAction<ServerOffer[]>) => {
        state.requestStatus = RequestStatus.Success;
        state.favorites = action.payload;
      })
      .addCase(fetchFavoritesOnLogin.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
      })

      .addCase(changeFavorites.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(changeFavorites.fulfilled, (state, action: PayloadAction<ChangeResponse>) => {
        state.requestStatus = RequestStatus.Success;
        switch (action.payload.status) {
          case FavoriteStatus.Added:
            state.favorites.push(action.payload.offer);
            break;
          case FavoriteStatus.Removed:
            state.favorites = state.favorites.filter((offer) => offer.id !== action.payload.offer.id);
            break;
        }
      })
      .addCase(changeFavorites.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
      });
  },
  selectors: {
    favoriteOffers: (state: FavoritesState) => state.favorites,
    status: (state: FavoritesState) => state.requestStatus,
  }
});

export const { favoriteOffers, status } = favoritesSlice.selectors;
export const { resetFavorites, resetStatus } = favoritesSlice.actions;

export default favoritesSlice;
