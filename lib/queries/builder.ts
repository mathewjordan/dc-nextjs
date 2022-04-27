import { buildSearchPart, querySearchTemplate } from "@/lib/queries/search";
import { buildFacetPart } from "@/lib/queries/facet";
import { UserFacets } from "@/types/search-context";
import { ApiSearchRequest } from "@/types/api/request";

export function buildQuery(term: string, userFacets: UserFacets) {
  const newQuery: ApiSearchRequest = JSON.parse(
    JSON.stringify(querySearchTemplate)
  );

  /**
   * Add search term to the API query
   */
  if (term) {
    newQuery.query.bool.must.push(buildSearchPart(term));
  }

  /**
   * Add facets to the API query
   */
  for (const [key, value] of Object.entries(userFacets)) {
    if (value?.length > 0) {
      newQuery.query.bool.must.push(buildFacetPart(key, value));
    }
  }

  return newQuery;
}
