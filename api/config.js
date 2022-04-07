const path = require('path');
const rootPath = __dirname;

module.exports = {
    rootPath,
    avatarsUploadPath: path.join(rootPath, 'public/uploads/images/avatars'),
    mongo: {
        db: 'mongodb://localhost/cocktails',
        options: {useNewUrlParser: true},
    },
    facebook: {
        appId: '705997010842508',
        appSecret: '0f12bc24b220de5ebec43fe7d4572cd4',
    }
}