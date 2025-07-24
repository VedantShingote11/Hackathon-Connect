
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

export const createEvent = async (event) => {
    try {
        const req = await fetch('/api/event/', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(event)
        });
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