"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useContext } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  getMovieByIdUpdate,
  deleteMovieById,
  getMovieUser,
} from "@/components/widgets/movies.api";
import { movieContext } from "@/context/MovieContext";
import { FaTrash } from "react-icons/fa";
import { MovieDB } from "@/context/interfaces/movieTypes";
import SvgBluRay from "@/utils/svgs/SvgBluRay";
import SvgDvd from "@/utils/svgs/SvgDvd";
import SvgVhs from "@/utils/svgs/SvgVhs";
import { IoIosArrowBack } from "react-icons/io";
import Modal from "@/components/widgets/Modal";

const EditMovie: React.FC = () => {
  const [movieToEdit, setMovieToEdit] = useState<MovieDB | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalActions, setModalActions] = useState<{ label: string; onClick: () => void; className?: string }[]>([]);
  const pathname = usePathname();
  const router = useRouter();
  const movieContextValue = useContext(movieContext);
  if (!movieContextValue || !movieContextValue.setMovie) {
    throw new Error("movieContext is not properly initialized.");
  }
  const { setMovie } = movieContextValue;
  const id = pathname.split("/").pop();

  useEffect(() => {
    const fetchMovie = async () => {
      if (id) {
        try {
          const movie = await getMovieUser(id);
          console.log("🚀 ~ fetchMovie ~ movie:", movie)
          console.log("🚀 ~ fetchMovie ~ getMovieUser:", getMovieUser)
          const movieData = await movie.response;
          setMovieToEdit(movieData);
        } catch (error) {
          console.error("Failed to fetch movie:", error);
        }
      }
    };

    fetchMovie();
  }, [id]);

  const handleFormatChange = (format: keyof MovieDB["formats"]) => {
    if (movieToEdit) {
      setMovieToEdit((prev) => {
        if (!prev) return prev;
        const newValue = !prev.formats[format];
        return {
          ...prev,
          formats: {
            ...prev.formats,
            [format]: newValue,
          },
        };
      });
    }
  };

  const checkFormats = async () => {
    if (movieToEdit) {
      const { vhs, dvd, bluray } = movieToEdit.formats;
      if (vhs || dvd || bluray) {
        setModalMessage(
          "¡Atención! Alguno de los formatos (VHS, DVD o Blu-ray) está disponible."
        );
        setModalActions([
          {
            label: "Aceptar",
            onClick: async () => {
              await onSubmitEdit(movieToEdit);
              setIsModalOpen(false);
            },
          },
        ]);
        setIsModalOpen(true);
      } else {
        setModalMessage("Al menos tiene que tener un formato.");
        setModalActions([
          {
            label: "Cerrar",
            onClick: () => setIsModalOpen(false),
          },
        ]);
        setIsModalOpen(true);
      }
    }
  };

  const onSubmitEdit = async (movie: MovieDB) => {
    const { formats } = movie;
    try {
      const response = await getMovieByIdUpdate(id!, { formats });
      if (!response) {
        throw new Error("Failed to update.");
      }
      router.refresh();
      router.push("/");
    } catch (error) {
      console.error("Failed to update movie:", error);
    }
  };

  const onSubmitDelete = async () => {
    try {
      await deleteMovieById(id!);
      router.refresh();
      router.push("/");
    } catch (error) {
      console.error("Failed to delete movie:", error);
    }
  };

  const handleDelete = () => {
    setModalMessage("¿Estás seguro? No podrás revertir esto.");
    setModalActions([
      {
        label: "Cancelar",
        onClick: () => setIsModalOpen(false),
        className: "bg-gray-500 text-white hover:bg-gray-600",
      },
      {
        label: "Sí, bórralo",
        onClick: async () => {
          await onSubmitDelete();
          setIsModalOpen(false);
          setMovie(null);
        },
        className: "bg-red-500 text-white hover:bg-red-600",
      },
    ]);
    setIsModalOpen(true);
  };

  const myLoader = ({
    src,
    width,
    quality,
  }: {
    src: string;
    width: number;
    quality?: number;
  }) => {
    return `https://image.tmdb.org/t/p/w500${src}?w=${width}&q=${
      quality || 75
    }`;
  };

  if (!movieToEdit) {
    return <div className="text-neutral-900">Loading...</div>;
  }

  return (
    <div className="h-[calc(100vh-56px)] overflow-auto md:h-screen w-screen flex items-center md:max-h-[956px]">
      <div className="container h-full md:max-h-[956px] 2xl:h-5/6  bg-neutral-300 dark:bg-neutral-950 mx-auto gap-4 p-4 flex flex-col lg:flex-row w-full overflow-auto ">
        <div className="relative flex rounded-lg h-full p-4 aspect-h-6-9">
          <Image
            loader={myLoader}
            src={
              movieToEdit._id.poster_path
                ? movieToEdit._id.poster_path
                : "/images/poster.jpg"
            }
            alt={movieToEdit._id.title || "Movie Poster"}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
        <div className="text-black dark:text-neutral-200 flex flex-col justify-between w-full gap-2 lg:gap-4 ">
          <div>
            <div className="flex justify-between items-center mb-1 lg:mb-4">
              <h1 className="text-xl md:text-2xl">{movieToEdit._id.title}</h1>
              <Link
                href="/"
                className=" text-blue-500 dark:text-yellow-500 text-3xl"
              >
                <IoIosArrowBack />
              </Link>
            </div>
            <p className="text-sm md:text-base mb-1 md:mb-4">
              {movieToEdit._id.release_date &&
                movieToEdit._id.release_date.split("T")[0]}
            </p>
            <div className="flex mb-1">
              {movieToEdit._id.genres &&
                movieToEdit._id.genres.map((genre) => (
                  <p key={genre.id} className="text-sm md:text-base pe-1">
                    {genre.name}
                  </p>
                ))}
            </div>
            <div className="h-[80px] lg:h-96 overflow-y-auto">
              <p className="text-xs md:text-base text-neutral-500">
                {movieToEdit._id.overview}
              </p>
            </div>
          </div>
          <div>
            <div className="flex justify-between lg:justify-start mb-2 md:mb-4 gap-2 md:gap-4 items-stretch dark:text-neutral-800">
              <button
                onClick={() => handleFormatChange("vhs")}
                className={`p-2 md:p-2 w-28 md:w-24 h-10 rounded-lg outline outline-none hover:outline-offset-3 hover:cursor-pointer ${
                  movieToEdit.formats?.vhs
                    ? "text-blue-500 dark:text-yellow-500"
                    : "text-neutral-400 dark:text-neutral-700"
                } hover:outline-blue-500 dark:hover:outline-yellow-500 bg-neutral-100 dark:bg-neutral-900`}
              >
                <SvgVhs className="w-16 h-5 mx-auto" />
              </button>
              <button
                onClick={() => handleFormatChange("dvd")}
                className={`p-2 md:p-2 w-28 md:w-24 h-10 rounded-lg outline outline-none hover:outline-offset-3 hover:cursor-pointer ${
                  movieToEdit.formats?.dvd
                    ? "text-blue-500 dark:text-yellow-500"
                    : "text-neutral-400 dark:text-neutral-700"
                } hover:outline-blue-500 dark:hover:outline-yellow-500 bg-neutral-100 dark:bg-neutral-900`}
              >
                <SvgDvd className="w-16 h-5 mx-auto" />
              </button>
              <button
                onClick={() => handleFormatChange("bluray")}
                className={`p-2 md:p-2 w-28 md:w-24 h-10 rounded-lg outline outline-none hover:outline-offset-3 hover:cursor-pointer ${
                  movieToEdit.formats?.bluray
                    ? "text-blue-500 dark:text-yellow-500"
                    : "text-neutral-400 dark:text-neutral-700"
                } hover:outline-blue-500 dark:hover:outline-yellow-500 bg-neutral-100 dark:bg-neutral-900`}
              >
                <SvgBluRay className="w-16 h-5 mx-auto" />
              </button>
              <button
                onClick={handleDelete}
                className="p-2 w-28 md:w-24 bg-neutral-100 dark:bg-neutral-900 text-red-500 dark:text-red-600 rounded-lg  flex items-center justify-center outline outline-none hover:outline-offset-3 hover:outline-blue-500 dark:hover:outline-yellow-500 hover:cursor-pointer h-auto"
              >
                <FaTrash />
              </button>
            </div>
            <div className="flex">
              <button
                onClick={checkFormats}
                className="p-3 md:p-5 bg-blue-500 dark:bg-yellow-500 rounded-lg md:rounded-lg w-full text-black dark:text-neutral-900"
              >
                Terminar
              </button>
            </div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Mensaje"
        actions={modalActions}
      >
        {modalMessage}
      </Modal>
    </div>
  );
};

export default EditMovie;