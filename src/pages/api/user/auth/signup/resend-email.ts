import repos from '@/infra/database';
import { HttpResponse } from '@/protocols/http';
import { jwt } from '@/utils/jwt';
import mail from '@/utils/mail';
import verifyEmailTemplate from '@/utils/mail/templates/verify-email';
import routerHandler from '@/utils/router-handler';
import { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';

const router = createRouter<NextApiRequest, NextApiResponse<HttpResponse>>();

router.post(async (req, res) => {
    const { name, username } = req.body;
    const email = String(req.body.email).toLocaleLowerCase();

    const existsUser = await repos.user.findByEmailOrUsername({ username, email });
    if (!existsUser) {
        return res.status(404).json({
            error: 'Usuario não econtrado'
        });
    }

    if(existsUser.verified) {
        return res.status(400).json({
            error: 'Esta conta já esta verificada'
        });
    }

    const verification_token = jwt.sign({ name, username, email }, {
        expiresIn: '10m',
        subject: name
    });

    const sendedMail = mail.sendMail({
        subject: 'Vamos validar sua conta!',
        html: verifyEmailTemplate({ hash: verification_token }),
        to: email,
    });

    console.log(verification_token);

    sendedMail.catch(() => {
        return res.status(500).json({
            error: 'Erro ao enviar o email'
        });
    });

    return res.status(200).json({
        data: {}
    });
});

export default routerHandler(router);