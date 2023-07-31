import { useQuery } from "@tanstack/react-query";
import axios from "axios";

  
const useData = <T>(endpoint: string, staleTime?: number) => {
    const fetch = () =>
        axios
        .get("https://jsonplaceholder.typicode.com" + endpoint)
        .then((res) => res.data);
    
    return useQuery<T[], Error>({
        queryKey: [endpoint],
        queryFn: fetch,
        staleTime: (staleTime || 10_000),
    });
}

export default useData;