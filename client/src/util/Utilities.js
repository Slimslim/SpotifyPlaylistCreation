export function msToHMS(milliseconds) {
    let hours = Math.floor(milliseconds / 3600000);
    let minutes = Math.floor((milliseconds % 3600000) / 60000);
    let seconds = Math.floor(((milliseconds % 3600000) % 60000) / 1000);

    if (hours === 0) {
        return `${minutes.toString().padStart(2, "0")}m ${seconds
            .toString()
            .padStart(2, "0")}s`;
    } else {
        return `${hours.toString().padStart(2, "0")}h ${minutes
            .toString()
            .padStart(2, "0")}m ${seconds.toString().padStart(2, "0")}s`;
    }
}
