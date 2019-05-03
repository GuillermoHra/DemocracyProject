const mongoose = require('mongoose')
const connectionURL = 'mongodb+srv://guillermohra:ClaseWeb2019.@clustertest-pxlfo.mongodb.net/DemocracyProject?retryWrites=true'

mongoose.connect(connectionURL, {
    useNewUrlParser:true,
    useCreateIndex: true
})