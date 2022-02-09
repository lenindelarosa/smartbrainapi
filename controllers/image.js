const Clarifai = require('clarifai')

const app = new Clarifai.App({apiKey: '7789afab63904f769efd2a89f57c8dc7'})

const handleApiCall = (req, res) => {
    app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
        res.json(data);
    })
    .catch(err => res.status(400).json('Unable to call API'));
}

const handleImage = (req, res, db) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0].entries)
        })
        .catch(err => res.status(400).json('Unable to get entries count.'))
}

module.exports = {
    handleImage: handleImage,
    handleApiCall: handleApiCall
}