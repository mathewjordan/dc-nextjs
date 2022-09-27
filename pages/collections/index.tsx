import CollectionItem from "@/components/Collection/Item/Item";
import { CollectionShape } from "@/types/components/collections";
import Container from "@/components/Shared/Container";
import Layout from "components/layout";
import { NextPage } from "next";
import React from "react";
import { getCollectionList } from "@/lib/collection-helpers";

interface CollectionListProps {
  collections: CollectionShape[];
}

const CollectionList: NextPage<CollectionListProps> = ({ collections }) => {
  console.log(collections);

  return (
    <Layout>
      <Container>
        <h1>All Collections</h1>
        <form>
          <input placeholder="Filter collections" />
        </form>
        {collections.map((item) => (
          <CollectionItem {...item} key={item.id} />
        ))}
      </Container>
    </Layout>
  );
};

export async function getStaticProps() {
  const collections = await getCollectionList();

  return {
    props: { collections },
  };
}

export default CollectionList;
