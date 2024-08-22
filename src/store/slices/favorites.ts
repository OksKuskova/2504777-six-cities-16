import { ServerOffer } from '../../types/offers';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SliceName, RequestStatus, FavoriteStatus } from '../../const';
import { fetchFavorites, fetchFavoritesOnLogin, changeFavorites } from '../thunk-action/favorites';
import { State, ChangeResponse } from '../types';

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
  }
});

export const { resetFavorites, resetStatus } = favoritesSlice.actions;
export const getFavorites = (state: State) => state[SliceName.Favorites].favorites;
export const getStatus = (state: State) => state[SliceName.Favorites].requestStatus;

export default favoritesSlice;
