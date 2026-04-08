import { useEffect, useState } from "react";
import { getCenters } from "../services/centerService";
import type { Center } from "../types/center";

export function useCenters() {
    const [centers, setCenters] = useState<Center[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);

    useEffect(() => {
        const fetchCenters = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await getCenters(currentPage);

                setCenters(response.data);
                setCurrentPage(response.meta.current_page);
                setLastPage(response.meta.last_page);
            } catch(err : any) {
                setError(err?.response?.data?.message || "Failed to fetch centers");
                setCenters([]);
            } finally {
                setLoading(false);
            }
        };

        fetchCenters();
    }, [currentPage]);

    return {
        centers,
        loading,
        error,
        currentPage,
        lastPage,
        setCurrentPage,
    };
}