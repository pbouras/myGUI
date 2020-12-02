import React, { useState } from 'react'
import '../../../Cluster/Algorithms/Algorithms.css'
import LoadingBar from 'react-top-loading-bar'
import FileSaver from 'file-saver'
import JSZip from 'jszip'
import Splitter from '../NaiveBayes/Splitter'
import { Link } from 'react-router-dom';
import MyForm from './MyForm'
import Myeval from '../NaiveBayes/Myeval'
import { Jumbotron, Form } from 'react-bootstrap'
import ClassificationToolbar from '../ClassificationToolbar'


const mysplit = () => {
  let myK = ")";
  if (document.getElementById("weightsID").value !== "") {
    myK = (myK.concat(",", "weights = " + document.getElementById("weightsID").value));
  }
  if (document.getElementById("seedID").value !== "") {
    myK = (myK.concat(",", "seed = " + document.getElementById("seedID").value + "L)\n\n\t"));
  }
  return (myK);
}

const submitForm = () => {
  let myK = ")\n\n\tval trainer = new MultilayerPerceptronClassifier()";
  if (document.getElementById("featuresColID").value !== "") {
    myK = (myK.concat(".", `setFeaturesCol("${document.getElementById("featuresColID").value}")`));
  }
  if (document.getElementById("layesID").value !== "") {
    myK = (myK.concat(".", "setLayers(" + document.getElementById("layesID").value + ")"));
  }
  if (document.getElementById("labelColID").value !== "") {
    myK = (myK.concat(".", `setLabelCol("${document.getElementById("labelColID").value}")`));
  }
  if (document.getElementById("probabilityColID").value !== "") {
    myK = (myK.concat(".", `setProbabilityCol("${document.getElementById("probabilityColID").value}")`));
  }
  if (document.getElementById("predictionColID").value !== "") {
    myK = (myK.concat(".", `setPredictionCol("${document.getElementById("predictionColID").value}")`));
  }
  if (document.getElementById("rawPredictionColID").value !== "") {
    myK = (myK.concat(".", `setRawPredictionCol("${document.getElementById("rawPredictionColID").value}")`));
  }
  if (document.getElementById("maxIterID").value !== "") {
    myK = (myK.concat(".", "setMaxIter(" + document.getElementById("maxIterID").value + ")"));
  }
  if (document.getElementById("tolID").value !== "") {
    myK = (myK.concat(".", " setTol(" + document.getElementById("tolID").value + ")"));
  }
  if (document.getElementById("thresholdID").value !== "") {
    myK = (myK.concat(".", "setThreshold(" + document.getElementById("thresholdID").value + ")"));
  }
  if (document.getElementById("seedID").value !== "") {
    myK = (myK.concat(".", "setSeed(" + document.getElementById("seedID").value + "L)"));
  }
  if (document.getElementById("stepSizeID").value !== "") {
    myK = (myK.concat(".", "setStepSize(" + document.getElementById("stepSizeID").value + ")"));
  }
  return (myK);
}

const evalForm = () => {
  let myK = "\n\n\tval evaluator = new MulticlassClassificationEvaluator()";
  if (document.getElementById("betaID").value !== "") {
    myK = (myK.concat(".", `setBeta("${document.getElementById("betaID").value}")`));
  }
  if (document.getElementById("metricNameID").value !== "") {
    myK = (myK.concat(".", `setMetricName("${document.getElementById("metricNameID").value}")`));
  }
  if (document.getElementById("labelColID").value !== "") {
    myK = (myK.concat(".", `setLabelCol("${document.getElementById("labelColID").value}")`));
  }
  if (document.getElementById("probabilityColID").value !== "") {
    myK = (myK.concat(".", " setProbabilityCol(" + document.getElementById("probabilityColID").value + ")"));
  }
  if (document.getElementById("predictionColID").value !== "") {
    myK = (myK.concat(".", `setPredictionCol("${document.getElementById("predictionColID").value} ")`));
  }
  if (document.getElementById("epsID").value !== "") {
    myK = (myK.concat(".", `setEps("${document.getElementById("epsID").value}")`));
  }
  if (document.getElementById("metricLabelID").value !== "") {
    myK = (myK.concat(".", "setMetricName(" + document.getElementById("metricLabelID").value + ")"));
  }
  if (document.getElementById("weightColID").value !== "") {
    myK = (myK.concat(".", `setWeightCol("${document.getElementById("weightColID").value} ")`));
  }
  return (myK);
}

function MultiLayerPerceptron() {

  const makeid = () => { //make the name of the programm
    var name = '';
    var characters = 'abcdefghijklmnopqrstuvwxyz';
    var length = 7;
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      name += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return name;
  }

  const [skipB, setskipB] = useState(false);
  const [mytry, setMytry] = useState(0);
  const [showbutton, setShowbutton] = useState(false);
  const [nextStep, setNextStep] = useState(0);
  const [showModel, setShowModel] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [pivot, setPivot] = useState(0);
  const [mycolor, setMycolor] = useState('darkgoldenrod');
  const [showButtonIndex, setshowButtonIndex] = useState(false);
  const [evalColor, setevalColor] = useState('darkgoldenrod');
  const [percentage, setPercentage] = useState(0);
  const [libs] = useState('import org.apache.spark.ml.classification.MultilayerPerceptronClassifier\nimport org.apache.spark.sql.SparkSession');
  const [changer] = useState('\nimport org.apache.spark.ml.evaluation.MulticlassClassificationEvaluator');
  const [first] = useState('\n\nobject ');
  const [name] = useState(makeid());
  const [basic] = useState('{\n\tdef main(args: Array[String]): Unit = {\n\tval spark = SparkSession\n\t\t.builder\n\t\t.appName(s\"${this.getClass.getSimpleName}\")\n\t\t.getOrCreate()');
  const [dataset] = useState('\n\tval data = spark.read.format("libsvm").load("');
  const [splits] = useState('")\n\n\tval splits = data.randomSplit(Array(');
  const [comma] = useState(',');
  const [con] = useState('))\n\n\t');
  const [variables] = useState('val train = splits(0)\n\tval test = splits(1)');
  const [layers] = useState('\n\n\tval layers = Array[Int](');
  const [trainers] = useState(')\n\n\tval trainer = new MultilayerPerceptronClassifier()');
  const [model] = useState('\n\n\tval model = trainer.fit(train)');
  const [results] = useState('\n\n\tval result = model.transform(test)\n\tval predictionAndLabels = result.select("prediction", "label")');
  const [evaluator] = useState('\n\tval evaluator = new MulticlassClassificationEvaluator()');
  const [ending] = useState('\n\n\tprintln(s"Test set accuracy = ${evaluator.evaluate(predictionAndLabels)}")\n\n\tspark.stop()\n }\n}');
  const [altend] = useState('\n\n\tspark.stop()\n }\n}');


  const myToggler = (e) => {  //this is for next button
    e.preventDefault();
    setToggle(true);
    setPercentage(currPercentage => currPercentage + 10);
  }

  const mytopic = (e) => {
    e.preventDefault();
    setPercentage(currPercentage => currPercentage + 10);
    setNextStep(nextStep => nextStep + 1);
  }

  const theReturnFunction = () => {
    setPercentage(currPercentage => currPercentage + 10);
    setShowbutton(true);
  }

  const mylayers = (e) => {
    e.preventDefault();
    setPercentage(currPercentage => currPercentage + 10);
    setMytry(1);
  }

  const handleEdit = () => { //this is for default params in train
    setShowModel(true);
    setMycolor('beige');
    if (percentage <= 39) {
      setPercentage(currPercentage => currPercentage + 30);
    }
  };

  const callbackFunction = () => { //this is for progress bar
    setPercentage(currPercentage => currPercentage + 30);
    //setPercentage(newValue);
    //setPivot(currPivot => currPivot + 1);
  }

  const evalEdit = () => { //this is for evaluation with default params
    setshowButtonIndex(true);
    setevalColor('beige');
    if (percentage <= 69) {
      setPercentage(currPercentage => currPercentage + 40);
    }
  };

  const skipEval = () => { //this is for skipping evalutation
    setskipB(true);
    if (percentage <= 69) {
      setPercentage(currPercentage => currPercentage + 20);
    }
  }

  const notDefaultFile = () => { //this is the file (downloading zip)
    setPercentage(currPercentage => currPercentage + 40);
    setPivot(currPivot => currPivot + 1);

    const file = [
      new Blob([libs], { type: 'text/plain' }),
      new Blob([first], { type: 'text/plain' }),
      new Blob([name], { type: 'text/plain' }),
      new Blob([basic], { type: 'text/plain' }),
      new Blob([dataset], { type: 'text/plain' }),
      new Blob([document.getElementById('myInput').value], { type: 'text/plain' }),
      new Blob([splits], { type: 'text/plain' }),
      new Blob([document.getElementById('trainID').value / 100], { type: 'text/plain' }),
      new Blob([comma], { type: 'text/plain' }),
      new Blob([(100 - document.getElementById('trainID').value) / 100], { type: 'text/plain' }),
      showbutton === false ? new Blob([con]) : new Blob([mysplit()]),
      new Blob([variables], { type: 'text/plain' }),
      new Blob([layers], { type: 'text/plain' }),
      new Blob([document.getElementById('InputLayerID').value], { type: 'text/plain' }),
      new Blob([comma], { type: 'text/plain' }),
      new Blob([document.getElementById('interID').value], { type: 'text/plain' }),
      new Blob([comma], { type: 'text/plain' }),
      new Blob([document.getElementById('inter2ID').value], { type: 'text/plain' }),
      new Blob([comma], { type: 'text/plain' }),
      new Blob([document.getElementById('outID').value], { type: 'text/plain' }),
      showModel === true ? new Blob([trainers]) : new Blob([submitForm()]),
      new Blob([model], { type: 'text/plain' }),
      new Blob([results], { type: 'text/plain' }),
      new Blob([altend], { type: 'text/plain' }),

    ];
    var parts = new File(file, "myfile")
    var zip = new JSZip();
    zip.file("build.sbt", "name :=" + "\"" + localStorage.getItem('Name') + "\"" + "\n\nversion := " + "\"" + localStorage.getItem('Version') + "\"" + "\n\nscalaVersion :=" + '\"' + localStorage.getItem('ScalaVersion') + '\"\n\n' + "libraryDependencies ++= Seq( \n" + "\t\"org.apache.spark\" %% \"spark-sql\" % " + "\"" + localStorage.getItem('SparkVersion') + "\"," + "\n\t\"org.apache.spark\" %% \"spark-mllib\" % " + "\"" + localStorage.getItem('SparkVersion') + "\"\n)");
    zip.file("src/main/scala/MultiLayerPerceptron.scala", parts);
    zip.generateAsync({ type: "blob" }).then(function (content) {
      // see FileSaver.js
      FileSaver.saveAs(content, "MultiLayerPerceptron.zip");
    });
  }


  const downloadTxtFile = () => { //this is the file (downloading zip)
    setPercentage(currPercentage => currPercentage + 40);
    setPivot(currPivot => currPivot + 1);

    const file = [
      new Blob([libs], { type: 'text/plain' }),
      new Blob([changer], { type: 'text/plain' }),
      new Blob([first], { type: 'text/plain' }),
      new Blob([name], { type: 'text/plain' }),
      new Blob([basic], { type: 'text/plain' }),
      new Blob([dataset], { type: 'text/plain' }),
      new Blob([document.getElementById('myInput').value], { type: 'text/plain' }),
      new Blob([splits], { type: 'text/plain' }),
      new Blob([document.getElementById('trainID').value / 100], { type: 'text/plain' }),
      new Blob([comma], { type: 'text/plain' }),
      new Blob([(100 - document.getElementById('trainID').value) / 100], { type: 'text/plain' }),
      showbutton === false ? new Blob([con]) : new Blob([mysplit()]),
      new Blob([variables], { type: 'text/plain' }),
      new Blob([layers], { type: 'text/plain' }),
      new Blob([document.getElementById('InputLayerID').value], { type: 'text/plain' }),
      new Blob([comma], { type: 'text/plain' }),
      new Blob([document.getElementById('interID').value], { type: 'text/plain' }),
      new Blob([comma], { type: 'text/plain' }),
      new Blob([document.getElementById('inter2ID').value], { type: 'text/plain' }),
      new Blob([comma], { type: 'text/plain' }),
      new Blob([document.getElementById('outID').value], { type: 'text/plain' }),
      showModel === true ? new Blob([trainers]) : new Blob([submitForm()]),
      new Blob([model], { type: 'text/plain' }),
      new Blob([results], { type: 'text/plain' }),
      showButtonIndex === true ? new Blob([evaluator]) : new Blob([evalForm()]),
      new Blob([ending], { type: 'text/plain' }),

    ];
    var parts = new File(file, "myfile")
    var zip = new JSZip();
    zip.file("build.sbt", "name :=" + "\"" + localStorage.getItem('Name') + "\"" + "\n\nversion := " + "\"" + localStorage.getItem('Version') + "\"" + "\n\nscalaVersion :=" + '\"' + localStorage.getItem('ScalaVersion') + '\"\n\n' + "libraryDependencies ++= Seq( \n" + "\t\"org.apache.spark\" %% \"spark-sql\" % " + "\"" + localStorage.getItem('SparkVersion') + "\"," + "\n\t\"org.apache.spark\" %% \"spark-mllib\" % " + "\"" + localStorage.getItem('SparkVersion') + "\"\n)");
    zip.file("src/main/scala/MultiLayerPerceptron.scala", parts);
    zip.generateAsync({ type: "blob" }).then(function (content) {
      // see FileSaver.js
      FileSaver.saveAs(content, "MultiLayerPerceptron.zip");
    });
  }

  return (
    <div className="d-flex">
      <ClassificationToolbar />
      <div className="welcome">
        <h1> Multilayer Perceptron Algorithm </h1>
        <br />
        <Jumbotron className="myinput">
          <Form onSubmit={myToggler}>
            <Form.Group controlId="myInput">
              <Form.Control required={true} placeholder="Please enter your dataset first" />
            </Form.Group>
            <button type="submit" class="btn btn-primary">Next Step</button>
          </Form>
        </Jumbotron>
        <br />
        <LoadingBar height={10} loaderSpeed={1000} transitionTime={100} color='#00008B' progress={percentage} onLoaderFinished={() => setPercentage} />
        {
          toggle === true ?
            <div>
              <Jumbotron>
                <h2> Please split your dataset into training and test sets and check the parameters </h2>
                <br />
                <Form onSubmit={mytopic}>
                  <Form.Group controlId="trainID">
                    <Form.Control type="number" required={true} name="Train" max="100" placeholder="Write the percentage of train model and we will calculate the percentage of the test model" />
                  </Form.Group>
                  <button type="submit" class="btn btn-primary"> Validation </button>
                </Form>
                <br />
                <Splitter showbutton={showbutton} percentage={percentage} parentCallback={theReturnFunction} />
              </Jumbotron>
              {
                nextStep >= 1 ?
                  <div>
                    <Jumbotron>
                      <h2> Specify Layers for the neural network </h2>
                      <br />
                      <Form onSubmit={mylayers}>
                        <Form.Control required={true} min="0" type="number" id="InputLayerID" name="InputLayer" placeholder="Declare the input layer" />
                        <br />
                        <Form.Control required={true} min="0" type="number" id="interID" name="interID" placeholder="Declare the intermediate layer" />
                        <br />
                        <Form.Control min="0" type="number" id="inter2ID" name="inter" placeholder="Declare the intermediate layer" />
                        <br />
                        <Form.Control required={true} min="0" type="number" id="outID" name="out" placeholder="Declare the output layer" />
                        <br />
                        <button class="btn btn-primary"> Validation </button>
                      </Form>
                    </Jumbotron>
                    {
                      mytry >= 1 ?
                        <div>
                          <Jumbotron>
                            <h2> Train your model with </h2>
                            <br />
                            <button class="btn btn-primary" onClick={handleEdit}>
                              Default parameters
                              </button>
                            <br />
                            <br />
                            <MyForm percentage={percentage} parentCallback={callbackFunction} />
                          </Jumbotron>
                          <Jumbotron>
                            <h2> Evaluate your model with </h2>
                            <br />
                            <button class="btn btn-primary mr-1" onClick={evalEdit}>
                              Default parameters
                            </button>
                            <button type="submit" class="btn btn-primary" onClick={skipEval}>
                              Skip Evaluation
                            </button>
                            <br />
                            <br />
                            <Myeval percentage={percentage} parentCallback={callbackFunction} />
                          </Jumbotron>
                          {
                            skipB === true ?
                              <div>
                                <button disabled={percentage <= 69} type="submit" class="btn btn-primary mr-1" onClick={notDefaultFile}> Download </button>
                                {pivot === 1 ?
                                  <Link to='/classification/AlgorithmsClassification'> <button class="btn btn-primary"> Return to menu </button></Link>
                                  : null
                                }
                              </div> :
                              <div>
                                <button disabled={percentage <= 69} type="submit" class="btn btn-primary mr-1" onClick={downloadTxtFile}> Download</button>
                                {pivot === 1 ?
                                  <Link to='/classification'> <button class="btn btn-primary"> Return to menu </button> </Link>
                                  : null
                                }
                              </div>
                          }
                        </div> : null
                    }

                  </div> : null
              }
            </div> : null
        }
      </div>
    </div>
  );
}

export default MultiLayerPerceptron 