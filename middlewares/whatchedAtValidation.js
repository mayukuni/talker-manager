// https://www.regextester.com/99555
const whatchedAtValidation = (req, res, next) => {
    const { talk } = req.body;
    const regexDate = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;
  //   const validDate = regexDate.test(talk.whatchedAt);

    if (!regexDate.test(talk.watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
    }
    next();
};

module.exports = whatchedAtValidation;