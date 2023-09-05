
export default class PassengersController {
    async handlePostPassenger(req, res) {
        if(res.insertedId) res.status(201).send(res.insertedId)
        else res.status(404).send("Ocorreu algum erro")
    }
}
