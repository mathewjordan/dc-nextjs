import * as Dialog from "@radix-ui/react-dialog";
import {
  FilterBody,
  FilterContent,
  FilterHeader,
  FilterOverlay,
  FilterTrigger,
} from "./Filter.styled";
import { FilterProvider } from "@/context/filter-context";
import MultiFacet from "./MultiFacet";
import { useSearchState } from "@/context/search-context";
import useFetchApiData from "@/hooks/useFetchApiData";

const FilterModal: React.FC = () => {
  const {
    searchState: { q, userFacets },
  } = useSearchState();

  const { data: apiData, error, loading } = useFetchApiData(q, userFacets);

  console.log(`apiData`, apiData);

  return (
    <FilterProvider>
      <FilterHeader>
        <Dialog.Title>Filter</Dialog.Title>
        <Dialog.Close>Close</Dialog.Close>
      </FilterHeader>
      <FilterBody>
        {apiData?.aggregations &&
          apiData.aggregations.map((aggregation) => (
            <MultiFacet {...aggregation} key={aggregation.id} />
          ))}
      </FilterBody>
    </FilterProvider>
  );
};

const FacetsFilter: React.FC = () => {
  return (
    <Dialog.Root>
      <FilterTrigger>
        <span>Filter</span>
      </FilterTrigger>
      <Dialog.Portal>
        <FilterOverlay />
        <FilterContent>
          <FilterModal />
        </FilterContent>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default FacetsFilter;
