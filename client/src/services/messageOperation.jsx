export const getMessage = async (chatId) => {
    try {
        const req = await fetch(`/api/chat?chatId=${chatId}`);
        if (!req.ok) {
            return { success: false };
        }

        const res = await req.json();

        return res;

    } catch (error) {
        console.log("Error while getting message", error)
        return { success: false };
    }
}

export const sendMessage = async (message) => {
    try {
        const req = await fetch('/api/chat/', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(message)
        });
        if (!req.ok) {
            return { success: false };
        }

        const res = await req.json();

        return res;

    } catch (error) {
        console.log("Error while sending message", error)
        return { success: false };
    }
}