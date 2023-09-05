
export default class PassengersRepository {
    async postPassengerDB(firstName, lastName) {
        const query = `
            insert into public.passengers ("firstName", "lastName") values ($1, $2)
        `;
            const values = [postId];

        try {
            const result = await db.query(query, values);
            return result.rows[0];
        } catch (error) {
            console.error(error);
            return false;
        }
    }

        // if (typeof newPassenger === 'object' && newPassenger !== null) {
        //     // this.passengers.push(newPassenger);

        //     return { success: true, message: 'Passageiro adicionado com sucesso!' };
        // } else {
        //     return { success: false, message: 'Passageiro inválido. Deve ser um objeto válido.' };
        // }
    
}
