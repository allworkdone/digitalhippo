import next from "next"

const PORT = Number(process.env.PORT) || 9000

export const nextApp = next({
    dev: process.env.NODE_ENV !== "production",
    port: PORT
})

// this will be for self hosting
export const nextHandler = nextApp.getRequestHandler()
