export interface CustomError extends Error {
    status?: number
}

function throwError(message: string, status?: number) {
    const error: CustomError = new Error(message)
    if (status) {
        error.status = status
    }
    throw error;
}

export default throwError