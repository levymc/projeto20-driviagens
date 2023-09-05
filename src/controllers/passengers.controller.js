import PassengersRepository from "../repositories/passengers.repository.js";

export default class PassengersController {
    constructor() {
        this.passengersRepository = new PassengersRepository()
    }

    handlePostPassenger(req, res) {
        const newPassenger = req.body;
        console.log("AUI")

        console.log(newPassenger)
    }
}
