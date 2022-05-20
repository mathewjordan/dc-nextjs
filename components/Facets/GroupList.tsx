import * as Accordion from "@radix-ui/react-accordion";
import * as Tabs from "@radix-ui/react-tabs";
import { ALL_FACETS, FACETS } from "@/lib/constants/facets-model";
import { getFacetById, getFacetGroup } from "@/lib/utils/facet-helpers";
import FacetWrapper from "./FacetWrapper";
import { useFilterState } from "@/context/filter-context";

const FacetsGroupList: React.FC = () => {
  const {
    filterDispatch,
    filterState: { lastFacetViewed, userFacetsUnsubmitted },
  } = useFilterState();
  const currentUserFacets = Object.keys(userFacetsUnsubmitted);

  let defaultGroup;
  let defaultFacetId;

  if (currentUserFacets.length > 0) {
    const facetId = lastFacetViewed?.id;
    if (facetId) {
      defaultFacetId = facetId;
      defaultGroup = getFacetGroup(facetId)?.label;
    }
  }

  const handleFacetChange = (value: string): void => {
    const facet = getFacetById(value);
    if (facet) {
      filterDispatch({ facet, type: "updateLastFacetViewed" });
    }
  };

  return (
    <Tabs.Root
      defaultValue={defaultFacetId}
      orientation="vertical"
      onValueChange={handleFacetChange}
    >
      <div style={{ display: "flex" }} data-testid="facets-group-list">
        <Accordion.Root type="single" defaultValue={defaultGroup}>
          {FACETS.map((group) => {
            return (
              <Accordion.Item value={group.label} key={group.label}>
                <Accordion.Header>
                  <Accordion.Trigger>{group.label}</Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content>
                  <Tabs.List
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    {group.facets.map((facet) => {
                      return (
                        <Tabs.Trigger
                          value={facet.id}
                          key={facet.id}
                          style={{ backgroundColor: "white" }}
                        >
                          {facet.label}
                        </Tabs.Trigger>
                      );
                    })}
                  </Tabs.List>
                </Accordion.Content>
              </Accordion.Item>
            );
          })}
        </Accordion.Root>
        {ALL_FACETS.facets.map((facet) => {
          return (
            <Tabs.Content value={facet.id} key={facet.id}>
              <FacetWrapper facet={facet} />
            </Tabs.Content>
          );
        })}
      </div>
    </Tabs.Root>
  );
};

export default FacetsGroupList;
