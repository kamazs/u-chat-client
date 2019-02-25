/** Log message
 * @param msg Message to be logged
 */
export function log(msg: string) {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
        console.log(msg);
    }
}
