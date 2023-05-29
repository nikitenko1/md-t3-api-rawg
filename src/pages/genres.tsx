import Body from "../components/Body";
import SecondHeader from "../components/SecondHeader";
import PlatformCard from "../components/PlatformCard";
import { useQuery } from "@tanstack/react-query";
import fetchData from "../../rawg/fetchData";
import { GenreResp } from "../../interface";
import { v4 } from "uuid";

const GenrePage = () => {
  const { data: genres } = useQuery<GenreResp>(
    ["fetchGenres"],
    () => fetchData(`https://api.rawg.io/api/genres?`),
    {
      refetchOnWindowFocus: false,
      staleTime: 1000000,
    }
  );

  return (
    <Body>
      <SecondHeader title="Genres" />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {genres?.results.map((genre) => (
          <PlatformCard key={v4()} platform={genre} />
        ))}
      </div>
    </Body>
  );
};

export default GenrePage;
