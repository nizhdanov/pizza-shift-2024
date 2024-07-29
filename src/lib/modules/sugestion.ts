import { postAddressSuggestions } from '../api/dadata/postAddressSuggestions';
import { createAppSlice } from '../redux';

const initialState = {
  loading: false,
  suggestions: [] as AddressSuggestion[],
  selectedSuggestion: null as AddressSuggestion | null
};

export const sugestionSlice = createAppSlice({
  name: 'sugestion',
  initialState,
  selectors: {
    selectSuggestions: (state) => state.suggestions,
    selectLoadingSuggestions: (state) => state.loading,
    selectSelectedSuggestion: (state) => state.selectedSuggestion
  },
  reducers: (create) => {
    return {
      fetchSuggestions: create.asyncThunk<AddressSuggestion[], string>(
        async (query) => {
          const response = await postAddressSuggestions({
            params: {
              query,
              count: 5,
              from_bound: { value: 'house' },
              to_bound: { value: 'house' }
            }
          });

          return response.data.suggestions;
        },
        {
          pending: (state) => {
            state.loading = true;
          },
          fulfilled: (state, { payload }) => {
            state.suggestions = payload;
          },
          settled: (state) => {
            state.loading = false;
          }
        }
      ),
      clearSuggestions: create.reducer((state) => {
        state.suggestions = [];
      }),
      chooseSuggestion: create.reducer<string>((state, { payload }) => {
        const suggestion = state.suggestions.find((item) => item.value === payload);
        if (suggestion) {
          state.selectedSuggestion = suggestion;
          state.suggestions = [];
        }
      }),
      clearSelectedSuggestion: create.reducer((state) => {
        state.selectedSuggestion = null;
      })
    };
  }
});

export const { selectSuggestions, selectLoadingSuggestions, selectSelectedSuggestion } =
  sugestionSlice.selectors;

export const { fetchSuggestions, chooseSuggestion, clearSelectedSuggestion, clearSuggestions } =
  sugestionSlice.actions;
