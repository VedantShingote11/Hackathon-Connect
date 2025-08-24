
export const getConnections = async (email) => {
    try {
        const req = await fetch(`/api/connection?email=${email}`);
        if (!req.ok) {
            return { success: false };
        }

        const res = await req.json();

        return res;

    } catch (error) {
        return { success: false };
    }
}

export const search = async (query) => {
    try {
        const req = await fetch(`/api/search?query=${query}`);
        if (!req.ok) {
            return { success: false };
        }

        const res = await req.json();

        return res;

    } catch (error) {
        console.log("Error while getting connections", error)
        return { success: false };
    }
}

export const invite = async (invitation) => {
    try {
        const send = await fetch('/api/connection', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(invitation)
        })
        if (!send.ok) return { success: false };

        const res = await send.json();

        return res;

    } catch (error) {
        console.log("Error while sending invitation", error)
        return { success: false };
    }
}

export const getNotifications = async (userId) => {
    try {
        const req = await fetch(`/api/connection/${userId}`);
        if (!req.ok) {
            return { success: false };
        }

        const res = await req.json();

        return res;
    } catch (error) {
        console.log("Error while getting notifications", error)
        return { success: false };
    }
}

export const accept = async (id) => {
    try {
        const req = await fetch('/api/connection/accept', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id})
        })
        if (!req.ok) {
            return { success: false };
        }

        const res = await req.json();

        return res
    } catch (error) {
        console.log("Error while accepting request", error)
        return { success: false };
    }
}