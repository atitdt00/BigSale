import Frontend from "../Layouts/Frontend";
import PCard from "../Components/PCard";
import Slider from "../Components/Slider";

function Home() {
  return (
    <Frontend>
      <div className="relative">
        <Slider />
      </div>
      <div className="w-full min-h-fit">
        <PCard />
      </div>
    </Frontend>
  );
}

export default Home;
