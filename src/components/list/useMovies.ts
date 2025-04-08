"use client";
import { getUserMovies } from "../widgets/movies.api";
import { useState, useEffect } from "react";
import { MovieDB } from "@/context/interfaces/movieTypes";

export const useMovies = () => {
  const [data, setData] = useState<MovieDB[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getUserMovies();  
        setData(result.response.movies);
      } catch (err: unknown) {
        console.error("Error fetching movies:", err);
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, error, loading };
};