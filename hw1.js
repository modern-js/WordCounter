function countWords(line) {
  var index = {};
  var words = line
              .replace(/[.,?!;()"'-]/g, " ")
              .replace(/\s+/g, " ") //normalize whitespaces
              .toLowerCase()
              .split(" ");

    words.forEach(function (word) {
        if (!(index.hasOwnProperty(word))) {
            index[word] = 0;
        }
        index[word]++;
    });

    for (var key in index) {
    // check if the property/key is defined in the object itself, not in parent
    if (index.hasOwnProperty(key)) {
      console.log(key, index[key]);
    }}
    //histogram

    var metricsd = require('metricsd'),
    metrics = metricsd({
        //host: "localhost",
        //port: 8125,
        enabled: true,
        log: true,
        logger: console.log,
        prefix: null,
        timeout: 1000
    });

    var histogram = metrics.histogram('WordCount');
    for (var key in index) {
    if (index.hasOwnProperty(key)) {
      histogram.update(index[key]);
    }}
}

/*
process.argv will have lenght two, the zeroth item bieng the
"node" interpreter and the first being the script that node
is currently runing
once a filename is pulled from argv, the filesystem functions
can be used to read the file and do whatever one wants
*/
if (process.argv.length<3){
  console.log('Usage: node ' + process.argv[1] + ' FILENAME')
  process.exit(1);
}
var fs = require('fs');
var filename = process.argv[2];
fs.readFile(filename, 'utf8', function(err, data) {
  if (err) throw err;
  countWords(data);
});
