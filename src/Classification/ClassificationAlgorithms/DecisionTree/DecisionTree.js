import React, { useState } from 'react'
import '../../../Cluster/Algorithms/Algorithms.css'
import LoadingBar from 'react-top-loading-bar'
import FileSaver from 'file-saver'
import JSZip from 'jszip'
import Splitter from '../NaiveBayes/Splitter'
import { Link } from 'react-router-dom';
import StringIndexer from './StringIndexer'
import RightForm from './RightForm'
import IndexToString from './IndexToString'
import VectorIndexer from './VectorIndexer'
import Myeval from '../NaiveBayes/Myeval'
import { Jumbotron, Form } from 'react-bootstrap'
import ClassificationToolbar from '../ClassificationToolbar'

const submitForm = () => {
    let myK = ")\n\n\tval dt = new DecisionTreeClassifier()";
    if (document.getElementById("checkpointIntervalID").value !== "") {
        myK = (myK.concat(".", "setCheckpointInterval(" + document.getElementById("checkpointIntervalID").value + ")"));
    }
    if (document.getElementById("featuresColID").value !== "") {
        myK = (myK.concat(".", `setFeaturesCol("${document.getElementById("featuresColID").value}")`));
    }
    if (document.getElementById("impurityID").value !== "") {
        myK = (myK.concat(".", `setImpurity("${document.getElementById("impurityID").value}")`));
    }
    if (document.getElementById("labelColID").value !== "") {
        myK = (myK.concat(".", `setLabelCol("${document.getElementById("labelColID").value}")`));
    }
    if (document.getElementById("leafColID").value !== "") {
        myK = (myK.concat(".", `setLeafCol("${document.getElementById("leafColID").value}")`));
    }
    if (document.getElementById("maxBinsID").value !== "") {
        myK = (myK.concat(".", "setMaxBins(" + document.getElementById("maxBinsID").value + ")"));
    }
    if (document.getElementById("maxDepthID").value !== "") {
        myK = (myK.concat(".", "setMaxDepth(" + document.getElementById("maxDepthID").value + ")"));
    }
    if (document.getElementById("minInstancesPerNodeID").value !== "") {
        myK = (myK.concat(".", "setMinInstancesPerNode(" + document.getElementById("minInstancesPerNodeID").value + ")"));
    }
    if (document.getElementById("minWeightFractionPerNodeID").value !== "") {
        myK = (myK.concat(".", "setMinWeightFractionPerNode(" + document.getElementById("minWeightFractionPerNodeID").value + ")"));
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
    if (document.getElementById("thresholdID").value !== "") {
        myK = (myK.concat(".", "setThreshold(" + document.getElementById("thresholdID").value + ")"));
    }
    if (document.getElementById("seedID").value !== "") {
        myK = (myK.concat(".", "setSeed(" + document.getElementById("seedID").value + "L)"));
    }
    if (document.getElementById("weightColID").value !== "") {
        myK = (myK.concat(".", `setWeightCol("${document.getElementById("weightColID").value}")`));
    }
    return (myK);
}

const mystringIndexer = () => {
    let myK = "\")\n\n\tval labelIndexer = new StringIndexer().fit(data)";
    if (document.getElementById("handleInvalidID").value !== "") {
        myK = (myK.concat(".", `setHandleInvalid("${document.getElementById("handleInvalidID").value}")`));
    }
    if (document.getElementById("inputColID").value !== "") {
        myK = (myK.concat(".", `setInputCol("${document.getElementById("inputColID").value}")`));
    }
    if (document.getElementById("inputColsID").value !== "") {
        myK = (myK.concat(".", `setInputCols("${document.getElementById("inputColsID").value}")`));
    }
    if (document.getElementById("outputColID").value !== "") {
        myK = (myK.concat(".", `setOutputCol("${document.getElementById("outputColID").value}")`));
    }
    if (document.getElementById("outputColsID").value !== "") {
        myK = (myK.concat(".", `setOutputCols("${document.getElementById("outputColsID").value}")`));
    }
    if (document.getElementById("stringOrderTypeID").value !== "") {
        myK = (myK.concat(".", `setStringOrderType("${document.getElementById("stringOrderTypeID").value}")`));
    }
    return (myK);
}

const myVectorIndexer = () => {
    let myK = "\n\n\tval featureIndexer = new VectorIndexer().fit(data)";
    if (document.getElementById("handleInvalidID").value !== "") {
        myK = (myK.concat(".", `setHandleInvalid("${document.getElementById("handleInvalidID").value}")`));
    }
    if (document.getElementById("inputColID").value !== "") {
        myK = (myK.concat(".", `setInputCol("${document.getElementById("inputColID").value}")`));
    }
    if (document.getElementById("outputColID").value !== "") {
        myK = (myK.concat(".", `setOutputCol("${document.getElementById("outputColID").value}")`));
    }
    if (document.getElementById("maxCategoriesID").value !== "") {
        myK = (myK.concat(".", "setMaxCategories(" + document.getElementById("maxCategoriesID").value + ")"));
    }
    return (myK);
}

const myIndexToString = () => {
    let myK = "\n\n\tval labelConverter = new IndexToString()";
    if (document.getElementById("inputColID").value !== "") {
        myK = (myK.concat(".", `setInputCol("${document.getElementById("inputColID").value}")`));
    }
    if (document.getElementById("outputColID").value !== "") {
        myK = (myK.concat(".", `setOutputCol("${document.getElementById("outputColID").value}")`));
    }
    if (document.getElementById("labelsID").value !== "") {
        myK = (myK.concat(".", `setLabels("${document.getElementById("labelsID").value}")`));
    }
    return (myK);
}

const evalForm = () => {
    let myK = "\n\n\tval evaluator = new MulticlassClassificationEvaluator()";
    if (document.getElementById("betaID").value !== "") {
        myK = (myK.concat(".", `setBeta("${document.getElementById("betaID").value} ")`));
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

function DecisionTree() {

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
    const [evalColor, setevalColor] = useState('darkgoldenrod');
    const [evalbutt, setevalbutt] = useState(false);
    const [DecisionButton, setDecisionButton] = useState(false);
    const [IndexString, setIndexString] = useState(false);
    const [nextStep, setNextStep] = useState(false);
    const [theNext, setTheNext] = useState(false);
    const [mycolor, setMycolor] = useState('darkgoldenrod');
    const [thisColor, setThisColor] = useState('darkgoldenrod');
    const [thecolor, setThecolor] = useState('darkgoldenrod');
    const [IndexColor, setIndexColor] = useState('darkgoldenrod');
    const [showbutton, setShowbutton] = useState(false);
    const [mybutton, setMyButton] = useState(false);
    const [pivot, setPivot] = useState(0);
    const [percentage, setPercentage] = useState(0);
    const [toggle, setToggle] = useState(false);
    const [libs] = useState('import org.apache.spark.ml.Pipeline\nimport org.apache.spark.ml.classification.DecisionTreeClassificationModel\nimport org.apache.spark.ml.classification.DecisionTreeClassifier\nimport org.apache.spark.ml.feature.{IndexToString, StringIndexer, VectorIndexer}\nimport org.apache.spark.sql.SparkSession');
    const [changer] = useState('\nimport org.apache.spark.ml.evaluation.MulticlassClassificationEvaluator');
    const [first] = useState('\n\nobject ');
    const [name] = useState(makeid());
    const [basic] = useState('{\n\tdef main(args: Array[String]): Unit = {\n\tval spark = SparkSession\n\t\t.builder\n\t\t.appName(s\"${this.getClass.getSimpleName}\")\n\t\t.getOrCreate()');
    const [dataset] = useState('\n\tval data = spark.read.format("libsvm").load("');
    const [mystring] = useState('")\n\n\tval labelIndexer = new StringIndexer().fit(data)');
    const [myvector] = useState('\n\n\tval featureIndexer = new VectorIndexer().fit(data)');
    const [splits] = useState('\n\n\tval Array(trainingData, testData) = data.randomSplit(Array(');
    const [comma] = useState(',');
    const [DecisionModel] = useState('))\n\n\tval dt = new DecisionTreeClassifier()');
    const [myindex] = useState('\n\n\tval labelConverter = new IndexToString()');
    const [mypipeline] = useState('\n\n\tval pipeline = new Pipeline().setStages(Array(labelIndexer, featureIndexer, dt, labelConverter))');
    const [mymodel] = useState('\n\n\tval model = pipeline.fit(trainingData)\n\n\tval predictions = model.transform(testData)\n\n\tpredictions.select("predictedLabel", "label", "features").show(5)');
    const [evaluator] = useState('\n\n\tval evaluator = new MulticlassClassificationEvaluator()');
    const [stopper] = useState('\n\n\tval accuracy = evaluator.evaluate(predictions)\n\tprintln(s"Test Error = ${(1.0 - accuracy)}")\n\n\tval treeModel = model.stages(2).asInstanceOf[DecisionTreeClassificationModel]\n\tprintln(s"Learned classification tree model:\n ${treeModel.toDebugString}")\n\n\tspark.stop()\n }\n}')
    const [altEnd] = useState('\n\n\tval treeModel = model.stages(2).asInstanceOf[DecisionTreeClassificationModel]\n\tprintln(s"Learned classification tree model:\n ${treeModel.toDebugString}")\n\n\tspark.stop()\n }\n}')

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
            showbutton === false ? new Blob([mystring]) : new Blob([mystringIndexer()]),
            mybutton === false ? new Blob([myvector]) : new Blob([myVectorIndexer()]),
            new Blob([splits], { type: 'text/plain' }),
            new Blob([document.getElementById('trainID').value / 100], { type: 'text/plain' }),
            new Blob([comma], { type: 'text/plain' }),
            new Blob([(100 - document.getElementById('trainID').value) / 100], { type: 'text/plain' }),
            DecisionButton === false ? new Blob([DecisionModel]) : new Blob([submitForm()]),
            IndexString === false ? new Blob([myindex]) : new Blob([myIndexToString()]),
            new Blob([mypipeline], { type: 'text/plain' }),
            new Blob([mymodel], { type: 'text/plain' }),
            evalbutt === true ? new Blob([evaluator]) : new Blob([evalForm()]),
            new Blob([stopper], { type: 'text/plain' }),

        ];
        var parts = new File(file, "myfile")
        var zip = new JSZip();
        zip.file("build.sbt", "name :=" + "\"" + localStorage.getItem('Name') + "\"" + "\n\nversion := " + "\"" + localStorage.getItem('Version') + "\"" + "\n\nscalaVersion :=" + '\"' + localStorage.getItem('ScalaVersion') + '\"\n\n' + "libraryDependencies ++= Seq( \n" + "\t\"org.apache.spark\" %% \"spark-sql\" % " + "\"" + localStorage.getItem('SparkVersion') + "\"," + "\n\t\"org.apache.spark\" %% \"spark-mllib\" % " + "\"" + localStorage.getItem('SparkVersion') + "\"\n)");
        zip.file("src/main/scala/DecisionTree.scala", parts);
        zip.generateAsync({ type: "blob" }).then(function (content) {
            // see FileSaver.js
            FileSaver.saveAs(content, "DecisionTree.zip");
        });
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
            showbutton === false ? new Blob([mystring]) : new Blob([mystringIndexer()]),
            mybutton === false ? new Blob([myvector]) : new Blob([myVectorIndexer()]),
            new Blob([splits], { type: 'text/plain' }),
            new Blob([document.getElementById('trainID').value / 100], { type: 'text/plain' }),
            new Blob([comma], { type: 'text/plain' }),
            new Blob([(100 - document.getElementById('trainID').value) / 100], { type: 'text/plain' }),
            DecisionButton === false ? new Blob([DecisionModel]) : new Blob([submitForm()]),
            IndexString === false ? new Blob([myindex]) : new Blob([myIndexToString()]),
            new Blob([mypipeline], { type: 'text/plain' }),
            new Blob([mymodel], { type: 'text/plain' }),
            new Blob([altEnd], { type: 'text/plain' }),

        ];
        var parts = new File(file, "myfile")
        var zip = new JSZip();
        zip.file("build.sbt", "name :=" + "\"" + localStorage.getItem('Name') + "\"" + "\n\nversion := " + "\"" + localStorage.getItem('Version') + "\"" + "\n\nscalaVersion :=" + '\"' + localStorage.getItem('ScalaVersion') + '\"\n\n' + "libraryDependencies ++= Seq( \n" + "\t\"org.apache.spark\" %% \"spark-sql\" % " + "\"" + localStorage.getItem('SparkVersion') + "\"," + "\n\t\"org.apache.spark\" %% \"spark-mllib\" % " + "\"" + localStorage.getItem('SparkVersion') + "\"\n)");
        zip.file("src/main/scala/DecisionTree.scala", parts);
        zip.generateAsync({ type: "blob" }).then(function (content) {
            // see FileSaver.js
            FileSaver.saveAs(content, "DecisionTree.zip");
        });
    }

    const myToggler = (e) => {  //this is for next button
        e.preventDefault();
        setToggle(true);
        if (percentage <= 9) {
            setPercentage(currPercentage => currPercentage + 10);
        }
    }

    const theReturnFunction = () => {
        if (percentage <= 11) {
            setPercentage(currPercentage => currPercentage + 10);
        }
        setShowbutton(true);
    }

    const callbackFunction = () => { //this is for progress bar
        if (percentage <= 21) {
            setPercentage(currPercentage => currPercentage + 10);
        }
        setMyButton(true);
        setNextStep(true);
        if (percentage <= 31) {
            setDecisionButton(true);
        }
    }

    const handleEdit = () => { //this is for default params in train
        //setShowModel(true);
        setMycolor('beige');
        if (percentage <= 11) {
            setPercentage(currPercentage => currPercentage + 10);
        }
    };

    const theString = () => { //this is for default params in train
        //setShowModel(true);
        setThecolor('beige');
        if (percentage <= 21) {
            setPercentage(currPercentage => currPercentage + 10);
        }
        setNextStep(true);
    };

    const mytopic = (e) => {
        e.preventDefault();
        if (percentage <= 31) {
            setPercentage(currPercentage => currPercentage + 10);
        }
        setTheNext(true);
    }

    const trainFunction = () => {
        setThisColor('beige');
        if (percentage <= 41) {
            setPercentage(currPercentage => currPercentage + 30);
        }
    };

    const modelMyFunction = () => {
        if (percentage <= 51) {
            setPercentage(currPercentage => currPercentage + 10);
        }
        setDecisionButton(true);
    };

    const myFunction = () => {
        if (percentage <= 51) {
            setPercentage(currPercentage => currPercentage + 20);
        }
        setIndexString(true);
    }

    const myIndexString = () => { //this is for default params in train
        //setShowModel(true);
        setIndexColor('beige')
        if (percentage <= 51) {
            setPercentage(currPercentage => currPercentage + 20);
        }
    };

    const evalFunction = () => { //this is for progress bar
        setPercentage(currPercentage => currPercentage + 10);
    }

    const evalEdit = () => { //this is for evaluation with default params
        setevalbutt(true);
        setevalColor('beige');
        if (percentage <= 69) {
            setPercentage(currPercentage => currPercentage + 10);
        }
    };

    const skipEval = () => { //this is for skipping evalutation
        setskipB(true);
        if (percentage <= 69) {
            setPercentage(currPercentage => currPercentage + 20);
        }
    }


    return (
        <div className="d-flex">
            <ClassificationToolbar />
            <div className="welcome">
                <h1> Decision Tree Algorithm</h1>
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
                                <h2>Index labels with String Indexer</h2>
                                <br />
                                <StringIndexer percentage={percentage} parentCallback={theReturnFunction} />
                                <br />
                                <button class="btn btn-primary" onClick={handleEdit}>
                                    Default parameters
                                </button>
                            </Jumbotron>
                            <Jumbotron>
                                <h2>Indexing categorical feature columns in a dataset of Vector with Vector Indexer.</h2>
                                <br />
                                <VectorIndexer percentage={percentage} parentCallback={callbackFunction} />
                                <br />
                                <button class="btn btn-primary" onClick={theString}>
                                    Default parameters
                                </button>
                            </Jumbotron>
                            {
                                nextStep === true ?
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
                                            theNext === true ?
                                                <div>
                                                    <Jumbotron>
                                                        <h2> Train your model with </h2>
                                                        <br />
                                                        <button class="btn btn-primary" onClick={trainFunction}>
                                                            Default parameters
                                                        </button>
                                                        <br />
                                                        <br />
                                                        <RightForm percentage={percentage} parentCallback={modelMyFunction} />
                                                    </Jumbotron>
                                                    <Jumbotron>
                                                        <h2>Convert indexed labels back to original labels</h2>
                                                        <br />
                                                        <IndexToString percentage={percentage} parentCallback={myFunction} />
                                                        <br />
                                                        <button class="btn btn-primary" onClick={myIndexString}>
                                                            Default parameters
                                                        </button>
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
                                                        <Myeval percentage={percentage} parentCallback={evalFunction} />
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

export default DecisionTree 