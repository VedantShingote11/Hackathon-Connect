
export const getTeams = async () => {
    try {
        const req = await fetch('/api/team');
        if (!req.ok) {
            console.log("Error while getting teams");
            return { success: false };
        }
        const res = await req.json();

        return res;

    } catch (error) {
        console.log("Error while getting teams", error)
        return { success: false };
    }
}

export const createTeam = async (team) => {
    try {
        const req = await fetch('/api/team', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(team),
        })

        if (!req.ok) {
            console.log("Error while creating teams");
            return { success: false };
        }

        const res = await req.json();

        return res;

    } catch (error) {
        console.log("Error while creating teams", error)
        return { success: false };
    }
}

export const deleteTeam = async (teamId) => {
    try {
        const req = await fetch('/api/team', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: teamId }),
        })
        if (!req.ok) {
            return { success: false };
        }

        const res = await req.json();

        return res;

    } catch (error) {
        console.log("Error while deleting team", error)
        return { success: false };
    }
}

export const getTeam = async (chatId) => {
    try {
        const req = await fetch(`/api/team/${chatId}`);
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




