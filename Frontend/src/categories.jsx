// src/categories.js
import React, { useEffect, useState } from "react";
import { iconMap } from "./iconMap"; // Import the icon mapping

// Hook to fetch categories from backend
export const useCategories = () => {
    const [categoryArray, setCategoryArray] = useState([]);
    const [categoryIcons, setCategoryIcons] = useState({});

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch("https://expense-tracker-mern-project-g2yt.onrender.com/admin/categories", {
                    method: "GET",
                    credentials: "include",
                });
                const data = await res.json();

                // Build categoryArray with JSX icons
                const arr = (data.categories || []).map((cat) => ({
                    ...cat,
                    icon:
                        iconMap[cat.iconKey] &&
                        React.createElement(iconMap[cat.iconKey], { className: cat.color }),
                }));

                // Build categoryIcons lookup
                const icons = arr.reduce((acc, cat) => {
                    acc[cat.name] = cat.icon;
                    return acc;
                }, {});

                setCategoryArray(arr);
                setCategoryIcons(icons);
            } catch (err) {
                console.error("Error fetching categories:", err);
            }
        };

        fetchCategories();
    }, []);

    return { categoryArray, categoryIcons };
};
