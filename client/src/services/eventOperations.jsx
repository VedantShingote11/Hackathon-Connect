
export const getEvents = async () => {
    try {
        const req = await fetch('/api/event');
        if (!req.ok) {
            return { success: false };
        }

        const res = await req.json();

        return res;

    } catch (error) {
        console.log("Error while getting event details", error)
        return { success: false };
    }
}

export const getEventDetails = async (id) => {
    try {
        const req = await fetch(`/api/event/${id}`);
        if (!req.ok) {
            return { success: false };
        }

        const res = await req.json();

        return res;

    } catch (error) {
        console.log("Error while getting event details", error)
        return { success: false };
    }
}