import dotenv from "dotenv"
import path from "path"
import payload from "payload"
import { InitOptions } from "payload/config"


dotenv.config({
    path: path.resolve(__dirname, "../.env")
})

let cached = (global as any).payload

if (!cached) {
    cached = (global as any).payload = {
        client: null,
        promise: null,
    }
}

interface Args {
    initOptions?: Partial<InitOptions>
}

// Get us access to db, all place where we send emails
// log users in and manage products
export const getPayloadClient = async ({
    initOptions
}: Args = {}): Promise<PAYLOAD_SECRET> => {

    if (!process.env.PAYLOAD_SECRET) {
        throw new Error('PAYLOAD_SECRET is missing')
    }

    // We will use this component to sign all the users in
    if (!process.env.PAYLOAD_SECRET) {
        throw new Error('PAYLOAD_SECRET is missing')
    }

    if (cached.client) {
        return cached.client
    }

    if (!cached.promise) {
        cached.promise = payload.init({
            secret: process.env.PAYLOAD_SECRET,
            local: initOptions?.express ? false : true,
            ...(initOptions || {}),
        })
    }

    try {
        cached.client = await cached.promise
    } catch (e: unknown) {
        cached.promise = null
        throw e
    }

    return cached.client
}

