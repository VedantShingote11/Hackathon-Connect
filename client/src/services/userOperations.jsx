
export const getUser = async (email) => {

    try {

        const req = await fetch(`/api/user?email=${email}`);

        if (!req.ok) {
            return { success: false };
        }

        const res = await req.json();

        return res;

    } catch (error) {
        console.log("Error while getting user info", error)
        return { success: false };
    }
}