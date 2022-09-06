const MB = 5; // 5 MB file limit
const FILE_SIZE_LIMIT = MB * 1024 * 1024;

const fileSizeLimiter = (req, res, next) => {
    const files = req.files;
    const filesOverLimit = [];
    Object.keys(files).forEach(key => {
        if(files[key].size > FILE_SIZE_LIMIT) {
            filesOverLimit.push(files[key].name);
        }
    })

    if(filesOverLimit.length) {
        res.status(413);
        const verb = filesOverLimit.length > 1 ? 'are' : 'is';
        const sentence = `Upload faile. ${filesOverLimit.toString()} ${verb} over the file size limit of ${MB} MB.`. replace(/,/g, ', ');
        const message = filesOverLimit.length < 3
            ? sentence.replace(',', " and")
            : sentence.replace(/,(?=[^,]*$)/, " and");
        throw new Error(message);
    }

    next();
}

module.exports = fileSizeLimiter;