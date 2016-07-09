
//Start off with what passes the first test.
function KNN(kSize){
	this.kSize = kSize;
	this.points = [];
}

KNN.prototype.train = function(points) {
  this.points = this.points.concat(points)
};

KNN.prototype._distance = function(vector1, vector2) {
  return Math.sqrt(vector1.map(function (coordinate, index){
    return Math.pow((coordinate - vector2[index]), 2)
  }).reduce((prev, curr) => prev + curr))
};

KNN.prototype._distances = function(vector1, arrayOfVectors) {
  return arrayOfVectors.map(function(data){
    return [this._distance(vector1, data[0]), data[1]]
  }.bind(this))
};

KNN.prototype._sorted = function(distancesData) {
  return distancesData.sort(function (data1, data2){
    return data1[0] - data2[0]
  }).map(function (data){
    return data[1]
  })
};

KNN.prototype._majority = function(k, sortedArray) {
  var newArr = sortedArray.slice(0, k), classArr = [];

  newArr.forEach(function (element){
    classArr[element] = classArr[element] ? classArr[element] : 0;
    classArr[element] += 1
  })

  for(var i = 0; i < classArr.length; i++){
    classArr[i] = classArr[i] ? classArr[i] : 0
  }
  return classArr.indexOf(Math.max.apply(null, classArr))

};

KNN.prototype.predictSingle = function(vector) {
  return this._majority(this.kSize, this._sorted(this._distances(vector, this.points)))
};

KNN.prototype.predict = function(arr) {
  return arr.map(function (element){
    return this.predictSingle(element)
  }.bind(this))
};

KNN.prototype.score = function(data) {

  var compared = data.map(function (elem){
    return elem[1]
  })

  var predicted = this.predict(data.map(function (element){
    return element[0]
  }))

  var score = 0;

  compared.forEach(function (classif, i){
    if (classif == predicted[i]) score++
  })

  return score / compared.length
};

module.exports = KNN
