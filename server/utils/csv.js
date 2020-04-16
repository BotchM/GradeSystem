const fs = require('fs');
const path = require('path');
const { parseStream } = require('fast-csv');
const csv = require('fast-csv');

exports.parse = file => new Promise((resolve, reject) =>{
    const stream = fs.createReadStream(file)
    let students = [];

    parseStream(stream, { headers: true })
        .transform((data, cb) => {
            setImmediate(() => cb(null, data));
        })
        .validate((row, cb) => {
            if(row.studentID == 'total'){
                const conditions = [row.quizzes * 1 + row.midterm * 1 + row.final * 1 == 100];
                const isValid = conditions.reduce((r, d, i) => !d ? (r.push(i), r) : r , []);
                if(Array.isArray(isValid) && isValid.length){
                    return cb(null, false, `Condition/s: ${isValid}`);
                }
            }
    
            return cb(null, true);
        })
        .on('error', error => console.error(error))
        .on('data', row => students.push(row))
        .on('data-invalid', (row, rowNumber, reason) => {
            console.log(`Invalid [rowNumber=${rowNumber}] [row=${JSON.stringify(row)}] [reason=${reason}]`);

            reject(new Error('The total is not equal to 100!'))
        })
        .on('end', rowCount => {
            resolve(students);
            fs.unlinkSync(file);
        });
})
