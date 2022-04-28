import { ModelName } from "@/types/api/generic";

export interface ApiResponse {
  data: ApiResponseData;
  info: {
    total: number;
  };
}

export interface ApiResponseAggregation {
  buckets: ApiResponseBucket[];
  id: string;
}

type ApiResponseBucket = {
  doc_count: number;
  key: string;
};

export type ApiResponseData = CollectionShape | SearchShape[] | WorkShape;

export interface ApiSearchResponse extends ApiResponse {
  aggregations?: ApiResponseAggregation[];
  data: SearchShape[];
}

/**
 * Default shape for API response data property
 */
export interface ApiResponseDataShape {
  accession_number: string;
  api_model: ModelName;
  id: string;
  iiif_manifest?: string;
  thumbnail: string;
  title: string;
}

/**
 * Defined shapes for API response data property
 */
export interface CollectionShape extends ApiResponseDataShape {
  api_model: "Collection";
}

export interface SearchShape extends ApiResponseDataShape {
  work_type_labels: string;
}

export interface WorkShape extends ApiResponseDataShape {
  api_model: "Work";
}
