const Mail = use('Mail')

exports.sendMail = async (to, subject, message, attach, cc, bcc) => {
  try {
    await Mail.raw(message, (msg) => {
      msg.from('infohighit@eichechile.com', 'Highit')
      msg.to(to)
      msg.subject(subject)
     // msg.cc('slimedeal@user.com')
      msg.bcc(bcc)
      if (attach) {
        msg.attach(attach)
      }
    })
    return 'Message sent';
  } catch (error) {
    console.log(error, 'Error al Enviar Correo')
  }
};
