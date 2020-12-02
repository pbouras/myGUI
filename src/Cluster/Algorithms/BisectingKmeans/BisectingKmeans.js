import React, { Component } from 'react'
import '../Algorithms.css'
import Myform from './Myform'
import EvalForm from '../Kmeans/EvaluationForm'
import LoadingBar from 'react-top-loading-bar'
import FileSaver from 'file-saver';
import JSZip from 'jszip'
import { Link } from 'react-router-dom';
import ClusterToolbar from '../../ClusterToolbar'
import { Jumbotron,Form } from 'react-bootstrap'


function submitForm() {
  let myK = "val bkm = new BisectingKMeans()";
  if (document.getElementById("kname").value !== "") {
    myK = (myK.concat(".", "setK(" + document.getElementById("kname").value + ")"));
  }
  if (document.getElementById("maxname").value !== "") {
    myK = (myK.concat(".", "setMaxIter(" + document.getElementById("maxname").value + ")"));
  }
  if (document.getElementById("featuresColname").value !== "") {
    myK = (myK.concat(".", `setFeaturesCol("${document.getElementById("featuresColname").value}")`));
  }
  if (document.getElementById("predictionColname").value !== "") {
    myK = (myK.concat(".", "setPredictionCol(\"" + document.getElementById("predictionColname").value + "\")"));
  }
  if (document.getElementById("seedname").value !== "") {
    myK = (myK.concat(".", "setSeed(" + document.getElementById("seedname").value + "L)"));
  }
  if (document.getElementById("minDivisibleClusterSizeID").value !== "") {
    myK = (myK.concat(".", "setMinDivisibleClusterSize(" + document.getElementById("minDivisibleClusterSizeID").value + ")"));
  }
  if (document.getElementById("distanceMeasurename").value !== "") {
    myK = (myK.concat(".", "setDistanceMeasure(\"" + document.getElementById("distanceMeasurename").value + "\")"));
  }
  if (document.getElementById("weightColname").value !== "") {
    myK = (myK.concat(".", "setWeightCol(\"" + document.getElementById("weightColname").value + "\")"));
  }

  return (myK);

}

function myevalForm() {
  let myeval = "\tval evaluator = new ClusteringEvaluator()";

  if (document.getElementById("predictionColName").value !== "") {
    myeval = (myeval.concat(".", "setPredictionCol(\"" + document.getElementById("predictionColName").value + "\")"));
  }
  if (document.getElementById("mymetricName").value !== "") {
    myeval = (myeval.concat(".", "setMetricName(\"" + document.getElementById("mymetricName").value + "\")"));
  }
  if (document.getElementById("distanceMeasureName").value !== "") {
    myeval = (myeval.concat(".", "setDistanceMeasure(\"" + document.getElementById("distanceMeasureName").value + "\")"));
  }
  if (document.getElementById("featuresColName").value !== "") {
    myeval = (myeval.concat(".", `setFeaturesCol("${document.getElementById("featuresColName").value}")`));
  }

  return (myeval);
}


class BisectingKmeans extends Component {

  makeid = () => { //make the name of the programm
    var name = '';
    var characters = 'abcdefghijklmnopqrstuvwxyz';
    var length = 7;
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      name += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return name;
  }

  state = {
    pressed: 0,
    theToggle: false,
    pivot: 0,
    percentage: 0,
    evalColor: 'darkgoldenrod',
    mycolor: 'darkgoldenrod',
    skipcolor: 'darkgoldenrod',
    showbutton: false,
    showButtonIndex: false,
    skipbutton: false,
    changeLibs: ["import org.apache.spark.ml.clustering.BisectingKMeans\n"],
    libs: ["import org.apache.spark.ml.evaluation.ClusteringEvaluator\n"],
    standars: ["import org.apache.spark.sql.SparkSession\nobject\t"],
    name: [this.makeid()],
    basic: ["{\n def main(args: Array[String]): Unit = { \n\tval spark = SparkSession\n\t\t.builder\n\t\t.appName(s\"${this.getClass.getSimpleName}\")\n\t\t.getOrCreate()\n\tval dataset = spark.read.format(\"libsvm\").load(\""],
    dataset: ["\") \n\t"],
    constructor: ["\n\tval bkm = new BisectingKMeans()\n"],
    predictions: ["\t\nval model = bkm.fit(dataset)\n\n\tval predictions = model.transform(dataset)\n"],
    evaluator: ["\n\tval evaluator = new ClusteringEvaluator()\n"],
    cost: ["\n\tval cost = model.computeCost(dataset)\n\tprintln(s\"Within Set Sum of Squared Errors = $cost\")\n"],
    silhouette: ["\n\tval silhouette = evaluator.evaluate(predictions)\n\tprintln(s\"Silhouette with squared euclidean distance = $silhouette\")\n"],
    results: ["\n\tprintln(\"Cluster Centers: \")\n\tval centers = model.clusterCenters\n\tcenters.foreach(println)\n\n\tspark.stop()\n }\n}"]
  }


  handleEdit = () => { //this is for default params in LDA train
    console.log(this.state.showbutton)
    this.setState({
      showbutton: true,
      mycolor: 'beige',
    });
    this.setState({ pressed: this.state.pressed + 1 });
    if (this.state.percentage <= 39) {
      this.setState({ percentage: this.state.percentage + 30 });
    }
  };

  evalEdit = () => { //this is for evaluation with default params
    this.setState({
      showButtonIndex: !this.state.showButtonIndex,
      evalColor: 'beige',
    });
    if (this.state.percentage <= 69) {
      this.setState({ percentage: this.state.percentage + 30 });
    }
  };

  callbackFunction = (childData) => { //this is for progress bar
    this.setState({ percentage: childData })
    this.setState({ pressed: this.state.pressed + 1 })
  }

  myToggler = (e) => {  //this is for next button
    e.preventDefault();
    const myToggle = this.state.theToggle;
    this.setState({ theToggle: !myToggle });
    this.setState({ percentage: this.state.percentage + 10 });

  }

  skipEval = () => { //this is for skipping evalutation
    this.setState({
      skipbutton: true,
      skipcolor: 'beige',
    });
    if (this.state.percentage <= 69) {
      this.setState({ percentage: this.state.percentage + 30 });
    }
  }

  notDefaultFile = () => {  //this is the file after skipping evalutation
    this.setState({ percentage: this.state.percentage + 30 });
    this.setState({ pivot: this.state.pivot + 1 });
    const file = [
      new Blob([this.state.changeLibs], { type: 'text/plain' }),
      new Blob([this.state.standars], { type: 'text/plain' }),
      new Blob([this.state.name], { type: 'text/plain' }),
      new Blob([this.state.basic], { type: 'text/plain' }),
      new Blob([document.getElementById('myInput').value], { type: 'text/plain' }),
      new Blob([this.state.dataset]),
      this.state.showbutton === true ? new Blob([this.state.constructor]) : new Blob([submitForm]),
      new Blob([this.state.predictions]),
      new Blob([this.state.cost]),
      new Blob([this.state.results]),

    ];
    var parts = new File(file, "myfile")
    var zip = new JSZip();
    zip.file("build.sbt", "name :=" + "\"" +localStorage.getItem('Name')+ "\"" + "\n\nversion := " + "\"" + localStorage.getItem('Version') + "\"" + "\n\nscalaVersion :=" + '\"' +  localStorage.getItem('ScalaVersion') + '\"\n\n' + "libraryDependencies ++= Seq( \n" + "\t\"org.apache.spark\" %% \"spark-sql\" % " + "\"" + localStorage.getItem('SparkVersion') + "\"," + "\n\t\"org.apache.spark\" %% \"spark-mllib\" % " + "\"" + localStorage.getItem('SparkVersion') + "\"\n)");
    zip.file("src/main/scala/Bisecting-Kmeans.scala", parts);
    zip.generateAsync({ type: "blob" }).then(function (content) {
      // see FileSaver.js
      FileSaver.saveAs(content, "Bkmeans.zip");
    });
  }

  downloadTxtFile = () => { //this is the file after evalutation
    this.setState({ percentage: this.state.percentage + 30 });
    this.setState({ pivot: this.state.pivot + 1 });
    const file = [
      new Blob([this.state.changeLibs], { type: 'text/plain' }),
      new Blob([this.state.libs], { type: 'text/plain' }),
      new Blob([this.state.standars], { type: 'text/plain' }),
      new Blob([this.state.name], { type: 'text/plain' }),
      new Blob([this.state.basic], { type: 'text/plain' }),
      new Blob([document.getElementById('myInput').value], { type: 'text/plain' }),
      new Blob([this.state.dataset]),
      this.state.showbutton === true ? new Blob([this.state.constructor]) : new Blob([submitForm()]),
      new Blob([this.state.predictions]),
      this.state.showButtonIndex === true ? new Blob([this.state.evaluator]) : new Blob([myevalForm()]),
      new Blob([this.state.silhouette]),
      new Blob([this.state.results]),

    ];
    var parts = new File(file, "myfile")
    var zip = new JSZip();
    zip.file("build.sbt", "name :=" + "\"" +localStorage.getItem('Name')+ "\"" + "\n\nversion := " + "\"" + localStorage.getItem('Version') + "\"" + "\n\nscalaVersion :=" + '\"' +  localStorage.getItem('ScalaVersion') + '\"\n\n' + "libraryDependencies ++= Seq( \n" + "\t\"org.apache.spark\" %% \"spark-sql\" % " + "\"" + localStorage.getItem('SparkVersion') + "\"," + "\n\t\"org.apache.spark\" %% \"spark-mllib\" % " + "\"" + localStorage.getItem('SparkVersion') + "\"\n)");
    zip.file("src/main/scala/Bisecting-Kmeans.scala", parts);
    zip.generateAsync({ type: "blob" }).then(function (content) {
      // see FileSaver.js
      FileSaver.saveAs(content, "Bkmeans.zip");
    });
  }
  //className="myinput" 

  render() {
    return (
      <div className="d-flex">
        <ClusterToolbar />
        <div className="welcome">
          <h1> Bisecting K-Means Algorithm </h1>
          <br />
          <Jumbotron className="myinput">
            <Form onSubmit={this.myToggler}>
              <Form.Group controlId="myInput">
                <Form.Control onfocus="" required={true} placeholder="Please enter your dataset first" />
              </Form.Group>
              <button type="submit" class="btn btn-primary">Next Step</button>
            </Form>
          </Jumbotron>
          <br />
          <LoadingBar height={10} loaderSpeed={1000} transitionTime={100} color='#00008B' progress={this.state.percentage} onLoaderFinished={() => this.state.percentage} />
          {
            this.state.theToggle === true ?
              <div>
                <Jumbotron>
                  <h2> Train your Bisecting K-means model with </h2>
                  <br />
                  <button class="btn btn-primary" onClick={this.handleEdit}>
                    default parameters
                  </button>
                  <br />
                  <br />
                  <Myform percentage={this.state.percentage} parentCallback={this.callbackFunction} />
                </Jumbotron>
                <br />
                {
                  this.state.pressed >= 1 ?
                    <Jumbotron>
                      <h2> Evaluate your Bisecting K-means model </h2>
                      <br />
                      <button type="submit" class="btn btn-primary mr-1" onClick={this.evalEdit}>
                        Default Parameters
                      </button>
                      <button type="submit" class="btn btn-primary" onClick={this.skipEval}>
                        Skip Evaluation
                      </button>
                      <br />
                      <br />
                      <EvalForm percentage={this.state.percentage} parentCallback={this.callbackFunction} />
                  </Jumbotron>
                  : null
                }
                <br />
                {
                  this.state.skipbutton === true ?
                    <div>
                      <button class="btn btn-primary mr-1" onClick={this.notDefaultFile}>Download</button>
                      {this.state.pivot === 1 ?
                        <Link to='/cluster'><button class="btn btn-primary"> Return to menu  </button></Link>
                        : null
                      }
                    </div> :
                    <div>
                      <button class="btn btn-primary mr-1" disabled={this.state.percentage <= 69} onClick={this.downloadTxtFile}>Download</button>
                      {this.state.pivot === 1 ?
                        <Link to='/cluster'><button class="btn btn-primary"> Return to menu  </button></Link>
                        : null
                      }
                    </div>
                }
                <br />
              </div> : null
          }
        </div>
      </div>
    );
  }
}



export default BisectingKmeans;
