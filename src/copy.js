import fs from 'fs';
import path from 'path';

const copyFile = (file, dir2) => {
    try {
        //gets file name and adds it to dir2
        // console.log("----------1");
        // console.log(file);
        // console.log(dir2);
        let f = path.basename(file);
        let source = fs.createReadStream(file);
        // console.log("----------2");
        // console.log(f);
        // console.log(source);

        let dest = fs.createWriteStream(path.resolve(dir2, f));

        source.pipe(dest);
        source.on('end', function () { console.log('Succesfully copied'); });
        source.on('error', function (err) { console.log('Fail copy'); });
    } catch(err) {
        console.log('Fail copy');
    }
};


copyFile(process.argv[2], process.argv[3]);