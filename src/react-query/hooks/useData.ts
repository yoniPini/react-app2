import { useQuery } from "@tanstack/react-query";
import axios from "axios";

  
const useData = <T>(endpoint: string, userId?: number | undefined, staleTime?: number) => {
    const fetch = () =>
        axios
        .get("https://jsonplaceholder.typicode.com" + endpoint, {
            params: {
                userId
            }
        })
        .then((res) => res.data);
    
    return useQuery<T[], Error>({
        queryKey: userId ? ['users', userId,endpoint.slice(1, ) ]: [endpoint.slice(1, )],
        queryFn: fetch,
        staleTime: (staleTime || 10_000),
    });
}

export default useData;