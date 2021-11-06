export class DataNotFoundError extends Error {
    constructor() {
        super("Data not Found");
        this.name = "DataNotFoundError";
    }
}
