"use client";
import { fetcher } from "@/utils/fetcher";
import React, { useState } from "react";

const Student = () => {
    const [data, setData] = useState<any>();

    const fetchData = async () => {
        try {
            const res = await fetcher(`/api/thesis/requests/incoming`, {
                method: "GET",
            });

            console.log("RES", res);
        } catch (err) {
            console.error("Error fetching thesis:", err);
            setData(null);
        } finally {
            console.log("TEST");
        }
    };

    fetchData();

    return <div>Student</div>;
};

export default Student;
