import { BASE_URL } from "../utils.js/consts";

export const generateRandomSeed = async () => {
    try {
        const response = await fetch(`${BASE_URL}/api/seed`);
        const data = await response.json();
        return data.seed;
    } catch (error) {
        console.error("Error fetching random seed:", error);
    }
};

export const generateUsersData = async (region, countUsers, errorCount, seed, page) => {
    try {
        const response = await fetch(`${BASE_URL}/api/data`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ region, countUsers, errorCount, seed, page }),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching user data:", error);
    }
};
