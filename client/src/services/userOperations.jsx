
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

export const saveUser = async (email , name) => {
    try {
        const req = await fetch('/api/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email , userName : name}),
        });

        const res = await req.json();
        
        return { success: true };

    } catch (error) {
        console.log("Error while saving user info", error)
        return { success: false };
    }
}