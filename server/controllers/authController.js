const jwt = require('jsonwebtoken');
const Utilizator = require('../models/Utilizator');

const secretKey = 'secretul_tau_super_sigur'; 

class AuthController {
    
    static async signUp(req, res) {
        try {
            const { nume, email, parola, tipUtilizator } = req.body;

            const userExists = await Utilizator.findOne({ where: { email } });
            if (userExists) {
                if (userExists.isDeleted) {
                    return res.status(400).json({ message: 'Acest cont a fost șters logic. Nu poți înregistra din nou același email.' });
                } else {
                    return res.status(400).json({ message: 'Email deja utilizat.' });
                }
            }


            const newUtilizator = await Utilizator.create({
                nume,
                email,
                parola, 
                tipUtilizator
            });

            res.status(201).json({ message: 'Utilizator creat cu succes.', utilizator: newUtilizator });
        } catch (err) {
            res.status(500).json({ message: 'Eroare la înregistrare.', error: err.message });
        }
    }


    static async signIn(req, res) {
        try {
            const { email, parola } = req.body;

            const utilizator = await Utilizator.findOne({ where: { email } });
            if (!utilizator) {
                return res.status(404).json({ message: 'Email sau parolă incorectă.' });
            }

            if (utilizator.isDeleted) {
                return res.status(403).json({ message: 'Acest utilizator a fost șters logic și nu poate fi autentificat.' });
            }

            const isPasswordValid = await utilizator.verifyPassword(parola); 
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Email sau parolă incorectă.' });
            }

            const token = jwt.sign(
                { id: utilizator.idUtilizator, tipUtilizator: utilizator.tipUtilizator },
                secretKey,
                { expiresIn: '1h' } 
            );

            res.json({ message: 'Autentificare reușită.', token });
        } catch (err) {
            res.status(500).json({ message: 'Eroare la autentificare.', error: err.message });
        }
    }
}

module.exports = AuthController;
