const config = require('../config')
const sendGrid = require('sendgrid')(config.sendgridKey) //Key

exports.send = async (to, subject, body) => {
    sendGrid.send({
        to: to,
        from: 'marcos@Machado.com.br',
        subject: subject,
        html: body
    })
}