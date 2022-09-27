import { CollectionShape } from "@/types/components/collections";

const CollectionItem: React.FC<CollectionShape> = (props) => {
  const { title, description, id } = props;

  return (
    <div data-collection={id}>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
};

export default CollectionItem;
