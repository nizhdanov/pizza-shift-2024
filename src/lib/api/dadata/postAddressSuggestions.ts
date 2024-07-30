import { dadataInstance } from '../instance';

type Bound = 'house' | 'street' | 'settlement' | 'city' | 'region' | 'country';

interface BoundValue {
  value: Bound;
}

interface PostAddressSuggestionsParams {
  query: string;
  count: number;
  from_bound?: BoundValue;
  to_bound?: BoundValue;
  locations?: Record<Bound, string>[];
  restrict_value?: boolean;
}

export const postAddressSuggestions = async ({
  params,
  config
}: ApiConfig<PostAddressSuggestionsParams>) =>
  dadataInstance.post<PostAddressSuggestionsResponse>(
    'address',
    {
      query: params.query,
      count: params.count,
      from_bound: params.from_bound,
      to_bound: params.to_bound
    },
    config
  );
