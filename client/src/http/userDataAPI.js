const url = "http://localhost:9000/api";
// const url = "https://random-user-data-app.onrender.com";

export const generateRandomSeed = async () => {
    try {
        const response = await fetch(`${url}/seed`);
        const data = await response.json();
        return data.seed;
    } catch (error) {
        console.error("Error fetching random seed:", error);
    }
};

export const generateUsersData = async (region, countUsers, errorCount, seed, page) => {
    try {
        const response = await fetch(`${url}/data`, {
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
