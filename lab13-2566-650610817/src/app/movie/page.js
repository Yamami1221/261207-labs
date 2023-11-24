import { MovieRow } from "@/components/MovieRow";
import { movieDB } from "@/libs/movieDB";

export default function MoviePage() {
  return (
    <div>
      <p className="fw-bold fs-4 text-center">Top 10 Movies</p>
      {movieDB.map((movie, i) => (
        <MovieRow
          key={movie.id}
          id={movie.id}
          title={movie.title}
          detail={movie.detail}
          rating={movie.rating}
          number={i + 1}
        />
      ))}
    </div>
  );
}
