import MovieList from "@/components/list/MovieList";
import SearchBar from "@/components/widgets/SearchBar";
import OrderListButtons from "@/components/menu/OrderListButtons";
import FilterFormatsButtons from "@/components/menu/FilterFormatsButtons";
import MiniCardViewer from "@/components/list/MiniCardViewer";

const page = () => {
  return (
    <div className="h-[calc(100vh-56px)] lg:h-screen  w-full bg-neutral-300 dark:bg-neutral-950 flex flex-col p-4 gap-4">
      <SearchBar></SearchBar>
      <div className="flex rounded-lg h-44 bg-neutral-100 dark:bg-neutral-900 overflow-hidden">
        <div className="flex flex-col flex-grow justify-evenly overflow-hidden">
          <div>
            <OrderListButtons></OrderListButtons>
          </div>
          <FilterFormatsButtons></FilterFormatsButtons>
        </div>
        <div className="overflow-hidden">
          <MiniCardViewer></MiniCardViewer>
        </div>
      </div>
      <MovieList></MovieList>
    </div>
  );
};

export default page;