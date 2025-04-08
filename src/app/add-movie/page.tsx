import { AddMovie } from "@/components/add-movie/AddMovie";
import envsUtils from "@/utils/envs.utils";

export default function Page() {
  
  const apiKey: string = envsUtils.API_KEY ?? "default-api-key";

  return (
    <div>
      <AddMovie apiKey={apiKey} />
    </div>
  );
}