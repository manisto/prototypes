import fs from "fs";

const delimiter = ",";

fs.readFile("./speedtest.csv", { encoding: "utf-8" }, readFileCallback)

function readFileCallback(error, data) {
    const lines = data.split("\n");
    const headers = lines.shift().toLowerCase().split(delimiter);
    const timestampIndex = headers.indexOf("timestamp");
    const pingIndex = headers.indexOf("ping");
    const downloadIndex = headers.indexOf("download");
    const uploadIndex = headers.indexOf("upload");

    const parsedLines = lines.map((line) => {
        if (line === "") {
            return null;
        }

        const cells = line.split(delimiter);
        const timestamp = cells[timestampIndex];
        const ping = toInt(cells[pingIndex]);
        const download = toInt(cells[downloadIndex]);
        const upload = toInt(cells[uploadIndex]);

        return [timestamp, ping, download, upload];
    });

    writeResults(parsedLines);
}

function toInt(cell) {
    const parts = cell.split(".");
    return Number(parts[0]);
}

function writeResults(lines) {
    const resultString = lines.map(line => line ? line.join(delimiter) : null).join("\n");
    fs.writeFile("./data.csv", resultString, { encoding: "utf-8" }, writeFileCallback);
}

function writeFileCallback(error) {
    console.log("Done!");
}