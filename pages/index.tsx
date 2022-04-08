import Grid from "@/components/Grid/Grid";
import Header from "@/components/Header/Header";

const Home: React.FC = () => {
  return (
    <div data-testid="home-page-wrapper">
      <Header />
      <main>
        <Grid />
      </main>
    </div>
  );
};

export default Home;
