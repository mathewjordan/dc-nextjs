import { GridItem, GridStyled } from "@/components/Grid/Grid.styled";
import Container from "@/components/Shared/Container";
import Figure from "@/components/Figure/Figure";
import Link from "next/link";
import { SearchShape } from "@/types/api/response";
interface GridProps {
  data: SearchShape[];
  info: { total?: number };
}
const Grid: React.FC<GridProps> = ({ data = [] }) => {
  if (!data) return <span>Loading...</span>;

  return (
    <Container containerType="wide">
      <GridStyled
        breakpointCols={5}
        className="dc-grid"
        columnClassName="dc-grid-column"
      >
        {data.map((item: SearchShape) => (
          <GridItem key={item.accession_number}>
            <Link href={`/items/${item.id}`}>
              <a>
                <Figure
                  data={{
                    src: item.thumbnail,
                    supplementalInfo: item.work_type,
                    title: item.title ? item.title : item.accession_number,
                  }}
                />
              </a>
            </Link>
          </GridItem>
        ))}
      </GridStyled>
    </Container>
  );
};

export default Grid;
