import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FullOffer, Offers } from '../../types/offers';
import { RequestStatus, SliceName } from '../../const';
import { fetchFullOffer, fetchOffersNearby } from '../thunk-action/full-offer';

type FullOfferState = {
  info: null | FullOffer;
  offersNearby: Offers;
  requestStatus: RequestStatus;
}

const initialState: FullOfferState = {
  info: null,
  offersNearby: [],
  requestStatus: RequestStatus.Idle,
};

const fullOfferSlice = createSlice({
  name: SliceName.FullOffer,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchFullOffer.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(fetchFullOffer.fulfilled, (state, action: PayloadAction<FullOffer>) => {
        state.requestStatus = RequestStatus.Success;
        state.info = action.payload;
      })
      .addCase(fetchFullOffer.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
      })
      .addCase(fetchOffersNearby.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(fetchOffersNearby.fulfilled, (state, action: PayloadAction<Offers>) => {
        state.requestStatus = RequestStatus.Success;
        state.offersNearby = action.payload;
      })
      .addCase(fetchOffersNearby.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
      });
  },
  // selectors: {
  //   offerInfo: (state: FullOfferState) => state.info,
  //   offersNearby: (state: FullOfferState) => state.offersNearby,
  //   requestStatus: (state: FullOfferState) => state.requestStatus,
  // }
});

// export const { offerInfo, offersNearby, requestStatus } = fullOfferSlice.selectors;
export default fullOfferSlice;
