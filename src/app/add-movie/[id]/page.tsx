import MovieDetailsClient from "./MovieDetailsClient";
import envsUtils from "@/utils/envs.utils";


interface Movie {
    id: number;
    title: string;
    release_date: string;
    poster_path: string | null;
    overview: string;
    genres: { id: number; name: string }[];
    formats: {
      vhs: boolean;
      dvd: boolean;
      bluray: boolean;
    };
    director: string;
    year: number;
  }

interface Params {
  id: string;
}

export default async function MoviePage({ params }: { params: Promise<Params> }) {
  
    const resolvedParams = await params; // Esperar a que params se resuelva
    const res = await fetch(`https://api.themoviedb.org/3/movie/${resolvedParams.id}?api_key=${envsUtils.API_KEY}`);
  
    if (!res.ok) {
      throw new Error("Failed to fetch movie");
    }
  
    const movie: Movie = await res.json();
  
    return <MovieDetailsClient movie={movie} />;
  }
  
