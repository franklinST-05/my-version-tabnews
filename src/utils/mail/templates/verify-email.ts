interface VerifyEmailTemplateProps {
    hash: string;
}

export default function verifyEmailTemplate(props: VerifyEmailTemplateProps) {

    const path = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/active-account/' : 'https://clone-tabnews.com.br/active-account/';

    return /*html*/`
        
        <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml">
        <head>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Vamos validar sua conta!</title>
        </head>

        <body style="font-family: Helvetica, Arial, sans-serif; margin: 0px; padding: 0px; background-color: #ffffff;">
        <table role="presentation"
            style="width: 100%; border-collapse: collapse; border: 0px; border-spacing: 0px; font-family: Arial, Helvetica, sans-serif; background-color: rgb(239, 239, 239);">
            <tbody>
            <tr>
                <td align="center" style="padding: 1rem 2rem; vertical-align: top; width: 100%;">
                <table role="presentation" style="max-width: 600px; border-collapse: collapse; border: 0px; border-spacing: 0px; text-align: left;">
                    <tbody>
                    <tr>
                        <td style="padding: 40px 0px 0px;">
                        <div style="padding: 20px; background-color: rgb(255, 255, 255);">
                            <div style="color: rgb(0, 0, 0); text-align: left;">
                            <h1 style="margin: 1rem 0">Vamos validar sua conta!</h1>
                            <p style="padding-bottom: 16px font-size: 12px; color: #444;">Falta pouco para validar sua conta</p>
                            <p style="padding-bottom: 16px">
                                <a href="${path}${props.hash}" target="_blank"
                                style="padding: 12px 24px; border-radius: 4px; color: #FFF; background: #2B52F5;display: inline-block;margin: 0.5rem 0;">
                                Entrar
                                </a>
                            </p>
                            <p style="padding-bottom: 8px; color:#444; font-size: 14px; ">Caso não tenha sido você que solicitou o acesso ignore este email e não compartilhe</p>
                            <p style="padding-bottom: 16px color: #555; font-size: 12px;"><b>Obrigado,</b><br>time do Tabnews</p>
                            </div>
                        </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
                </td>
            </tr>
            </tbody>
        </table>
        </body>
        </html>
    `;
}