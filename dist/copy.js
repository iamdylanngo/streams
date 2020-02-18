"use strict";

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const copyFile = (file, dir2) => {
  try {
    //gets file name and adds it to dir2
    // console.log("----------1");
    // console.log(file);
    // console.log(dir2);
    let f = _path.default.basename(file);

    let source = _fs.default.createReadStream(file); // console.log("----------2");
    // console.log(f);
    // console.log(source);


    let dest = _fs.default.createWriteStream(_path.default.resolve(dir2, f));

    source.pipe(dest);
    source.on('end', function () {
      console.log('Succesfully copied');
    });
    source.on('error', function (err) {
      console.log('Fail copy');
    });
  } catch (err) {
    console.log('Fail copy');
  }
};

copyFile(process.argv[2], process.argv[3]);