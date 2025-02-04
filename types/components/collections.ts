export interface CollectionShape {
  admin_email: string | null;
  api_link: string;
  api_model: string;
  create_date: string;
  description: string;
  featured: boolean | null;
  finding_aid_url: string | null;
  id: string;
  keywords: string[];
  modified_date: string;
  published: boolean;
  representative_image: {
    url: string;
    workId: string;
  };
  title: string;
  visibility: "Institution" | "Private" | "Public";
}
