export interface Movie {
  id: number;
  title: string;
  release_date: string;
  poster_path: string | null;
  backdrop_path?: string; // Fondo de la película (opcional)
  overview: string;
  genres: { id: number; name: string }[];
  director: string;
  year: number;
  belongs_to_collection?: {
    id: number;
    name: string;
    poster_path: string | null;
    backdrop_path: string | null;
  };
  budget?: number; // Presupuesto de la película (opcional)
  homepage?: string; // Página web oficial de la película (opcional)
  imdb_id?: string; // ID de IMDb (opcional)
  origin_country?: string[]; // Países de origen (opcional)
  original_language?: string; // Idioma original (opcional)
  original_title?: string; // Título original (opcional)
  popularity?: number; // Popularidad de la película (opcional)
  production_companies?: {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  }[];
  production_countries?: {
    iso_3166_1: string;
    name: string;
  }[];
  revenue?: number; // Ingresos generados por la película (opcional)
  runtime?: number; // Duración de la película en minutos (opcional)
  spoken_languages?: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status?: string; // Estado de la película (por ejemplo, "Released") (opcional)
  tagline?: string; // Eslogan de la película (opcional)
  video?: boolean; // Indica si es un video (opcional)
  vote_average?: number; // Promedio de votos (opcional)
  vote_count?: number; // Número de votos (opcional)
}

export interface MovieDB {
  _id: {
    id: number;
    title: string;
    release_date: string;
    backdrop_path: string;
    _id?: string;
    poster_path: string;
    overview: string;
    genres: {
      id: number;
      name: string;
      _id: {
        $oid: string;
      };
    }[];
    belongs_to_collection?: {
      id: number;
      name: string;
      poster_path: string | null;
      backdrop_path: string | null;
    };
    budget: number;
    homepage: string;
    imdb_id: string;
    origin_country: string[];
    original_language: string;
    original_title: string;
    popularity: number;
    production_companies: {
      id: number;
      logo_path: string | null;
      name: string;
      origin_country: string;
      _id: {
        $oid: string;
      };
    }[];
    production_countries: {
      iso_3166_1: string;
      name: string;
      _id: {
        $oid: string;
      };
    }[];
    revenue: number;
    runtime: number;
    spoken_languages: {
      english_name: string;
      iso_639_1: string;
      name: string;
      _id: {
        $oid: string;
      };
    }[];
    status: string;
    tagline: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
    createdAt: {
      $date: string;
    };
    updatedAt: {
      $date: string;
    };
  };
  formats: {
    vhs: boolean;
    dvd: boolean;
    bluray: boolean;
  };
  checked: boolean;
}

export interface CreateMovieInterface {
  checked: boolean
  formats: {
    vhs: boolean
    dvd: boolean
    bluray: boolean
  }
  _id: string
}

export interface LocalMovie {
  _id: {
    _id: string;
    title: string;
    checked: boolean;
    formats: {
      dvd: boolean;
    };
  };
}


export interface UserMovie {
  _id?: string
  formats?: {
    vhs: boolean
    dvd: boolean
    bluray: boolean
  }
  checked?: boolean
}

export interface isOnline {
  message: string;
  response: UserData
}

export interface UserData {
  email: string;
  firstname: string;
  isOnline: boolean;
  mode: string;
  role: string;
  user_id: string;
  username: string;
}


export interface User {
  username: string;
  password: string;
  firstname: string;
  lastname: string;
  email: string;
}

export interface UserMoviesResponse {
  message: string;
  response: {
    _id: string;
    user_id: string;
    movies: MovieDB[];
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
}

export interface UserMovieResponse {
  message: string;
  response: MovieDB
}